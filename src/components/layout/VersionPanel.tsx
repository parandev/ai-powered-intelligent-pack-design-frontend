import { ChevronDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function VersionPanel() {
  const { state, dispatch } = useApp()
  const images = state.sessionState?.images ?? []
  const selected = state.selectedVersion

  if (images.length === 0) return null

  return (
    <div className="w-40 bg-white border-l border-gray-200 p-3 shrink-0 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-700">Base Image 1</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {images.map((img) => {
          const isSelected = selected === img.version
          return (
            <button
              key={img.version}
              onClick={() => dispatch({ type: 'SET_SELECTED_VERSION', version: img.version })}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`w-full aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                  isSelected ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={img.image_url_or_base64}
                  alt={`Version ${img.version}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isSelected ? 'text-orange-500' : 'text-gray-500'
                }`}
              >
                Version {img.version}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
