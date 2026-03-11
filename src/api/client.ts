import type {
  ChatResponse,
  ImageResponse,
  JobStartResponse,
  JobStatusResponse,
  EditRecommendationsResponse,
  SessionResponse,
  VersionApproveResponse,
  CadSheetGenerateResponse,
  CadModelGenerateResponse,
  BaselineSkipResponse,
  SessionClearResponse,
  AssetCatalogResponse,
  BriefUploadResponse,
} from '../types'

const BASE = ''

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`API ${res.status}: ${body}`)
  }
  return res.json()
}

export const api = {
  chat(sessionId: string, userMessage: string) {
    return request<ChatResponse>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, user_message: userMessage }),
    })
  },

  generateImageStart(sessionId: string, prompt: string) {
    return request<JobStartResponse>('/api/image/generate/start', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, prompt }),
    })
  },

  editImageStart(sessionId: string, imageId: string, instructionPrompt: string) {
    return request<JobStartResponse>('/api/image/edit/start', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, image_id: imageId, instruction_prompt: instructionPrompt }),
    })
  },

  getJobStatus(jobId: string) {
    return request<JobStatusResponse>(`/api/jobs/${jobId}`)
  },

  async pollJob(
    jobId: string,
    onProgress?: (status: string) => void,
    intervalMs = 2000,
    maxAttempts = 150,
  ): Promise<JobStatusResponse> {
    for (let i = 0; i < maxAttempts; i++) {
      const res = await this.getJobStatus(jobId)
      onProgress?.(res.status)
      if (res.status === 'success' || res.status === 'failed') return res
      await new Promise((r) => setTimeout(r, intervalMs))
    }
    throw new Error('Job polling timed out')
  },

  getRecommendations(sessionId: string) {
    return request<EditRecommendationsResponse>(`/api/recommendations/${sessionId}`)
  },

  getSession(sessionId: string) {
    return request<SessionResponse>(`/api/session/${sessionId}`)
  },

  adoptBaseline(sessionId: string, assetRelPath: string) {
    return request<ImageResponse>('/api/image/adopt-baseline', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, asset_rel_path: assetRelPath }),
    })
  },

  skipBaseline(sessionId: string) {
    return request<BaselineSkipResponse>('/api/baseline/skip', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId }),
    })
  },

  approveVersion(sessionId: string, version: number) {
    return request<VersionApproveResponse>('/api/version/approve', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, version }),
    })
  },

  generateCadSheetStart(sessionId: string, prompt: string) {
    return request<JobStartResponse>('/api/cad-sheet/generate/start', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, prompt }),
    })
  },

  generateCadSheet(sessionId: string, prompt: string) {
    return request<CadSheetGenerateResponse>('/api/cad-sheet/generate', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, prompt }),
    })
  },

  generateCadModelStart(sessionId: string, prompt: string, provider?: string) {
    return request<JobStartResponse>('/api/cad/model/generate/start', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, prompt, provider: provider ?? null }),
    })
  },

  generateCadModel(sessionId: string, prompt: string, provider?: string) {
    return request<CadModelGenerateResponse>('/api/cad/model/generate', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, prompt, provider: provider ?? null }),
    })
  },

  clearSession(sessionId: string) {
    return request<SessionClearResponse>('/api/session/clear', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId }),
    })
  },

  getAssetCatalog() {
    return request<AssetCatalogResponse>('/api/assets/catalog')
  },

  async uploadBrief(sessionId: string, file: File) {
    const form = new FormData()
    form.append('session_id', sessionId)
    form.append('file', file)
    const res = await fetch(`${BASE}/api/brief/upload`, { method: 'POST', body: form })
    if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`)
    return res.json() as Promise<BriefUploadResponse>
  },
}
