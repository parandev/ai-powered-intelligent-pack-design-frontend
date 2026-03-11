import { useState } from 'react'
import { Download, Share2, ArrowLeft, Sparkles } from 'lucide-react'
import { SubTabs } from '../shared/SubTabs'
import { useApp } from '../../context/AppContext'
import { api } from '../../api/client'

const subTabs = ['2D Diagram', '3D Generation', 'Specifications']

const materialBreakdown = [
  { name: 'Borosilicate Glass', pct: 60, color: 'bg-gray-800' },
  { name: 'Aluminum Alloy Cap', pct: 25, color: 'bg-gray-700' },
  { name: 'Polymer Seal', pct: 10, color: 'bg-orange-400' },
  { name: 'Other', pct: 5, color: 'bg-gray-400' },
]

const specRows = [
  { param: 'Volume', value: '10', unit: 'ml', tolerance: '±0.5 ml' },
  { param: 'Total Height', value: '42', unit: 'mm', tolerance: '±0.5 mm' },
  { param: 'Outer Diameter', value: '38', unit: 'mm', tolerance: '±0.3 mm' },
  { param: 'Wall Thickness', value: '3.2', unit: 'mm', tolerance: '±0.05 mm' },
  { param: 'Cap Height', value: '12', unit: 'mm', tolerance: '±0.5 mm' },
  { param: 'Base Thickness', value: '4.0', unit: 'mm', tolerance: '±0.05 mm' },
]

export function DesignSynthesisPage() {
  const { state, dispatch, refreshSession, isLoading } = useApp()
  const [activeSubTab, setActiveSubTab] = useState('2D Diagram')
  const loading2D = isLoading('cadsheet')
  const loading3D = isLoading('cadmodel')

  const cadSheetImage = state.sessionState?.cad_sheet_image_url_or_base64
  const cadStepFile = state.sessionState?.cad_step_file
  const approvedVersion = state.sessionState?.approved_image_version
  const images = state.sessionState?.images ?? []
  const currentImage = state.selectedVersion
    ? images.find((img) => img.version === state.selectedVersion)
    : images[images.length - 1]

  const productName = state.sessionState?.spec?.product_type
    ? state.sessionState.spec.product_type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Frosted Glass Jar'

  const specFromSession = state.sessionState?.spec
  const dynamicSpecRows = specFromSession?.dimensions
    ? Object.entries(specFromSession.dimensions).map(([key, val]) => ({
        param: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace(' Mm', ''),
        value: String(val),
        unit: 'mm',
        tolerance: `±0.5 mm`,
      }))
    : specRows

  const handleGenerate2D = async () => {
    if (loading2D) return
    dispatch({ type: 'SET_LOADING', key: 'cadsheet', loading: true })
    try {
      const prompt = `Generate a professional 2D CAD technical drawing sheet with multiple orthographic views, cross-sections, and dimensions for: ${productName} ${specFromSession?.size_or_volume || '10 ml'} ${specFromSession?.intended_material || 'glass'}`
      const job = await api.generateCadSheetStart(state.sessionId, prompt)
      await api.pollJob(job.job_id)
      await refreshSession()
    } catch (e) {
      console.error('CAD sheet generation failed:', e)
    } finally {
      dispatch({ type: 'SET_LOADING', key: 'cadsheet', loading: false })
    }
  }

  const handleGenerate3D = async () => {
    if (loading3D) return
    dispatch({ type: 'SET_LOADING', key: 'cadmodel', loading: true })
    try {
      const prompt = `Generate a parametric 3D CAD model (CadQuery Python) for: ${productName} ${specFromSession?.size_or_volume || '10 ml'} ${specFromSession?.intended_material || 'glass'} with ${specFromSession?.closure_type || 'screw'} closure`
      const job = await api.generateCadModelStart(state.sessionId, prompt)
      await api.pollJob(job.job_id)
      await refreshSession()
    } catch (e) {
      console.error('CAD model generation failed:', e)
    } finally {
      dispatch({ type: 'SET_LOADING', key: 'cadmodel', loading: false })
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
        <SubTabs tabs={subTabs} activeTab={activeSubTab} onTabChange={setActiveSubTab} />
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

      <div className="p-6">
        {activeSubTab === '2D Diagram' && (
          <div className="flex flex-col items-center">
            {cadSheetImage ? (
              <>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 max-w-3xl w-full">
                  <img
                    src={cadSheetImage}
                    alt="2D Technical Drawing"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <h3 className="text-center text-base font-medium text-gray-700 mt-4">
                  {productName} - 2D Diagram
                </h3>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                {!approvedVersion ? (
                  <p className="text-sm text-gray-500">
                    Approve a design version first to generate the 2D technical drawing.
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 mb-4">
                      Generate a 2D technical drawing from the approved design version v{approvedVersion}.
                    </p>
                    <button
                      onClick={handleGenerate2D}
                      disabled={loading2D}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
                    >
                      {loading2D ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      Generate 2D Diagram
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {activeSubTab === '3D Generation' && (
          <div className="flex flex-col items-center">
            {cadStepFile ? (
              <>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-2xl w-full flex flex-col items-center">
                  {currentImage ? (
                    <img
                      src={currentImage.image_url_or_base64}
                      alt="3D Model Preview"
                      className="w-80 h-80 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                      3D Model Generated
                    </div>
                  )}
                  <a
                    href={cadStepFile}
                    download
                    className="mt-4 flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download STEP File
                  </a>
                </div>
                <h3 className="text-center text-base font-medium text-gray-700 mt-4">
                  {productName} - 3D Generation Model
                </h3>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                {!approvedVersion ? (
                  <p className="text-sm text-gray-500">
                    Approve a design version first to generate the 3D model.
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 mb-4">
                      Generate a 3D STEP CAD model from approved version v{approvedVersion}.
                    </p>
                    <button
                      onClick={handleGenerate3D}
                      disabled={loading3D}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
                    >
                      {loading3D ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      Generate 3D Model
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'Specifications' && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">Material Breakdown</h3>
              <div className="space-y-3">
                {materialBreakdown.map((mat) => (
                  <div key={mat.name} className="flex items-center gap-3">
                    <span className="w-40 text-sm text-gray-700">{mat.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${mat.color}`}
                        style={{ width: `${mat.pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{mat.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h3 className="text-base font-semibold">AI Design Summary</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                The <span className="text-orange-400 font-medium">{specFromSession?.size_or_volume || '10ml'} frosted borosilicate glass jar</span>{' '}
                with matte silver screw cap achieves optimal balance of luxury aesthetics and functional durability.
                The UV-protective coating preserves formula integrity while the anti-fingerprint surface maintains pristine{' '}
                <span className="font-medium">retail presentation</span> throughout the product lifecycle.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Luxury Tier A', 'Eco-Compatible', 'Retail Ready', 'MOQ 5,000', 'Lead: 8 wks'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase py-3 px-4">
                      Parameter
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase py-3 px-4">
                      Value
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase py-3 px-4">
                      Unit
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase py-3 px-4">
                      Tolerance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dynamicSpecRows.map((row) => (
                    <tr key={row.param} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-700">{row.param}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">{row.value}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{row.unit}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{row.tolerance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
