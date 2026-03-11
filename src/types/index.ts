export type TabName =
  | 'Baseline'
  | 'Package Recommendation'
  | 'Design Synthesis'
  | 'Operational Mapping'
  | 'Customer Intelligence Report'
  | 'Final Report'

export interface DesignSpec {
  product_type: string | null
  size_or_volume: string | null
  intended_material: string | null
  closure_type: string | null
  design_style: string | null
  dimensions: Record<string, number>
  process_notes: string | null
}

export interface ImageVersion {
  image_id: string
  image_url_or_base64: string
  version: number
  prompt: string
  local_image_path: string | null
}

export interface SessionState {
  session_id: string
  step: number
  spec: DesignSpec
  missing_fields: string[]
  required_questions: string[]
  baseline_decision: string | null
  baseline_decision_done: boolean
  baseline_matches: BaselineMatch[]
  baseline_asset: Record<string, unknown> | null
  images: ImageVersion[]
  approved_image_id: string | null
  approved_image_version: number | null
  approved_image_local_path: string | null
  cad_sheet_prompt: string | null
  cad_sheet_image_id: string | null
  cad_sheet_image_url_or_base64: string | null
  cad_sheet_image_local_path: string | null
  cad_model_prompt: string | null
  cad_model_provider: string | null
  cad_model_code: string | null
  cad_model_last_error: string | null
  cad_model_code_path: string | null
  cad_step_file: string | null
  lock_question_asked: boolean
  lock_confirmed: boolean
  design_summary: string | null
  history: ChatHistoryEntry[]
}

export interface ChatHistoryEntry {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface BaselineMatch {
  asset_path: string
  asset_rel_path: string
  filename: string
  product_type: string | null
  material: string | null
  closure_type: string | null
  design_style: string | null
  size_or_volume: string | null
  summary: string | null
  tags: string | null
  score: number
}

export interface ChatRequest {
  session_id: string
  user_message: string
}

export interface ChatResponse {
  assistant_message: string
  step: number
  spec_summary: string
  required_questions: string[]
  can_generate_image: boolean
  can_iterate_image: boolean
  can_lock: boolean
  can_generate_cad: boolean
}

export interface ImageGenerateRequest {
  session_id: string
  prompt: string
}

export interface ImageEditRequest {
  session_id: string
  image_id: string
  instruction_prompt: string
}

export interface ImageResponse {
  image_id: string
  image_url_or_base64: string
  version: number
}

export interface JobStartResponse {
  job_id: string
  status: string
  message: string
}

export interface JobStatusResponse {
  job_id: string
  status: string
  message: string | null
  result: Record<string, unknown> | null
  error: string | null
}

export interface EditRecommendationsResponse {
  count: number
  recommendations: string[]
}

export interface SessionResponse {
  state: SessionState
}

export interface VersionApproveRequest {
  session_id: string
  version: number
}

export interface VersionApproveResponse {
  message: string
  approved_version: number
}

export interface CadSheetGenerateRequest {
  session_id: string
  prompt: string
}

export interface CadSheetGenerateResponse {
  message: string
  image_id: string
  image_url_or_base64: string
}

export interface CadModelGenerateRequest {
  session_id: string
  prompt: string
  provider?: string | null
}

export interface CadModelGenerateResponse {
  message: string
  success: boolean
  cad_code: string
  code_file: string | null
  step_file: string | null
  error_detail: string | null
  cached: boolean
  attempts: number | null
}

export interface BaselineAdoptRequest {
  session_id: string
  asset_rel_path: string
}

export interface BaselineSkipResponse {
  message: string
  step: number
}

export interface SessionClearResponse {
  message: string
}

export interface AssetCatalogItem {
  asset_rel_path: string
  filename: string
  product_type: string | null
  material: string | null
  closure_type: string | null
  design_style: string | null
  size_or_volume: string | null
  tags: string | null
  summary: string | null
  metadata_json: Record<string, unknown> | null
  updated_at: string
}

export interface AssetCatalogResponse {
  total: number
  items: AssetCatalogItem[]
}

export interface BriefUploadResponse {
  message: string
  step: number
  spec_summary: string
  required_questions: string[]
}

export interface ChatFlags {
  can_generate_image: boolean
  can_iterate_image: boolean
  can_lock: boolean
  can_generate_cad: boolean
}

export interface Project {
  id: string
  name: string
  date: string
  sessionId: string
}
