import { useState } from 'react'
import {
  Plus,
  Database,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Filter,
  Sparkles,
  Users,
  Settings,
  Truck,
  TrendingUp,
  Leaf,
  Shield,
  Lock,
  RotateCcw,
  MoreVertical,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { api } from '../api/client'

interface SidebarItem {
  name: string
  icon: React.ReactNode
  locked?: boolean
}

const designSpecs: SidebarItem[] = [
  { name: 'Filters', icon: <Filter className="w-4 h-4" /> },
  { name: 'Brand Design Intent', icon: <Sparkles className="w-4 h-4" /> },
  { name: 'Consumer Insights', icon: <Users className="w-4 h-4" /> },
  { name: 'Fill & Assembly', icon: <Settings className="w-4 h-4" /> },
  { name: 'Supplier Network', icon: <Truck className="w-4 h-4" />, locked: true },
  { name: 'Supply Chain', icon: <TrendingUp className="w-4 h-4" />, locked: true },
  { name: 'Sustainability', icon: <Leaf className="w-4 h-4" />, locked: true },
  { name: 'Compliance', icon: <Shield className="w-4 h-4" />, locked: true },
]

export function Sidebar() {
  const { state, dispatch } = useApp()
  const [projectsExpanded, setProjectsExpanded] = useState(true)

  const handleNewDesign = async () => {
    try {
      await api.clearSession(state.sessionId)
    } catch {
      // ignore
    }
    const newId = crypto.randomUUID()
    dispatch({ type: 'RESET', sessionId: newId })
  }

  const handleResetAll = async () => {
    try {
      await api.clearSession(state.sessionId)
    } catch {
      // ignore
    }
    dispatch({ type: 'RESET', sessionId: state.sessionId })
  }

  const productName = state.sessionState?.spec?.product_type
  const hasProject = state.sessionState && state.sessionState.step > 1

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="p-4 space-y-2">
        <button
          onClick={handleNewDesign}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Design
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 px-4 rounded-lg font-medium text-sm transition-colors">
          <Database className="w-4 h-4" />
          Asset Database
        </button>
      </div>

      <div className="px-4 py-2">
        <button
          onClick={() => setProjectsExpanded(!projectsExpanded)}
          className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 hover:text-gray-900"
        >
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            <span>PROJECTS</span>
            {hasProject && (
              <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-1.5">1</span>
            )}
          </div>
          {projectsExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {projectsExpanded && hasProject && (
          <div className="mt-2">
            <div className="border-2 border-orange-500 rounded-lg p-3 bg-orange-50/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-orange-600 truncate">
                  {productName
                    ? productName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                    : 'Frosted Glass Jar'}
                </span>
                <MoreVertical className="w-4 h-4 text-orange-400 shrink-0" />
              </div>
              <span className="text-xs text-orange-400 mt-0.5 block">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 flex-1">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Design Specifications
        </h3>
        <div className="space-y-1">
          {designSpecs.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center justify-between py-2 px-2 rounded-md text-sm transition-colors ${
                item.locked
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              disabled={item.locked}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.locked ? (
                <Lock className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleResetAll}
          className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>
    </aside>
  )
}
