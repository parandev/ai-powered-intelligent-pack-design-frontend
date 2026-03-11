import { useState } from 'react'
import {
  Download,
  Share2,
  ArrowLeft,
  FileText,
  Box,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { api } from '../../api/client'

const workflowSteps = [
  { name: 'Design Synthesis', person: 'Jane Doe', date: 'Mar 1, 2026' },
  { name: 'Operational Mapping', person: 'Supply Chain', date: 'Mar 2, 2026' },
  { name: 'Customer Intelligence', person: 'Brand Strategy', date: 'Mar 2, 2026' },
  { name: 'Brand Director Review', person: 'Pending', date: '' },
  { name: 'Final Sign-off', person: '', date: '' },
]

const specificationRows = [
  { label: 'Design Option', value: 'Frosted + Gold Ring (Opt. 1)' },
  { label: 'SKU', value: 'CGJ-001-V1' },
  { label: 'Volume', value: '10 ml' },
  { label: 'Material', value: 'Borosilicate Glass' },
  { label: 'Finish', value: 'UV Frosted + Anti-fingerprint' },
  { label: 'Lead Time', value: '8 Weeks' },
  { label: 'Supplier', value: 'Gerresheimer AG, Germany' },
  { label: 'MOQ', value: '5,000 units' },
  { label: 'Unit Cost', value: '$2.90' },
  { label: 'Match Score', value: '98% AI Match' },
]

const exportItems = [
  { name: 'Full Spec PDF', desc: 'Technical drawings, materials & costs', icon: FileText, color: 'text-blue-600' },
  { name: 'CAD File (STEP)', desc: '3D model for manufacturing', icon: Box, color: 'text-green-600' },
  { name: 'Print-Ready Files', desc: 'Label artwork at 300 DPI', icon: Printer, color: 'text-purple-600' },
  { name: 'Supplier Brief', desc: 'Production brief for Gerresheimer', icon: FileSpreadsheet, color: 'text-orange-600' },
]

export function FinalReportPage() {
  const { state, dispatch, refreshSession, isLoading } = useApp()
  const [comment, setComment] = useState('')
  const approving = isLoading('approve')

  const approvedVersion = state.sessionState?.approved_image_version
  const completedSteps = state.sessionState?.step ? Math.min(state.sessionState.step - 4, 3) : 3

  const productName = state.sessionState?.spec?.product_type
    ? state.sessionState.spec.product_type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Frosted Glass Jar'

  const handleApprove = async () => {
    if (!approvedVersion || approving) return
    dispatch({ type: 'SET_LOADING', key: 'approve', loading: true })
    try {
      await api.approveVersion(state.sessionId, approvedVersion)
      await refreshSession()
    } catch (e) {
      console.error('Approval failed:', e)
    } finally {
      dispatch({ type: 'SET_LOADING', key: 'approve', loading: false })
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Final Selection</h2>
            <p className="text-xs text-gray-500">
              {state.sessionState?.spec?.size_or_volume || '10ml'} {productName} — Ready for production authorization
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
      </div>

      <div className="p-6 space-y-6">
        {/* Approval Workflow */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-gray-900">Approval Workflow</h3>
            <span className="text-sm text-gray-500">{completedSteps}/5 approved</span>
          </div>
          <div className="flex items-center justify-between">
            {workflowSteps.map((step, i) => {
              const isCompleted = i < completedSteps
              const isLast = i === workflowSteps.length - 1
              return (
                <div key={step.name} className="flex items-center flex-1">
                  <div className="flex flex-col items-center text-center flex-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-orange-500 fill-orange-500 mb-2" />
                    ) : (
                      <Circle className="w-8 h-8 text-gray-300 mb-2" />
                    )}
                    <span className="text-xs font-medium text-gray-700">{step.name}</span>
                    {step.person && (
                      <span className="text-[10px] text-gray-400 mt-0.5">{step.person}</span>
                    )}
                    {step.date && (
                      <span className="text-[10px] text-gray-400">{step.date}</span>
                    )}
                  </div>
                  {!isLast && (
                    <div className={`h-0.5 w-full -mt-6 ${i < completedSteps - 1 ? 'bg-orange-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Full Specifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Full Specifications</h3>
            <div className="space-y-3">
              {specificationRows.map((row) => (
                <div key={row.label} className="flex justify-between py-1.5">
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm font-medium text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Export & Share */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Export & Share</h3>
            <div className="space-y-3">
              {exportItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Brand Director Approval */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Brand Director Approval</h3>
            <p className="text-xs text-gray-500 mb-3">
              Add an optional comment and approve to proceed to production authorization.
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Optional comments or conditions for approval..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-orange-300 resize-none"
            />
            <div className="flex items-center gap-3 mt-4">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Request Changes
              </button>
              <button
                onClick={handleApprove}
                disabled={approving}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {approving && (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                Approve & Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
