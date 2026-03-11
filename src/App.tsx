import { AppProvider, useApp } from './context/AppContext'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { BottomBar } from './components/layout/BottomBar'
import { VersionPanel } from './components/layout/VersionPanel'
import { BaselinePage } from './components/pages/BaselinePage'
import { PackageRecommendationPage } from './components/pages/PackageRecommendationPage'
import { DesignSynthesisPage } from './components/pages/DesignSynthesisPage'
import { OperationalMappingPage } from './components/pages/OperationalMappingPage'
import { CustomerIntelligencePage } from './components/pages/CustomerIntelligencePage'
import { FinalReportPage } from './components/pages/FinalReportPage'

const showVersionPanel = new Set([
  'Package Recommendation',
  'Design Synthesis',
  'Operational Mapping',
  'Customer Intelligence Report',
  'Final Report',
])

function AppContent() {
  const { state } = useApp()
  const tab = state.activeTab

  let page: React.ReactNode
  switch (tab) {
    case 'Baseline':
      page = <BaselinePage />
      break
    case 'Package Recommendation':
      page = <PackageRecommendationPage />
      break
    case 'Design Synthesis':
      page = <DesignSynthesisPage />
      break
    case 'Operational Mapping':
      page = <OperationalMappingPage />
      break
    case 'Customer Intelligence Report':
      page = <CustomerIntelligencePage />
      break
    case 'Final Report':
      page = <FinalReportPage />
      break
    default:
      page = <BaselinePage />
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-1 min-h-0">
            <div className="flex-1 flex flex-col min-w-0">{page}</div>
            {showVersionPanel.has(tab) && <VersionPanel />}
          </div>
          <BottomBar />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
