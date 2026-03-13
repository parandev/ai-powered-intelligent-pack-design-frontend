"use client"

import { Download, Share2, Zap, CheckCircle2, Clock, Info } from 'lucide-react'

// Region Card Component
function RegionCard({
  region,
  percentage,
  location,
  progress,
  progressColor = 'bg-blue-600',
  note,
  noteType = 'normal',
}: {
  region: string
  percentage: string
  location: string
  progress: number
  progressColor?: string
  note: string
  noteType?: 'normal' | 'warning'
}) {
  return (
    <div className="border border-gray-100 rounded-lg p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-500">{region}</span>
        <span className="text-lg font-semibold text-gray-900">{percentage}</span>
      </div>
      <div className="text-sm font-medium text-gray-900 mb-2">{location}</div>
      <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-2">
        <div 
          className={`h-full rounded-full ${progressColor}`} 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={`text-xs ${noteType === 'warning' ? 'text-orange-500' : 'text-gray-500'}`}>
        {noteType === 'warning' ? (
          <span>Optimal Site Score: <span className="text-orange-500">{note}</span></span>
        ) : (
          <span>{note}</span>
        )}
      </div>
    </div>
  )
}

// Metric Box Component
function MetricBox({
  title,
  value,
  subtitle,
  icon,
  segments,
}: {
  title: string
  value: string
  subtitle?: string
  icon?: React.ReactNode
  segments?: boolean
}) {
  return (
    <div className="border border-gray-100 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-orange-500">{title}</span>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {subtitle && <div className="text-xs text-gray-500 uppercase tracking-wide">{subtitle}</div>}
      {segments && (
        <div className="flex gap-1 mt-3">
          <div className="h-3 flex-1 rounded bg-gray-300" />
          <div className="h-3 flex-1 rounded bg-gray-400" />
          <div className="h-3 flex-1 rounded bg-gray-500" />
          <div className="h-3 flex-1 rounded bg-gray-600" />
          <div className="h-3 flex-1 rounded bg-gray-700" />
        </div>
      )}
    </div>
  )
}

// Simple Metric Component
// function SimpleMetric({
//   label,
//   value,
//   unit,
// }: {
//   label: string
//   value: string
//   unit?: string
// }) {
//   return (
//     <div className="border border-gray-100 rounded-lg p-4">
//       <div className="text-sm text-gray-500 mb-1">{label}</div>
//       <div className="text-xl font-bold text-gray-900">{value}</div>
//       {unit && <div className="text-xs text-gray-500 mt-1">{unit}</div>}
//     </div>
//   )
// }

// Operational Metric Row Component
function OperationalMetricRow({
  icon,
  title,
  value,
  unit,
  alert,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  value?: string
  unit?: string
  alert?: boolean
  subtitle?: string
}) {
  return (
    <div className="border border-gray-100 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="text-gray-400">{icon}</div>
        <div className="flex-1">
          <div className="text-sm text-gray-900">{title}</div>
          {subtitle && <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>}
        </div>
        <div className="text-right">
          {alert ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-green-500 text-white">
              Alert
            </span>
          ) : (
            <div>
              <span className="text-lg font-semibold text-gray-900">{value}</span>
              {unit && <span className="text-xs text-gray-500 ml-1">{unit}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main Component
export function OperationalMappingPage() {
  const productName = 'Frosted Borosilicate Glass Jar'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Operational Mapping</h1>
            <p className="text-sm text-gray-500">
              10ml {productName} — End-To-End Production & Logistics Plan
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Manufacturing Network Column */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Manufacturing Network</h2>
            <div className="space-y-4">
              <RegionCard
                region="Region 01"
                percentage="92%"
                location="North America - Plant A"
                progress={92}
                progressColor="bg-blue-600"
                note="Optimal Site Score: High Efficiency"
              />
              <RegionCard
                region="Region 02"
                percentage="84%"
                location="Europe - Site B"
                progress={84}
                progressColor="bg-blue-600"
                note="optimal site score: Standard Load"
              />
              <RegionCard
                region="Region 03"
                percentage="76%"
                location="Asia - Hub C"
                progress={60}
                progressColor="bg-blue-600"
                note="Optimization Required"
                noteType="warning"
              />
            </div>
          </div>

          {/* Line Metrics & Production Planning Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Line Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Line Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                <MetricBox
                  title="Line Efficiency"
                  value="94.2%"
                  icon={<CheckCircle2 className="w-4 h-4" />}
                  segments
                />
                <MetricBox
                  title="Overall OEE"
                  value="88.5%"
                  subtitle="+1.2% FROM SHIFT AVG"
                  icon={<CheckCircle2 className="w-4 h-4" />}
                />
                <div className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Technical Availability</span>
                    <Zap className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">96%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">UPTIME: 23.2H</div>
                </div>
                <div className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Production Path</span>
                    <Zap className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">Optimized</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">PATH ID: K2-422</div>
                </div>
              </div>
            </div>

            {/* Production Planning */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Production Planning</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">EST. Completion</div>
                  <div className="text-2xl font-bold text-gray-900">14:30</div>
                  <div className="text-xs text-gray-500">Remaining</div>
                </div>
                <div className="border border-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Batch Progress</div>
                  <div className="text-2xl font-bold text-gray-900">65%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
                <div className="border border-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Next Scheduled</div>
                  <div className="text-xl font-bold text-gray-900">Batch #403</div>
                  <div className="text-xs text-gray-500">Soul Petline</div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Metrics Column */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Operational Metrics</h2>
            <div className="space-y-4">
              <OperationalMetricRow
                icon={<Zap className="w-5 h-5" />}
                title="Throughput Estimator"
                value="420"
                unit="PPM"
              />
              <OperationalMetricRow
                icon={<CheckCircle2 className="w-5 h-5" />}
                title="Quality Estimator"
                value="99.98%"
              />
              <OperationalMetricRow
                icon={<Zap className="w-5 h-5" />}
                title="Changeparts Fit/Gap"
                subtitle="Custom Starwheel Required for Batch 402"
                alert
              />
              <OperationalMetricRow
                icon={<Clock className="w-5 h-5" />}
                title="Investment Alert"
                value="$120K"
                unit="EST. TOOLING"
              />

              {/* Standard Comp Score */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Standard Comp Score</span>
                  <span className="text-sm font-semibold text-gray-900">88/15</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-green-500" style={{ width: '75%' }} />
                </div>
              </div>

              {/* System Note */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-semibold text-orange-600 uppercase">System Note</span>
                </div>
                <p className="text-xs text-gray-700">
                  Custom tooling costs are trending 14% higher than previous quarter average. AI analysis suggests part standardization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperationalMappingPage
