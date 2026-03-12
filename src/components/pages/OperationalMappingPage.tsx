import { useState } from 'react'
import { Clock, DollarSign, Users, AlertTriangle, Download, Share2, ArrowLeft, Truck } from 'lucide-react'
import { KpiCard } from '../shared/KpiCard'
import { SubTabs } from '../shared/SubTabs'
import { GanttChart } from '../shared/GanttChart'
import { useApp } from '../../context/AppContext'
import { SuggestionBar } from '../shared/SuggestionBar'

const subTabs = ['Production Timeline', 'Cost Breakdown', 'Risk Register', 'Supplier Info']

const ganttItems = [
  { name: 'Design Finalization', start: 0, duration: 1, color: '#1f2937', label: '1 Week' },
  { name: 'Supplier Sourcing', start: 1, duration: 2, color: '#374151', label: '2 Weeks' },
  { name: 'Tooling & Molds', start: 3, duration: 4, color: '#f59e0b', label: '4 Weeks' },
  { name: 'Pilot Run (MOQ 500)', start: 7, duration: 2, color: '#6b7280', label: '2 Weeks' },
  { name: 'Mass Production (5,000)', start: 9, duration: 3, color: '#9ca3af', label: '3 Weeks' },
  { name: 'QC & Certification', start: 12, duration: 1, color: '#d1d5db', label: '1 Week' },
  { name: 'Logistics & Delivery', start: 13, duration: 2, color: '#e5e7eb', label: '2 Weeks' },
]

export function OperationalMappingPage() {
  const { state, dispatch } = useApp()
  const [activeSubTab, setActiveSubTab] = useState('Production Timeline')

  const productName = state.sessionState?.spec?.product_type
    ? state.sessionState.spec.product_type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Frosted Glass Jar'

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Operational Mapping</h2>
            <p className="text-xs text-gray-500">
              {state.sessionState?.spec?.size_or_volume || '10ml'} {productName} — End-To-End Production & Logistics Plan
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_TAB', tab: 'Baseline' })}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Baseline
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <KpiCard
            title="Total Lead Time"
            value="15 Weeks"
            subtitle="End-to-end production"
            icon={<Clock className="w-4 h-4" />}
          />
          <KpiCard
            title="Total Cost (MOQ)"
            value="$14,150"
            subtitle="5,000 units all-in"
            icon={<DollarSign className="w-4 h-4" />}
          />
          <KpiCard
            title="Active Suppliers"
            value="3"
            subtitle="Gerresheimer · Stoelzle · OHL"
            icon={<Users className="w-4 h-4" />}
          />
          <KpiCard
            title="Open Risks"
            value="4"
            subtitle="2 medium · 2 low"
            icon={<AlertTriangle className="w-4 h-4" />}
          />
        </div>

        <SubTabs tabs={subTabs} activeTab={activeSubTab} onTabChange={setActiveSubTab} />
      </div>

      <div className="p-6">
        {activeSubTab === 'Production Timeline' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="w-5 h-5 text-gray-400" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Logistics & Delivery</h4>
                  <span className="text-xs text-yellow-600 font-medium bg-yellow-50 px-2 py-0.5 rounded ml-2">
                    PENDING
                  </span>
                </div>
                <span className="ml-auto text-sm font-semibold text-gray-700">2 Weeks</span>
              </div>
              <p className="text-xs text-gray-500">Air freight to primary DC, secondary sea freight.</p>
              <span className="text-xs text-gray-400">Supply Chain</span>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Gantt Overview — 15 Weeks Total
              </h4>
              <GanttChart items={ganttItems} totalWeeks={15} />
            </div>
          </div>
        )}

        {activeSubTab === 'Cost Breakdown' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Cost Breakdown</h4>
            <div className="space-y-3">
              {[
                { item: 'Tooling & Molds', cost: '$4,500' },
                { item: 'Raw Materials (5,000 units)', cost: '$5,200' },
                { item: 'Manufacturing Labor', cost: '$2,100' },
                { item: 'QC & Certification', cost: '$850' },
                { item: 'Logistics & Shipping', cost: '$1,500' },
              ].map((row) => (
                <div key={row.item} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">{row.item}</span>
                  <span className="text-sm font-semibold text-gray-900">{row.cost}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 font-bold">
                <span className="text-sm text-gray-900">Total</span>
                <span className="text-sm text-gray-900">$14,150</span>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'Risk Register' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Risk Register</h4>
            <div className="space-y-3">
              {[
                { risk: 'Mold tooling delay', severity: 'Medium', mitigation: 'Parallel tooling with backup supplier' },
                { risk: 'Glass breakage during transit', severity: 'Medium', mitigation: 'Custom foam inserts, reinforced packaging' },
                { risk: 'Color consistency variance', severity: 'Low', mitigation: 'Pre-production color sample approval' },
                { risk: 'Certification timeline overrun', severity: 'Low', mitigation: 'Early submission, parallel testing' },
              ].map((row) => (
                <div key={row.risk} className="flex gap-4 py-3 border-b border-gray-100">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800">{row.risk}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{row.mitigation}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded h-fit ${
                    row.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'
                  }`}>
                    {row.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'Supplier Info' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Supplier Information</h4>
            <div className="space-y-4">
              {[
                { name: 'Gerresheimer AG', location: 'Germany', role: 'Glass Body Manufacturing', moq: '5,000 units' },
                { name: 'Stoelzle Glass', location: 'Austria', role: 'Cap & Closure Supply', moq: '5,000 units' },
                { name: 'OHL Logistics', location: 'Global', role: 'Freight & Distribution', moq: 'N/A' },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-4 py-3 border-b border-gray-100">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800">{s.name}</span>
                    <p className="text-xs text-gray-500">{s.location} · {s.role}</p>
                  </div>
                  <span className="text-xs text-gray-500">MOQ: {s.moq}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
      <SuggestionBar />
    </div>
  )
}
