import { ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { TabName } from '../types'

const navTabs: TabName[] = [
  'Baseline',
  'Package Recommendation',
  'Design Synthesis',
  'Operational Mapping',
  'Customer Intelligence Report',
  'Final Report',
]

export function Header() {
  const { state, dispatch } = useApp()

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shrink-0 z-20">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 3L6 16H14L12 25L22 12H14L16 3Z"
              fill="#F97316"
              stroke="#F97316"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-bold text-gray-900">
            Str<span className="text-orange-500">ai</span>ve
          </span>
        </div>
        <span className="text-gray-500 text-sm font-medium px-2 border-l border-gray-200">
          AI Packaging Design Studio
        </span>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-1">
        {navTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => dispatch({ type: 'SET_TAB', tab })}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              state.activeTab === tab
                ? 'bg-orange-500 text-white'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* User Avatar */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold">
            JD
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  )
}
