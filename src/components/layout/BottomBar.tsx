import { useApp } from '../../context/AppContext'
import type { TabName } from '../../types'

const tabNavigationMap: Record<string, TabName[]> = {
  'Package Recommendation': ['Design Synthesis', 'Operational Mapping', 'Customer Intelligence Report', 'Final Report', 'Asset Database'],
  'Design Synthesis': ['Package Recommendation', 'Operational Mapping', 'Customer Intelligence Report', 'Final Report', 'Asset Database'],
  'Operational Mapping': ['Package Recommendation', 'Design Synthesis', 'Customer Intelligence Report', 'Final Report', 'Asset Database'],
  'Customer Intelligence Report': ['Package Recommendation', 'Design Synthesis', 'Operational Mapping', 'Final Report', 'Asset Database'],
  'Final Report': ['Package Recommendation', 'Design Synthesis', 'Operational Mapping', 'Customer Intelligence Report', 'Asset Database'],
  'Asset Database': ['Baseline', 'Package Recommendation', 'Design Synthesis', 'Operational Mapping', 'Customer Intelligence Report', 'Final Report'],
}

export function BottomBar() {
  const { state, dispatch } = useApp()

  const navTabs = tabNavigationMap[state.activeTab] || []
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
    </div>
  )
}
