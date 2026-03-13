import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// @ts-expect-error no types available for occt-import-js
import occtimportjs from 'occt-import-js'
import occtWasmUrl from 'occt-import-js/dist/occt-import-js.wasm?url'
import occtWorkerUrl from 'occt-import-js/dist/occt-import-js-worker.js?url'

interface StepViewerProps {
  stepFileUrl: string
  className?: string
}

let occtPromise: Promise<unknown> | null = null

function getOcct() {
  if (!occtPromise) {
    occtPromise = occtimportjs({
      locateFile: (path: string) => {
        if (path.endsWith('.wasm')) return occtWasmUrl
        if (path.endsWith('-worker.js')) return occtWorkerUrl
        return path
      },
    })
  }
  return occtPromise
}

export function StepViewer({ stepFileUrl, className = '' }: StepViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls
    currentModel: THREE.Group | null
    animationId: number
  } | null>(null)
  const loadedUrlRef = useRef<string | null>(null)
  const [status, setStatus] = useState('Initializing 3D engine...')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf4f6f8)

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 5000)
    camera.position.set(150, 120, 150)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    scene.add(new THREE.AmbientLight(0xffffff, 0.65))
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9)
    dirLight.position.set(120, 120, 80)
    scene.add(dirLight)

    let animationId = 0
    function animate() {
      animationId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    sceneRef.current = { scene, camera, renderer, controls, currentModel: null, animationId }

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationId)
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      sceneRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!stepFileUrl || loadedUrlRef.current === stepFileUrl || !sceneRef.current) return

    // Debug: log what we received
    const isDataUrl = stepFileUrl.startsWith('data:')
    const isBase64 = stepFileUrl.includes('base64,')
    console.log('[StepViewer] stepFileUrl received:', {
      length: stepFileUrl.length,
      isDataUrl,
      isBase64,
      prefix: stepFileUrl.slice(0, 80),
      fullUrl: isDataUrl ? `data:...${stepFileUrl.length} chars` : stepFileUrl,
    })

    let cancelled = false

    async function loadStep() {
      const ctx = sceneRef.current
      if (!ctx) return

      setStatus('Loading OCCT engine...')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const occt: any = await getOcct()
      if (cancelled) return

      let fileBuffer: Uint8Array

      if (stepFileUrl.startsWith('data:')) {
        // Base64 data URL: data:application/octet-stream;base64,<payload>
        const base64Match = stepFileUrl.match(/^data:[^;]+;base64,(.+)$/)
        if (!base64Match) {
          console.error('[StepViewer] Invalid data URL format (expected base64)', stepFileUrl.slice(0, 100))
          setStatus('Invalid base64 data URL')
          return
        }
        const binaryString = atob(base64Match[1])
        fileBuffer = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          fileBuffer[i] = binaryString.charCodeAt(i)
        }
        console.log('[StepViewer] Decoded base64 STEP:', { bytes: fileBuffer.length, firstBytes: Array.from(fileBuffer.slice(0, 8)) })
      } else {
        setStatus('Fetching STEP file...')
        const response = await fetch(stepFileUrl)
        if (!response.ok) {
          console.error('[StepViewer] Fetch failed:', response.status, response.statusText, stepFileUrl)
          setStatus(`Failed to fetch STEP file (${response.status})`)
          return
        }
        const blob = await response.blob()
        console.log('[StepViewer] Fetched URL:', { url: stepFileUrl, blobSize: blob.size, contentType: blob.type })
        fileBuffer = new Uint8Array(await blob.arrayBuffer())
      }

      if (cancelled) return
      if (fileBuffer.length === 0) {
        console.error('[StepViewer] Empty STEP content')
        setStatus('Empty STEP file')
        return
      }
      // STEP magic / text start (ISO-10303-21)
      const textStart = new TextDecoder().decode(fileBuffer.slice(0, 32))
      console.log('[StepViewer] STEP content preview:', { bytes: fileBuffer.length, textStart })

      setStatus('Parsing STEP geometry...')
      const result = occt.ReadStepFile(fileBuffer, null)
      if (cancelled) return

      console.log('[StepViewer] OCCT result:', { meshCount: result?.meshes?.length ?? 0, resultKeys: result ? Object.keys(result) : [] })
      if (!result?.meshes?.length) {
        setStatus('No geometry in STEP file')
        return
      }

      if (ctx.currentModel) {
        ctx.scene.remove(ctx.currentModel)
      }

      const group = new THREE.Group()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.meshes.forEach((meshData: any) => {
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(meshData.attributes.position.array, 3))
        if (meshData.attributes.normal) {
          geometry.setAttribute('normal', new THREE.Float32BufferAttribute(meshData.attributes.normal.array, 3))
        }
        geometry.setIndex(new THREE.Uint32BufferAttribute(meshData.index.array, 1))

        const material = new THREE.MeshStandardMaterial({
          color: 0x95a5a6,
          metalness: 0.65,
          roughness: 0.35,
          side: THREE.DoubleSide,
        })
        const mesh = new THREE.Mesh(geometry, material)

        const edges = new THREE.EdgesGeometry(geometry)
        const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x2c3e50 }))
        mesh.add(lines)

        group.add(mesh)
      })

      ctx.scene.add(group)
      ctx.currentModel = group

      const box = new THREE.Box3().setFromObject(group)
      const size = box.getSize(new THREE.Vector3()).length()
      const center = box.getCenter(new THREE.Vector3())
      ctx.controls.target.copy(center)
      ctx.camera.position.copy(center).add(new THREE.Vector3(size, size, size))
      ctx.camera.far = Math.max(2000, size * 10)
      ctx.camera.updateProjectionMatrix()

      loadedUrlRef.current = stepFileUrl
      setStatus('')
    }

    loadStep().catch((err) => {
      if (!cancelled) setStatus(`Error: ${err instanceof Error ? err.message : String(err)}`)
    })

    return () => {
      cancelled = true
    }
  }, [stepFileUrl])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {status && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1.5 rounded-lg bg-white/90 text-xs text-gray-500">
          {status}
        </div>
      )}
    </div>
  )
}
