import { useState } from 'react'
import { Sparkles, Send } from 'lucide-react'
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

export function BottomBar() {
  const { state, dispatch, refreshSession, refreshRecommendations, isLoading } = useApp()
  const [input, setInput] = useState('')
  const loading = isLoading('chat') || isLoading('generate') || isLoading('edit')

  const navTabs = tabNavigationMap[state.activeTab] || []
  const isBaseline = state.activeTab === 'Baseline'
  const hasImages = (state.sessionState?.images?.length ?? 0) > 0

  const handleSubmit = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    if (isBaseline && !hasImages) {
      dispatch({ type: 'SET_LOADING', key: 'chat', loading: true })
      try {
        const res = await api.chat(state.sessionId, text)
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
      } catch (e) {
        console.error('Chat failed:', e)
      } finally {
        dispatch({ type: 'SET_LOADING', key: 'chat', loading: false })
      }
    } else if (hasImages && state.sessionState?.images?.length) {
      dispatch({ type: 'SET_LOADING', key: 'edit', loading: true })
      try {
        const latestImage = state.sessionState.images[state.sessionState.images.length - 1]
        const job = await api.editImageStart(state.sessionId, latestImage.image_id, text)
        await api.pollJob(job.job_id)
        await refreshSession()
        await refreshRecommendations()
      } catch (e) {
        console.error('Edit failed:', e)
      } finally {
        dispatch({ type: 'SET_LOADING', key: 'edit', loading: false })
      }
    } else {
      dispatch({ type: 'SET_LOADING', key: 'chat', loading: true })
      try {
        await api.chat(state.sessionId, text)
        await refreshSession()
      } catch (e) {
        console.error('Chat failed:', e)
      } finally {
        dispatch({ type: 'SET_LOADING', key: 'chat', loading: false })
      }
    }
  }

  const handleRecommendationClick = async (rec: string) => {
    if (loading || !state.sessionState?.images?.length) return
    setInput('')
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

      {state.recommendations.length > 0 && (
        <div className="flex items-center gap-2 px-6 py-2 overflow-x-auto">
          <div className="flex items-center gap-1 text-orange-500 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase">Recommended Edits</span>
          </div>
          <div className="flex items-center gap-2">
            {state.recommendations.map((rec) => (
              <button
                key={rec}
                onClick={() => handleRecommendationClick(rec)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
              >
                {rec}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-6 py-3">
        <div className="flex items-center gap-3 bg-gray-50 rounded-full border border-gray-200 px-5 py-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Describe your packaging..."
            disabled={loading}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors px-3 py-1.5 rounded-md hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isBaseline && !hasImages ? 'Retrieve' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  )
}
