import { ChevronDown, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { TabName } from '../types'

const navItems: TabName[] = [
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
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-20">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Zap className="w-6 h-6 text-orange-500 fill-orange-500" />
          <span className="text-xl font-bold text-gray-800">Str</span>
          <span className="text-xl font-bold text-orange-500">ai</span>
          <span className="text-xl font-bold text-gray-800">ve</span>
        </div>
        <div className="h-6 w-px bg-gray-300 mx-2" />
        <span className="text-sm font-medium text-gray-700">AI Packaging Design Studio</span>
      </div>

      <nav className="flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => dispatch({ type: 'SET_TAB', tab: item })}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              state.activeTab === item
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-1 cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
          <span className="text-white text-sm font-medium">JD</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </header>
  )
}
