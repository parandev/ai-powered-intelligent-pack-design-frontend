import { ArrowLeft, CheckCircle2, Download, Share2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { api } from '../../api/client'

export function PackageRecommendationPage() {
  const { state, dispatch, refreshSession, isLoading } = useApp()
  const images = state.sessionState?.images ?? []
  const selected = state.selectedVersion
  const currentImage = selected
    ? images.find((img) => img.version === selected)
    : images[images.length - 1]

  const approving = isLoading('approve')
  const approvedVersion = state.sessionState?.approved_image_version

  const productName = state.sessionState?.spec?.product_type
    ? state.sessionState.spec.product_type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Frosted Glass Jar'

  const handleApproveSelected = async () => {
    if (!currentImage || approving) return
    dispatch({ type: 'SET_LOADING', key: 'approve', loading: true })
    try {
      await api.approveVersion(state.sessionId, currentImage.version)
      await refreshSession()
    } catch (e) {
      console.error('Approval failed:', e)
    } finally {
      dispatch({ type: 'SET_LOADING', key: 'approve', loading: false })
    }
  }

  if (!currentImage) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <p className="text-sm">No package design selected. Go back to Baseline to generate designs.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto relative">
      <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
        <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
          <Download className="w-4 h-4" />
          Download
        </button>
        <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'Baseline' })}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Baseline
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-full p-12">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <img
              src={currentImage.image_url_or_base64}
              alt={productName}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <h2 className="text-center text-lg font-semibold text-gray-800 mt-4">
            {productName}
            {currentImage.prompt && currentImage.prompt !== productName && (
              <span className="block text-sm font-normal text-gray-500 mt-1">
                {currentImage.prompt.length > 60
                  ? currentImage.prompt.slice(0, 60) + '...'
                  : currentImage.prompt}
              </span>
            )}
          </h2>

          <div className="flex items-center justify-center mt-5">
            <button
              onClick={handleApproveSelected}
              disabled={approving || approvedVersion === currentImage.version}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors border disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
            >
              {approving ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
              ) : (
                <CheckCircle2 className={`w-4 h-4 ${approvedVersion === currentImage.version ? 'text-orange-500' : 'text-gray-500'}`} />
              )}
              {approvedVersion === currentImage.version ? 'Approved' : `Approve Version ${currentImage.version}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
