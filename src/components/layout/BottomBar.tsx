import { useState } from 'react'
import { Sparkles, Wand2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { api } from '../../api/client'
import type { TabName } from '../../types'

const tabNavigationMap: Record<string, TabName[]> = {
  'Package Recommendation': ['Design Synthesis', 'Operational Mapping', 'Customer Intelligence Report', 'Final Report'],
  'Design Synthesis': ['Package Recommendation', 'Operational Mapping', 'Customer Intelligence Report', 'Final Report'],
  'Operational Mapping': ['Package Recommendation', 'Design Synthesis', 'Customer Intelligence Report', 'Final Report'],
  'Customer Intelligence Report': ['Package Recommendation', 'Design Synthesis', 'Operational Mapping', 'Final Report'],
  'Final Report': ['Package Recommendation', 'Design Synthesis', 'Operational Mapping', 'Customer Intelligence Report'],
}

const suggestionChips = [
  'Luxury gold cap serum',
  'Frosted glass jar',
  'Minimal cream tube',
  'Premium pump dispenser',
  'Rose gold perfume',
  'Matte black container',
  'Crystal clear bottle',
]

export function BottomBar() {
  const { state, dispatch, refreshSession, refreshRecommendations, isLoading } = useApp()
  const [input, setInput] = useState('')
  const loading = isLoading('chat') || isLoading('generate') || isLoading('edit')

  const navTabs = tabNavigationMap[state.activeTab] || []
  const isBaseline = state.activeTab === 'Baseline'
  const isFinalReport = state.activeTab === 'Final Report'
  const hasImages = (state.sessionState?.images?.length ?? 0) > 0
  const hasRecommendations = state.recommendations.length > 0

  // Only show bottom input section on Baseline and other pages except Final Report
  const showInputSection = !isFinalReport && (isBaseline || hasImages)

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return
    setInput('')

    if (isBaseline) {
      // On Baseline: chat and potentially generate new designs
      dispatch({ type: 'SET_LOADING', key: 'chat', loading: true })
      try {
        const res = await api.chat(state.sessionId, text.trim())
        dispatch({
          type: 'SET_CHAT_FLAGS',
          flags: {
            can_generate_image: res.can_generate_image,
            can_iterate_image: res.can_iterate_image,
            can_lock: res.can_lock,
            can_generate_cad: res.can_generate_cad,
          },
        })
        await refreshSession()
        await refreshRecommendations()

        if (res.can_generate_image) {
          dispatch({ type: 'SET_LOADING', key: 'generate', loading: true })
          try {
            const job = await api.generateImageStart(state.sessionId, text.trim())
            await api.pollJob(job.job_id)
            await refreshSession()
          } catch (e) {
            console.error('Image generation failed:', e)
          } finally {
            dispatch({ type: 'SET_LOADING', key: 'generate', loading: false })
          }
        }
      } catch (e) {
        console.error('Chat failed:', e)
      } finally {
        dispatch({ type: 'SET_LOADING', key: 'chat', loading: false })
      }
    } else if (hasImages) {
      // On other pages: edit the latest image
      dispatch({ type: 'SET_LOADING', key: 'edit', loading: true })
      try {
        const latestImage = state.sessionState!.images[state.sessionState!.images.length - 1]
        const job = await api.editImageStart(state.sessionId, latestImage.image_id, text.trim())
        await api.pollJob(job.job_id)
        await refreshSession()
        await refreshRecommendations()
      } catch (e) {
        console.error('Edit failed:', e)
      } finally {
        dispatch({ type: 'SET_LOADING', key: 'edit', loading: false })
      }
    }
  }

  const handleChipClick = (chip: string) => {
    setInput(chip)
    handleSend(chip)
  }

  const handleRecommendationClick = async (rec: string) => {
    if (loading || !state.sessionState?.images?.length) return
    dispatch({ type: 'SET_LOADING', key: 'edit', loading: true })
    try {
      const latestImage = state.sessionState.images[state.sessionState.images.length - 1]
      const job = await api.editImageStart(state.sessionId, latestImage.image_id, rec)
      await api.pollJob(job.job_id)
      await refreshSession()
      await refreshRecommendations()
    } catch (e) {
      console.error('Recommendation edit failed:', e)
    } finally {
      dispatch({ type: 'SET_LOADING', key: 'edit', loading: false })
    }
  }

  return (
    <div className="bg-white border-t border-gray-200 shrink-0">
      {/* Navigation tabs */}
      {navTabs.length > 0 && (
        <div className="flex items-center justify-center gap-4 py-2 border-b border-gray-100">
          {navTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => dispatch({ type: 'SET_TAB', tab })}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Input section - Suggestions for Baseline, Recommended Edits for others */}
      {showInputSection && (
        <div className="p-4 bg-gray-50">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              {isBaseline ? (
                <>
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Suggestions
                  </span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Recommended Edits
                  </span>
                </>
              )}
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {isBaseline ? (
                // Suggestion chips for Baseline
                suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
                  >
                    {chip}
                  </button>
                ))
              ) : (
                // Server recommendations for other pages
                hasRecommendations ? (
                  state.recommendations.map((rec) => (
                    <button
                      key={rec}
                      onClick={() => handleRecommendationClick(rec)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
                    >
                      {rec}
                    </button>
                  ))
                ) : (
                  // Fallback chips when no server recommendations
                  <>
                    <button
                      onClick={() => handleChipClick('Increase cap height')}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
                    >
                      Increase cap height
                    </button>
                    <button
                      onClick={() => handleChipClick('Change to matte finish')}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
                    >
                      Change to matte finish
                    </button>
                    <button
                      onClick={() => handleChipClick('Add metallic accent')}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
                    >
                      Add metallic accent
                    </button>
                    <button
                      onClick={() => handleChipClick('Adjust proportions')}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
                    >
                      Adjust proportions
                    </button>
                  </>
                )
              )}
            </div>

            {/* Input field */}
            <div className="flex items-center gap-3 bg-white rounded-full border border-gray-200 px-4 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Describe your packaging..."
                disabled={loading}
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={loading || !input.trim()}
                className="flex items-center gap-2 text-orange-400 hover:text-orange-500 font-medium text-sm transition-colors px-3 py-1.5 rounded-full border border-orange-200 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
