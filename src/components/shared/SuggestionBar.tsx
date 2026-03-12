import { useState } from 'react'
import { Sparkles, Wand2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { api } from '../../api/client'

const suggestionChips = [
  'Luxury gold cap serum',
  'Frosted glass jar',
  'Minimal cream tube',
  'Premium pump dispenser',
  'Rose gold perfume',
  'Matte black container',
  'Crystal clear bottle',
]

export function SuggestionBar() {
  const { state, dispatch, refreshSession, refreshRecommendations, isLoading } = useApp()
  const [input, setInput] = useState('')
  const loading = isLoading('chat') || isLoading('generate') || isLoading('edit')

  const isBaseline = state.activeTab === 'Baseline'
  const hasImages = (state.sessionState?.images?.length ?? 0) > 0
  const hasRecommendations = state.recommendations.length > 0

  if (!isBaseline && !hasImages) return null

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

  return (
    <div className="w-full shrink-0 border-t border-gray-200 bg-gray-50 py-3">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-3">
          <div className="flex items-center gap-2 mb-2">
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

        <div className="flex flex-wrap gap-2 mb-3">
          {isBaseline ? (
            suggestionChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {chip}
              </button>
            ))
          ) : hasRecommendations ? (
            state.recommendations.map((rec) => (
              <button
                key={rec}
                onClick={() => handleRecommendationClick(rec)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {rec}
              </button>
            ))
          ) : null}
        </div>

        <div className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-200 px-3 py-1.5">
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
            Go
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}

