import { useState } from 'react'
import { Sparkles, Send } from 'lucide-react'
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

export function BaselinePage() {
  const { state, dispatch, refreshSession, refreshRecommendations, isLoading } = useApp()
  const [input, setInput] = useState('')
  const loading = isLoading('chat') || isLoading('generate')

  const history = state.sessionState?.history ?? []
  const images = state.sessionState?.images ?? []
  const hasHistory = history.length > 0
  const baselineMatches = state.sessionState?.baseline_matches ?? []

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return
    setInput('')
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
  }

  const handleAdoptBaseline = async (assetRelPath: string) => {
    dispatch({ type: 'SET_LOADING', key: 'adopt', loading: true })
    try {
      await api.adoptBaseline(state.sessionId, assetRelPath)
      await refreshSession()
      dispatch({ type: 'SET_TAB', tab: 'Package Recommendation' })
    } catch (e) {
      console.error('Adopt baseline failed:', e)
    } finally {
      dispatch({ type: 'SET_LOADING', key: 'adopt', loading: false })
    }
  }

  const handleSelectImage = async (img: typeof images[0]) => {
    dispatch({ type: 'SET_SELECTED_VERSION', version: img.version })
    dispatch({ type: 'SET_TAB', tab: 'Package Recommendation' })
  }

  if (!hasHistory && images.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-3 bg-white rounded-full border border-gray-200 shadow-sm px-5 py-3">
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
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors px-3 py-1.5 rounded-md hover:bg-orange-50 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Retrieve
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setInput(chip)
                  handleSend(chip)
                }}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {history.map((msg, i) => {
          if (msg.role === 'system') return null
          const isUser = msg.role === 'user'
          return (
            <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  isUser
                    ? 'bg-gray-800 text-white'
                    : 'bg-white border border-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${isUser ? 'text-gray-300' : 'text-gray-500'}`}>
                    {isUser ? 'YOU' : 'AI ASSISTANT'}
                  </span>
                  <span className={`text-xs ${isUser ? 'text-gray-400' : 'text-gray-400'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          )
        })}

        {baselineMatches.length > 0 && images.length === 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-orange-600 uppercase">
                Baseline Matches ({baselineMatches.length})
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {baselineMatches.map((match) => (
                <button
                  key={match.asset_rel_path}
                  onClick={() => handleAdoptBaseline(match.asset_rel_path)}
                  className="shrink-0 w-36 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-orange-500 transition-colors"
                >
                  <img
                    src={`/asset-files/${match.asset_rel_path}`}
                    alt={match.filename}
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-2 text-xs text-gray-600 truncate">{match.filename}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {images.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-orange-600 uppercase">
                Generated Designs ({images.length})
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img) => (
                <button
                  key={img.image_id}
                  onClick={() => handleSelectImage(img)}
                  className={`shrink-0 w-36 rounded-lg overflow-hidden border-2 transition-colors ${
                    state.selectedVersion === img.version
                      ? 'border-orange-500'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <img
                    src={img.image_url_or_base64}
                    alt={`Design v${img.version}`}
                    className="w-full h-28 object-cover"
                  />
                </button>
              ))}
            </div>

          </div>
        )}

        {loading && (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
              <span className="text-sm">
                {isLoading('generate') ? 'Generating designs...' : 'Processing...'}
              </span>
            </div>
          </div>
        )}

        {!loading && hasHistory && images.length === 0 && baselineMatches.length === 0 && (
          <div className="flex justify-center py-4">
            <div className="flex items-center gap-3 bg-white rounded-full border border-gray-200 shadow-sm px-5 py-3 max-w-lg w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Continue describing your packaging..."
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="text-orange-500 hover:text-orange-600 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
  )
}
