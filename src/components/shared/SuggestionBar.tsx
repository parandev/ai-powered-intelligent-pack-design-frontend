import { useState } from 'react'
import { Sparkles, Wand2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { api } from '../../api/client'
import type { TabName } from '../../types'

const suggestionChips = [
  'Luxury gold cap serum',
  'Frosted glass jar',
  'Minimal cream tube',
  'Premium pump dispenser',
  'Rose gold perfume',
  'Matte black container',
  'Crystal clear bottle',
]

const tabNavigationMap: Record<string, TabName[]> = {
  'Package Recommendation': ['Design Synthesis', 'Operational Mapping', 'Customer Intelligence Report', 'Final Report'],
  'Design Synthesis': ['Package Recommendation', 'Operational Mapping', 'Customer Intelligence Report', 'Final Report'],
  'Operational Mapping': ['Package Recommendation', 'Design Synthesis', 'Customer Intelligence Report', 'Final Report'],
  'Customer Intelligence Report': ['Package Recommendation', 'Design Synthesis', 'Operational Mapping', 'Final Report'],
  'Final Report': ['Package Recommendation', 'Design Synthesis', 'Operational Mapping', 'Customer Intelligence Report'],
  'Asset Database': ['Baseline', 'Package Recommendation', 'Design Synthesis', 'Operational Mapping', 'Customer Intelligence Report', 'Final Report'],
}

export function SuggestionBar() {
  const { state, dispatch, refreshSession, refreshRecommendations, isLoading } = useApp()
  const [input, setInput] = useState('')
  const loading = isLoading('chat') || isLoading('generate') || isLoading('edit')

  const tab = state.activeTab
  const isBaseline = tab === 'Baseline'
  const hasImages = (state.sessionState?.images?.length ?? 0) > 0
  const hasRecommendations = state.recommendations.length > 0
  const navTabs = tabNavigationMap[tab] || []
  const showSuggestions = tab !== 'Final Report' && tab !== 'Asset Database' && (isBaseline || hasImages)

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return
    setInput('')

    if (isBaseline) {
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

  if (!navTabs.length && !showSuggestions) return null

  return (
    <div className="w-full shrink-0 bg-gray-50 py-2 md:py-3 max-h-[40vh] md:max-h-none overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        {navTabs.length > 0 && (
          <div className="flex items-center gap-2 md:gap-4 py-1.5 md:py-2 mb-2 md:mb-3 overflow-x-auto flex-nowrap justify-start md:justify-center">
            {navTabs.map((t) => (
              <button
                key={t}
                onClick={() => dispatch({ type: 'SET_TAB', tab: t })}
                className="shrink-0 px-3 md:px-4 py-1.5 text-xs md:text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors rounded-full border border-gray-200 hover:border-gray-300"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {showSuggestions && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-2 md:px-5 md:py-3">
            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
              {isBaseline ? (
                <>
                  <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Suggestions
                  </span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Recommended Edits
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-nowrap md:flex-wrap gap-2 mb-2 md:mb-3 overflow-x-auto overflow-y-hidden pb-0.5 -mx-0.5 md:mx-0">
              {isBaseline ? (
                suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    className="shrink-0 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
                  >
                    {chip}
                  </button>
                ))
              ) : hasRecommendations ? (
                state.recommendations.map((rec) => (
                  <button
                    key={rec}
                    onClick={() => handleRecommendationClick(rec)}
                    className="shrink-0 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
                  >
                    {rec}
                  </button>
                ))
              ) : null}
            </div>

            <div className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-200 px-3 py-1.5 min-w-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder={isBaseline ? 'Describe your packaging...' : 'Describe the edit you want...'}
                disabled={loading}
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-xs"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={loading || !input.trim()}
                className="flex items-center gap-1.5 text-orange-400 hover:text-orange-500 font-medium text-xs transition-colors px-2.5 py-1 rounded-full border border-orange-200 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                Generate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
