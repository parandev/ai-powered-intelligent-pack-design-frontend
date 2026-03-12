import { useCallback, useEffect, useRef, useState } from 'react'
import { Database, RefreshCw, Loader2, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { api } from '../../api/client'
import type { AssetCatalogItem } from '../../types'

function nowTimeLabel(): string {
  const d = new Date()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}

function cleanValue(v: string | null | undefined): string {
  if (v === null || v === undefined) return '-'
  const t = String(v).trim()
  return t || '-'
}

export function AssetDatabasePage() {
  const { state, refreshSession } = useApp()
  const [items, setItems] = useState<AssetCatalogItem[]>([])
  const [indexStatus, setIndexStatus] = useState('Idle. Click "Index Asset Metadata" to start.')
  const [loadingIndex, setLoadingIndex] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null)
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressStartRef = useRef(0)

  const appendStatus = useCallback((line: string) => {
    setIndexStatus((prev) => {
      const existing = prev ? prev.split('\n') : []
      existing.push(`[${nowTimeLabel()}] ${line}`)
      return existing.join('\n')
    })
  }, [])

  const stopProgressTicker = useCallback(() => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
  }, [])

  const startProgressTicker = useCallback(() => {
    stopProgressTicker()
    progressStartRef.current = Date.now()
    appendStatus('Indexing started...')
    appendStatus('Scanning assets folder...')
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - progressStartRef.current
      const pct = Math.min(95, Math.max(3, Math.floor(elapsed / 180)))
      appendStatus(`Indexing in progress... ${pct}%`)
    }, 900)
  }, [appendStatus, stopProgressTicker])

  const refreshCatalog = useCallback(async () => {
    try {
      const data = await api.getAssetCatalog()
      setItems(data.items ?? [])
    } catch (e) {
      console.error('Failed to load asset catalog:', e)
      setItems([])
    }
  }, [])

  const runIndex = useCallback(
    async (forceReindex: boolean, source: string) => {
      if (loadingIndex) return
      setLoadingIndex(true)
      startProgressTicker()
      try {
        appendStatus(`${source}: request sent to backend indexer.`)
        const res = await api.indexAssetMetadata(forceReindex)
        stopProgressTicker()
        appendStatus('Metadata extraction completed: 100%')
        appendStatus(`Processed assets: ${res.total_assets}`)
        for (let i = 1; i <= res.total_assets; i += 1) {
          appendStatus(`Processed file ${i}/${res.total_assets}`)
        }
        appendStatus(`Updated in this run: ${res.indexed_count}`)
        appendStatus('Indexing finished successfully.')
        await refreshSession()
        await refreshCatalog()
      } catch (err) {
        stopProgressTicker()
        appendStatus(`Indexing failed: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setLoadingIndex(false)
      }
    },
    [loadingIndex, startProgressTicker, stopProgressTicker, appendStatus, refreshSession, refreshCatalog],
  )

  const handleIndexAssets = useCallback(() => {
    runIndex(false, 'Index Asset Metadata')
  }, [runIndex])

  const handleRefreshCatalog = useCallback(() => {
    runIndex(true, 'Refresh Catalog')
  }, [runIndex])

  const handleDelete = useCallback(
    async (assetRelPath: string) => {
      if (!window.confirm(`Delete asset: ${assetRelPath}?\n\nThis cannot be undone.`)) return
      setLoadingDelete(assetRelPath)
      try {
        await api.deleteAsset(assetRelPath)
        await refreshCatalog()
      } catch (e) {
        console.error('Delete failed:', e)
      } finally {
        setLoadingDelete(null)
      }
    },
    [refreshCatalog],
  )

  useEffect(() => {
    refreshCatalog()
    return () => stopProgressTicker()
  }, [refreshCatalog, stopProgressTicker])

  return (
    <div className="flex flex-col h-full min-h-0 p-6 overflow-auto">
      <div className="flex items-center gap-2 mb-6">
        <Database className="w-6 h-6 text-orange-500" />
        <h1 className="text-xl font-semibold text-gray-900">Asset Database</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={handleIndexAssets}
          disabled={loadingIndex}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {loadingIndex ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
          Index Asset Metadata
        </button>
        <button
          onClick={handleRefreshCatalog}
          disabled={loadingIndex}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loadingIndex ? 'animate-spin' : ''}`} />
          Refresh Catalog
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Indexing Progress &amp; Status</label>
        <textarea
          readOnly
          rows={7}
          value={indexStatus}
          className="w-full max-w-2xl px-3 py-2 text-sm font-mono text-gray-700 bg-gray-100 border border-gray-300 rounded-lg resize-none"
        />
      </div>

      <p className="text-sm text-gray-500 mb-3">Total assets: {items.length}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1 content-start">
        {items.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-500 text-sm">
            No indexed assets found. Click Index Asset Metadata first.
          </div>
        ) : (
          items.map((item, idx) => {
            const previewSrc = `/asset-files/${encodeURIComponent(item.asset_rel_path).replace(/%2F/g, '/')}`
            const deleting = loadingDelete === item.asset_rel_path
            return (
              <div
                key={item.asset_rel_path}
                className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm flex flex-col"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-700">{idx + 1}</span>
                    <img
                      src={previewSrc}
                      alt="Asset preview"
                      className="mt-1 w-full aspect-square object-contain bg-gray-50 rounded border border-gray-100"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).style.visibility = 'hidden'
                      }}
                    />
                    <div className="mt-2 space-y-0.5 text-xs text-gray-600">
                      <div>Type: {cleanValue(item.product_type)}</div>
                      <div>Material: {cleanValue(item.material)}</div>
                      <div>Closure: {cleanValue(item.closure_type)}</div>
                      <div>Style: {cleanValue(item.design_style)}</div>
                      <div>Size/Volume: {cleanValue(item.size_or_volume)}</div>
                      <div>Updated: {cleanValue(item.updated_at)}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.asset_rel_path)}
                    disabled={deleting}
                    className="shrink-0 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                    title="Delete this asset"
                  >
                    {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
