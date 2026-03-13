"use client"

import { useState } from 'react'
import { 
  Download, 
  Share2, 
  Star, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Check, 
  Zap, 
  Clock, 
  Info,
  CheckCircle
} from 'lucide-react'

// ==========================================
// SECTION 1: PACKAGE RECOMMENDATION
// ==========================================
function PackageRecommendation() {
  const [selectedVersion, setSelectedVersion] = useState(4)
  
  const versions = [
    { id: 1, label: 'Version 1' },
    { id: 2, label: 'Version 2' },
    { id: 3, label: 'Version 3' },
    { id: 4, label: 'Version 4' },
  ]

  const specifications = [
    { label: 'Design Option', value: 'Frosted glass jar' },
    { label: 'SKU', value: 'CGJ-001-V1' },
    { label: 'Volume', value: '10 ml' },
    { label: 'Material', value: 'Borosilicate Glass' },
    { label: 'Finish', value: 'UV Frosted + Anti-fingerprint' },
    { label: 'Lead Time', value: '8 Weeks' },
    { label: 'Supplier', value: 'Gerresheimer AG, Germany' },
    { label: 'MOQ', value: '5,000 units' },
    { label: 'Unit Cost', value: '$2.40' },
    { label: 'Match Score', value: '97% AI Match' },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Package Recommendation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Product Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="border border-gray-200 rounded-xl p-8 mb-4 flex items-center justify-center bg-white">
            <div className="w-48 h-56 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-32 h-40 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg shadow-lg relative">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-700 rounded-t-lg" />
                <div className="absolute inset-2 top-10 bg-gradient-to-b from-white/20 to-transparent rounded" />
              </div>
            </div>
          </div>
          
          {/* Version Thumbnails */}
          <div className="flex gap-3 mb-4">
            {versions.map((version) => (
              <button
                key={version.id}
                onClick={() => setSelectedVersion(version.id)}
                className={`flex flex-col items-center`}
              >
                <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center bg-gray-100 ${
                  selectedVersion === version.id ? 'border-orange-500' : 'border-gray-200'
                }`}>
                  <div className="w-10 h-12 bg-gray-400 rounded" />
                </div>
                <span className={`text-xs mt-1 ${
                  selectedVersion === version.id ? 'text-orange-500 font-medium' : 'text-gray-500'
                }`}>
                  {version.label}
                </span>
              </button>
            ))}
          </div>
          
          {/* Product Title */}
          <div className="bg-gray-100 rounded-lg py-3 px-4 text-center">
            <span className="text-sm font-medium text-gray-900">
              Frosted Glass Jar With Increase Cap Height
            </span>
          </div>
        </div>

        {/* Right: Full Specifications */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">Full Specifications</h3>
          <div className="space-y-0">
            {specifications.map((spec, idx) => (
              <div 
                key={spec.label} 
                className={`flex justify-between py-3 ${
                  idx !== specifications.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-sm text-gray-500">{spec.label}</span>
                <span className="text-sm font-medium text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// SECTION 2: DESIGN SYNTHESIS
// ==========================================
function DesignSynthesis() {
  return (
    <div className="bg-gray-100 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Design Synthesis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2D Diagram */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="border border-gray-200 rounded-lg p-6 mb-4 min-h-[300px]">
            {/* Technical Drawing Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Front View */}
              <div className="border border-gray-300 rounded p-3 flex flex-col items-center">
                <div className="w-16 h-20 border-2 border-gray-400 rounded relative">
                  <div className="absolute top-0 left-0 right-0 h-4 border-b-2 border-gray-400 bg-gray-100" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #ccc 2px, #ccc 4px)' }} />
                </div>
                <div className="text-[10px] text-gray-500 mt-2 flex items-center gap-2">
                  <span className="border-t border-gray-400 w-4" />
                  <span>55</span>
                  <span className="border-t border-gray-400 w-4" />
                </div>
              </div>
              
              {/* Right Side View */}
              <div className="border border-gray-300 rounded p-3 flex flex-col items-center">
                <div className="w-14 h-16 border-2 border-gray-400 rounded relative">
                  <div className="absolute top-0 left-0 right-0 h-3 border-b-2 border-gray-400 bg-gray-100" />
                </div>
                <span className="text-[10px] text-gray-500 mt-2">Right Side View</span>
              </div>
              
              {/* Exploded View */}
              <div className="border border-gray-300 rounded p-3 flex flex-col items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-3 border border-gray-400 rounded bg-gray-100" />
                  <div className="w-12 h-10 border border-gray-400 rounded" />
                </div>
                <span className="text-[10px] text-gray-500 mt-2">Exploded View</span>
              </div>
              
              {/* Top View */}
              <div className="border border-gray-300 rounded p-3 flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center">
                  <div className="w-10 h-10 border border-gray-300 rounded" />
                </div>
                <span className="text-[10px] text-gray-500 mt-2">Top View</span>
              </div>
              
              {/* Section A-A */}
              <div className="border border-gray-300 rounded p-3 flex flex-col items-center">
                <div className="w-14 h-16 border-2 border-gray-400 rounded relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-300" />
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-300" />
                </div>
                <span className="text-[10px] text-gray-500 mt-2">Section A-A</span>
              </div>
              
              {/* Isometric View */}
              <div className="border border-gray-300 rounded p-3 flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-gray-400 rounded transform rotate-12" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #eee 2px, #eee 4px)' }} />
                <span className="text-[10px] text-gray-500 mt-2">Isometric View</span>
              </div>
            </div>
            
            {/* Technical Drawing Label */}
            <div className="mt-4 flex justify-center">
              <div className="border border-gray-300 rounded">
                <div className="flex items-center text-[10px] text-gray-600">
                  <div className="px-3 py-1 border-r border-gray-300 flex items-center gap-1">
                    <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center">+</span>
                  </div>
                  <div className="px-3 py-1 font-medium">TECHNICAL DRAWING</div>
                </div>
                <div className="flex items-center text-[10px] text-gray-500 border-t border-gray-300">
                  <div className="px-3 py-1 border-r border-gray-300">Scale:</div>
                  <div className="px-3 py-1 border-r border-gray-300">+.01 mm</div>
                  <div className="px-3 py-1 border-r border-gray-300">1:1</div>
                  <div className="px-3 py-1">+5</div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-center text-gray-700 font-medium">
            Frosted Glass Jar With Increase Cap Height - 2D Diagram
          </p>
        </div>

        {/* 3D Model */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="bg-gray-100 rounded-lg p-6 mb-4 min-h-[300px] flex items-center justify-center">
            {/* 3D Rendered Jar */}
            <div className="relative">
              <div className="w-40 h-44 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 rounded-lg shadow-2xl transform perspective-1000 rotate-y-12">
                {/* Cap */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-36 h-10 bg-gradient-to-b from-gray-500 to-gray-700 rounded-t-lg" 
                  style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 6px)' }} 
                />
                {/* Body */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-36 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-b-lg">
                  {/* Reflection */}
                  <div className="absolute left-2 top-2 w-1 h-24 bg-gradient-to-b from-white/30 to-transparent rounded" />
                  {/* Silver Ring */}
                  <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r from-gray-400 via-white to-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-center text-gray-700 font-medium">
            Frosted Glass Jar With Increase Cap Height - 3D Generation Model
          </p>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// SECTION 3: SPECIFICATIONS
// ==========================================
function Specifications() {
  const materials = [
    { name: 'Borosilicate Glass', percentage: 60, color: 'bg-orange-500' },
    { name: 'Aluminum Alloy Cap', percentage: 25, color: 'bg-gray-800' },
    { name: 'Polymer Seal', percentage: 10, color: 'bg-green-600' },
    { name: 'Other', percentage: 5, color: 'bg-green-400' },
  ]

  const parameters = [
    { parameter: 'Volume', value: '10', unit: 'ml', tolerance: '±0.5 ml' },
    { parameter: 'Total Height', value: '42', unit: 'mm', tolerance: '±0.1 mm' },
    { parameter: 'Outer Diameter', value: '38', unit: 'mm', tolerance: '±0.1 mm' },
    { parameter: 'Wall Thickness', value: '3.2', unit: 'mm', tolerance: '±0.05 mm' },
    { parameter: 'Cap Height', value: '12', unit: 'mm', tolerance: '±0.1 mm' },
    { parameter: 'Base Thickness', value: '4.0', unit: 'mm', tolerance: '±0.05 mm' },
    { parameter: 'Weight (empty)', value: '28', unit: 'g', tolerance: '±1 g' },
    { parameter: 'Cap Torque', value: '0.45', unit: 'Nm', tolerance: '±0.05 Nm' },
  ]

  const tags = ['Luxury Tier A', 'Eco-Compatible', 'Retail Ready', 'MOQ: 5,000', 'Lead: 8 wks']

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Specifications</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Material Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Material Breakdown</h3>
          <div className="space-y-4">
            {materials.map((material) => (
              <div key={material.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{material.name}</span>
                  <span className="text-sm font-medium text-gray-900">{material.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${material.color}`} 
                    style={{ width: `${material.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Design Summary */}
        <div className="bg-gray-900 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <h3 className="text-base font-semibold">AI Design Summary</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            The <span className="text-orange-400 font-medium">10ml frosted borosilicate glass jar</span> with matte silver screw cap achieves optimal balance of luxury aesthetics and functional durability. The UV-protective coating preserves formula integrity while the anti-fingerprint surface maintains pristine <span className="font-semibold text-white">retail presentation</span> throughout the product lifecycle.
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-gray-700 text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Parameters Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parameter</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tolerance</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param, idx) => (
              <tr key={param.parameter} className={idx !== parameters.length - 1 ? 'border-b border-gray-100' : ''}>
                <td className="px-6 py-4 text-sm text-gray-600">{param.parameter}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{param.value}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{param.unit}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{param.tolerance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ==========================================
// SECTION 4: OPERATIONAL MAPPING
// ==========================================
function OperationalMapping() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Operational Mapping</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Manufacturing Network */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Manufacturing Network</h3>
          <div className="space-y-4">
            {/* Region 01 */}
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">Region 01</span>
                <span className="text-sm font-semibold text-gray-900">92%</span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-2">North America - Plant A</div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-2">
                <div className="h-full rounded-full bg-blue-600" style={{ width: '92%' }} />
              </div>
              <div className="text-xs text-gray-500">Optimal Site Score: High Efficiency</div>
            </div>

            {/* Region 02 */}
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">Region 02</span>
                <span className="text-sm font-semibold text-gray-900">84%</span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-2">Europe - Site B</div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-2">
                <div className="h-full rounded-full bg-blue-600" style={{ width: '84%' }} />
              </div>
              <div className="text-xs text-gray-500">optimal site score: Standard Load</div>
            </div>

            {/* Region 03 */}
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">Region 03</span>
                <span className="text-sm font-semibold text-gray-900">76%</span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-2">Asia - Hub C</div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-2">
                <div className="h-full rounded-full bg-orange-500" style={{ width: '60%' }} />
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Optimal Site Score: </span>
                <span className="text-orange-500">Optimization Required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Line Metrics & Production Planning */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Line Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Line Efficiency */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-orange-500">Line Efficiency</span>
                  <CheckCircle2 className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">94.2%</div>
                <div className="flex gap-1">
                  <div className="h-3 flex-1 rounded bg-gray-300" />
                  <div className="h-3 flex-1 rounded bg-gray-400" />
                  <div className="h-3 flex-1 rounded bg-gray-500" />
                  <div className="h-3 flex-1 rounded bg-gray-600" />
                  <div className="h-3 flex-1 rounded bg-gray-700" />
                </div>
              </div>

              {/* Overall OEE */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Overall OEE</span>
                  <CheckCircle2 className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">88.5%</div>
                <div className="text-xs text-gray-500">+1.2% FROM SHIFT AVG</div>
              </div>

              {/* Technical Availability */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Technical Availability</span>
                  <Zap className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">96%</div>
                <div className="text-xs text-gray-500">UPTIME: 23.2H</div>
              </div>

              {/* Production Path */}
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Production Path</span>
                  <Zap className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">Optimized</div>
                <div className="text-xs text-gray-500">PATH ID: K2-422</div>
              </div>
            </div>
          </div>

          {/* Production Planning */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Production Planning</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">EST. Completion</div>
                <div className="text-xl font-bold text-gray-900">14:30</div>
                <div className="text-xs text-gray-500">Remaining</div>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Batch Progress</div>
                <div className="text-xl font-bold text-gray-900">65%</div>
                <div className="text-xs text-gray-500">Complete</div>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Next Scheduled</div>
                <div className="text-lg font-bold text-gray-900">Batch #403</div>
                <div className="text-xs text-gray-500">Soul Petline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Metrics */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Operational Metrics</h3>
          <div className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-900">Throughput Estimator</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900">420</span>
                <span className="text-xs text-gray-500 ml-1">PPM</span>
              </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-900">Quality Estimator</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">99.98%</span>
            </div>

            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-orange-400" />
                  <span className="text-sm text-gray-900">Changeparts Fit/Gap</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-green-500 text-white">
                  Alert
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-8">Custom Starwheel Required for Batch 402</div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-900">Investment Alert</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-orange-500">$120K</span>
                <div className="text-xs text-gray-500">EST. TOOLING</div>
              </div>
            </div>

            {/* Standard Comp Score */}
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between mb-2">
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
  )
}

// ==========================================
// SECTION 5: CUSTOMER INTELLIGENCE REPORT
// ==========================================
function CustomerIntelligenceReport() {
  const [comment, setComment] = useState('')

  return (
    <div className="bg-gray-100 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Intelligence Report</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Sentiment Risk */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Sentiment Risk</h3>
          <div className="space-y-4">
            {/* Hist. Failure Corr. */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Verified Return Rate</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">0.02%</span>
                <CheckCircle2 className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Usability Score */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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

        {/* Brand Alignment */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Brand Alignment</h3>
          <div className="space-y-4">
            {/* DNA Fidelity Index */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-orange-500 mb-2">Material Palette</div>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-gray-900 text-white">
                High
              </span>
            </div>

            {/* Shelf-Recognition Velocity */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Premiumization Delta</div>
              <div className="text-2xl font-bold text-orange-500">+4.5%</div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mt-2">
                <div className="h-full rounded-full bg-orange-500" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Category Fit */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Category Fit</h3>
          <div className="space-y-4">
            {/* Market Format */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Market Format</span>
                <Star className="w-4 h-4 text-gray-400" />
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-gray-900 text-white">
                Optimal
              </span>
            </div>

            {/* Sustainability */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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

        {/* Functional Feedback */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Functional Feedback</h3>
          <div className="space-y-4">
            {/* Historical Evaluation */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Actuator HTRP</div>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-green-500 text-white mb-2">
                Alert
              </span>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mt-2">
                <div className="h-full rounded-full bg-orange-500" style={{ width: '70%' }} />
              </div>
            </div>

            {/* Ergonomic Score */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
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
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Seal Integrity</div>
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

      {/* Brand Director Approval */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Brand Director Approval</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Optional comments or conditions for approval..."
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-orange-300"
          />
          <div className="flex gap-3">
            <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
              Request Changes
            </button>
            <button className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap">
              <CheckCircle className="w-4 h-4" />
              Approve & Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// MAIN FINAL REPORT PAGE
// ==========================================
export function FinalReportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Final Report</h1>
            <p className="text-sm text-gray-500">
              10ml frosted borosilicate glass Jar — Ready for production authorization
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
      <div className="p-6 space-y-8">
        {/* Section 1: Package Recommendation */}
        <PackageRecommendation />

        {/* Section 2: Design Synthesis */}
        <DesignSynthesis />

        {/* Section 3: Specifications */}
        <Specifications />

        {/* Section 4: Operational Mapping */}
        <OperationalMapping />

        {/* Section 5: Customer Intelligence Report */}
        <CustomerIntelligenceReport />
      </div>
    </div>
  )
}

export default FinalReportPage
