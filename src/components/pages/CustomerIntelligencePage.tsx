"use client"

import { Download, Share2, Star, Sparkles, TrendingUp, CheckCircle2, Check } from 'lucide-react'

// Metric Card Component
// function MetricCard({
//   title,
//   value,
//   badge,
//   badgeVariant = 'dark',
//   progress,
//   progressColor = 'bg-gray-800',
//   progressBgColor = 'bg-gray-200',
//   subtitle,
//   icon,
//   showMinMax,
//   secondaryBadge,
//   secondaryBadgeVariant,
// }: {
//   title: string
//   value?: string
//   badge?: string
//   badgeVariant?: 'dark' | 'orange' | 'green' | 'yellow'
//   progress?: number
//   progressColor?: string
//   progressBgColor?: string
//   subtitle?: string
//   icon?: React.ReactNode
//   showMinMax?: boolean
//   secondaryBadge?: string
//   secondaryBadgeVariant?: 'orange' | 'yellow'
// }) {
//   const badgeStyles = {
//     dark: 'bg-gray-900 text-white',
//     orange: 'bg-orange-500 text-white',
//     green: 'bg-green-500 text-white',
//     yellow: 'border border-yellow-500 text-yellow-600 bg-transparent',
//   }

//   const secondaryBadgeStyles = {
//     orange: 'bg-orange-500 text-white',
//     yellow: 'border border-yellow-500 text-yellow-600 bg-transparent',
//   }

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4">
//       <div className="flex items-start justify-between mb-2">
//         <span className="text-sm text-gray-600">{title}</span>
//         {icon && <span className="text-gray-400">{icon}</span>}
//       </div>
      
//       {value && (
//         <div className="text-2xl font-bold text-orange-500 mb-2">{value}</div>
//       )}
      
//       {badge && (
//         <div className="mb-3">
//           <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${badgeStyles[badgeVariant]}`}>
//             {badge}
//           </span>
//           {secondaryBadge && secondaryBadgeVariant && (
//             <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ml-2 ${secondaryBadgeStyles[secondaryBadgeVariant]}`}>
//               {secondaryBadge}
//             </span>
//           )}
//         </div>
//       )}
      
//       {progress !== undefined && (
//         <div className="mt-2">
//           <div className={`h-1.5 rounded-full ${progressBgColor} overflow-hidden`}>
//             <div 
//               className={`h-full rounded-full ${progressColor}`} 
//               style={{ width: `${Math.min(progress, 100)}%` }}
//             />
//           </div>
//           {showMinMax && (
//             <div className="flex justify-between mt-1">
//               <span className="text-xs text-gray-400">Min</span>
//               <span className="text-xs text-gray-400">Pass</span>
//             </div>
//           )}
//         </div>
//       )}
      
//       {subtitle && (
//         <div className="text-xs text-gray-500 mt-2">{subtitle}</div>
//       )}
//     </div>
//   )
// }

// Segmented Progress Bar Component
// function SegmentedProgress({ segments, colors }: { segments: number[], colors: string[] }) {
//   return (
//     <div className="flex gap-1 mt-2">
//       {segments.map((_, idx) => (
//         <div key={idx} className={`h-1.5 flex-1 rounded ${colors[idx] || 'bg-gray-300'}`} />
//       ))}
//     </div>
//   )
// }

// Main Component
export function CustomerIntelligencePage() {
  const productName = 'Frosted Borosilicate Glass Jar'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Customer Intelligence</h1>
            <p className="text-sm text-gray-500">
              10ml {productName} — Market Analysis
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sentiment Risk Column */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Sentiment Risk</h2>
            <div className="space-y-4">
              {/* Hist. Failure Corr. */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-orange-500 mb-1">Hist. Failure Corr.</div>
                <div className="text-2xl font-bold text-orange-500 mb-2">82%</div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: '82%' }} />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-orange-500 text-white">
                  Critical
                </span>
              </div>

              {/* Quality Complaint Density */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Quality Complaint Density</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">4.2</div>
                <div className="text-xs text-gray-500 mb-2">Pcs Per 100k Units</div>
                <div className="flex gap-1 mb-2">
                  <div className="h-2 flex-1 rounded bg-green-500" />
                  <div className="h-2 flex-1 rounded bg-gray-700" />
                  <div className="h-2 flex-1 rounded bg-gray-600" />
                  <div className="h-2 flex-1 rounded bg-gray-500" />
                  <div className="h-2 flex-1 rounded bg-pink-300" />
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Target</span>
                  <span className="text-xs text-gray-400">Threshold</span>
                </div>
              </div>

              {/* Verified Return Rate */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Verified Return Rate</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">0.02%</span>
                  <CheckCircle2 className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Usability Score */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Usability Score</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">18.4</div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border border-gray-900 text-gray-900 mb-2">
                  Optimal
                </span>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mt-2">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Brand Alignment Column */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Brand Alignment</h2>
            <div className="space-y-4">
              {/* DNA Fidelity Index */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-orange-500 mb-1">DNA Fidelity Index</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">92.4%</div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-gray-900 text-white mb-2">
                  Core
                </span>
                <div className="flex gap-1 mt-2">
                  <div className="h-2 flex-1 rounded bg-gray-700" />
                  <div className="h-2 flex-1 rounded bg-gray-600" />
                  <div className="h-2 flex-1 rounded bg-gray-500" />
                  <div className="h-2 flex-1 rounded bg-gray-400" />
                  <div className="h-2 flex-1 rounded bg-gray-300" />
                </div>
              </div>

              {/* Material Palette */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-orange-500 mb-1">Material Palette</div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-gray-900 text-white">
                  High
                </span>
              </div>

              {/* Shelf-Recognition Velocity */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Shelf-Recognition Velocity</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">0.82s</div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border border-gray-900 text-gray-900 mb-2">
                  Optimized
                </span>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mt-2">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '75%' }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">Baseline</span>
                  <span className="text-xs text-gray-400">Rapid</span>
                </div>
              </div>

              {/* Premiumization Delta */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Premiumization Delta</div>
                <div className="text-2xl font-bold text-orange-500">+4.5%</div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mt-2">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Category Fit Column */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Category Fit</h2>
            <div className="space-y-4">
              {/* Market Format */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Market Format</span>
                  <Star className="w-4 h-4 text-gray-400" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-gray-900 text-white">
                  Optimal
                </span>
              </div>

              {/* Sustainability */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Sustainability</span>
                  <Sparkles className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">B+</div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-gray-400" style={{ width: '70%' }} />
                </div>
              </div>

              {/* Trend Relevance */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Trend Relevance</span>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-orange-500 text-white">
                    Low
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border border-yellow-500 text-yellow-600">
                    Alert
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: '35%' }} />
                </div>
              </div>

              {/* Disruption Ratio */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Disruption Ratio</div>
                <div className="text-2xl font-bold text-orange-500 mb-2">1:4</div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: '25%' }} />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border border-orange-500 text-orange-500">
                  Competitor
                </span>
              </div>
            </div>
          </div>

          {/* Functional Feedback Column */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Functional Feedback</h2>
            <div className="space-y-4">
              {/* Historical Evaluation */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Historical Evaluation</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">98.2%</div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-gray-900 text-white mb-2">
                  Pass
                </span>
                <div className="flex gap-1 mt-2">
                  <div className="h-2 flex-1 rounded bg-gray-700" />
                  <div className="h-2 flex-1 rounded bg-gray-600" />
                  <div className="h-2 flex-1 rounded bg-gray-500" />
                  <div className="h-2 flex-1 rounded bg-gray-400" />
                  <div className="h-2 flex-1 rounded bg-gray-300" />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">Min</span>
                  <span className="text-xs text-gray-400">Pass</span>
                </div>
              </div>

              {/* Actuator HTRP */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Actuator HTRP</div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-green-500 text-white mb-2">
                  Alert
                </span>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mt-2">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: '70%' }} />
                </div>
              </div>

              {/* Ergonomic Score */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Ergonomic Score</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">8.8</span>
                  <span className="text-sm text-gray-500">/10</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mt-2">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '88%' }} />
                </div>
              </div>

              {/* Seal Integrity */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Seal Integrity</div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-gray-400" />
                  <Check className="w-5 h-5 text-gray-900" />
                </div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerIntelligencePage
