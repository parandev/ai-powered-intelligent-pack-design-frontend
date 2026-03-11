interface SubTabsProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SubTabs({ tabs, activeTab, onTabChange }: SubTabsProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
