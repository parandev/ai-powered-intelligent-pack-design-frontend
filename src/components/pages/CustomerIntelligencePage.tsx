import { useState } from 'react'
import { DollarSign, Users, CreditCard, ThumbsUp, Download, Share2, ArrowLeft } from 'lucide-react'
import { KpiCard } from '../shared/KpiCard'
import { SubTabs } from '../shared/SubTabs'
import { DonutChart } from '../shared/DonutChart'
import { useApp } from '../../context/AppContext'

const subTabs = ['Consumer Segments', 'Market Trends', 'Competitive', 'Brand Sentiment']

const segments = [
  {
    name: 'Luxury Enthusiast',
    pct: 38,
    age: '30-55',
    spend: '$300+/mo',
    desc: 'Values prestige, craftsmanship & exclusivity. Driven by brand heritage.',
    color: '#f97316',
  },
  {
    name: 'Conscious Consumer',
    pct: 27,
    age: '25-40',
    spend: '$120-$300/mo',
    desc: 'Eco-first mindset, ingredient-led purchasing, social media influenced.',
    color: '#84cc16',
  },
  {
    name: 'Experience Seeker',
    pct: 21,
    age: '22-35',
    spend: '$80-$200/mo',
    desc: 'Drawn to sensory experience, aesthetics, ritual. Heavy on social sharing.',
    color: '#06b6d4',
  },
  {
    name: 'Value Optimizer',
    pct: 14,
    age: '28-45',
    spend: '$40-$100/mo',
    desc: 'Performance-per-dollar focus. Responds to trial sizes and loyalty value.',
    color: '#8b5cf6',
  },
]

const donutData = segments.map((s) => ({ name: s.name, value: s.pct, color: s.color }))

export function CustomerIntelligencePage() {
  const { state, dispatch } = useApp()
  const [activeSubTab, setActiveSubTab] = useState('Consumer Segments')

  const productName = state.sessionState?.spec?.product_type
    ? state.sessionState.spec.product_type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Frosted Glass Jar'

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Customer Intelligence</h2>
            <p className="text-xs text-gray-500">
              {state.sessionState?.spec?.size_or_volume || '10ml'} {productName} — Market Analysis
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
            title="Total Addressable Market"
            value="$48.2B"
            icon={<DollarSign className="w-4 h-4" />}
            trend="+12% YoY"
          />
          <KpiCard
            title="Target Consumer Reach"
            value="2.4M"
            icon={<Users className="w-4 h-4" />}
            trend="+8% YoY"
          />
          <KpiCard
            title="Avg. Willingness to Pay"
            value="$285"
            icon={<CreditCard className="w-4 h-4" />}
            trend="+$22 vs LY"
          />
          <KpiCard
            title="Brand Sentiment Score"
            value="87/100"
            icon={<ThumbsUp className="w-4 h-4" />}
            trend="+4 pts"
          />
        </div>

        <SubTabs tabs={subTabs} activeTab={activeSubTab} onTabChange={setActiveSubTab} />
      </div>

      <div className="p-6">
        {activeSubTab === 'Consumer Segments' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Segment Share</h3>
              <DonutChart data={donutData} centerLabel="segments" />
            </div>

            <div className="space-y-4">
              {segments.map((seg) => (
                <div
                  key={seg.name}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-900">{seg.name}</h4>
                      <span className="text-lg font-bold text-gray-900">{seg.pct}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Age: {seg.age} · Spend: {seg.spend}
                    </p>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{seg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'Market Trends' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Market Trends</h3>
            <div className="space-y-4">
              {[
                { trend: 'Sustainable Packaging Growth', detail: 'Consumer preference for eco-friendly materials up 34% YoY', impact: 'High' },
                { trend: 'Premium Skincare Boom', detail: 'Luxury skincare market projected to reach $68B by 2027', impact: 'High' },
                { trend: 'Minimalist Design Shift', detail: '62% of consumers prefer clean, minimal packaging aesthetics', impact: 'Medium' },
                { trend: 'Refillable Container Trend', detail: 'Refill-ready packaging demand growing at 28% CAGR', impact: 'Medium' },
              ].map((t) => (
                <div key={t.trend} className="flex gap-4 py-3 border-b border-gray-100">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800">{t.trend}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{t.detail}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded h-fit ${
                    t.impact === 'High' ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {t.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'Competitive' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Competitive Landscape</h3>
            <div className="space-y-3">
              {[
                { brand: 'La Mer', positioning: 'Ultra-premium glass jars', share: '18%' },
                { brand: 'SK-II', positioning: 'Premium glass, iconic red design', share: '14%' },
                { brand: 'Charlotte Tilbury', positioning: 'Rose gold premium aesthetic', share: '11%' },
                { brand: 'Drunk Elephant', positioning: 'Clean beauty, minimalist design', share: '9%' },
              ].map((c) => (
                <div key={c.brand} className="flex items-center gap-4 py-3 border-b border-gray-100">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800">{c.brand}</span>
                    <p className="text-xs text-gray-500">{c.positioning}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{c.share}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'Brand Sentiment' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Brand Sentiment Analysis</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">72%</div>
                <div className="text-sm text-gray-500 mt-1">Positive</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400">21%</div>
                <div className="text-sm text-gray-500 mt-1">Neutral</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">7%</div>
                <div className="text-sm text-gray-500 mt-1">Negative</div>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              {[
                { topic: 'Premium feel & aesthetics', sentiment: 'positive', mentions: 1245 },
                { topic: 'Eco-friendliness perception', sentiment: 'positive', mentions: 892 },
                { topic: 'Price point concerns', sentiment: 'negative', mentions: 234 },
                { topic: 'Packaging durability', sentiment: 'positive', mentions: 678 },
              ].map((t) => (
                <div key={t.topic} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">{t.topic}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      t.sentiment === 'positive' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {t.sentiment}
                    </span>
                    <span className="text-xs text-gray-400">{t.mentions} mentions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
