import { createContext, useContext, useReducer, type ReactNode, useCallback } from 'react'
import type { TabName, SessionState, ChatFlags, Project } from '../types'
import { api } from '../api/client'

interface AppState {
  activeTab: TabName
  sessionId: string
  sessionState: SessionState | null
  selectedVersion: number | null
  recommendations: string[]
  chatFlags: ChatFlags
  loadingKeys: Set<string>
  projects: Project[]
}

type Action =
  | { type: 'SET_TAB'; tab: TabName }
  | { type: 'SET_SESSION_STATE'; state: SessionState }
  | { type: 'SET_SELECTED_VERSION'; version: number | null }
  | { type: 'SET_RECOMMENDATIONS'; recs: string[] }
  | { type: 'SET_CHAT_FLAGS'; flags: ChatFlags }
  | { type: 'SET_LOADING'; key: string; loading: boolean }
  | { type: 'ADD_PROJECT'; project: Project }
  | { type: 'RESET'; sessionId: string }

function generateId(): string {
  return crypto.randomUUID()
}

const defaultFlags: ChatFlags = {
  can_generate_image: false,
  can_iterate_image: false,
  can_lock: false,
  can_generate_cad: false,
}

function createInitialState(): AppState {
  return {
    activeTab: 'Baseline',
    sessionId: generateId(),
    sessionState: null,
    selectedVersion: null,
    recommendations: [],
    chatFlags: defaultFlags,
    loadingKeys: new Set(),
    projects: [],
  }
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.tab }
    case 'SET_SESSION_STATE':
      return { ...state, sessionState: action.state }
    case 'SET_SELECTED_VERSION':
      return { ...state, selectedVersion: action.version }
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.recs }
    case 'SET_CHAT_FLAGS':
      return { ...state, chatFlags: action.flags }
    case 'SET_LOADING': {
      const next = new Set(state.loadingKeys)
      if (action.loading) next.add(action.key)
      else next.delete(action.key)
      return { ...state, loadingKeys: next }
    }
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.project] }
    case 'RESET':
      return {
        ...createInitialState(),
        sessionId: action.sessionId,
        projects: state.projects,
        activeTab: 'Baseline',
      }
    default:
      return state
  }
}

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<Action>
  refreshSession: () => Promise<void>
  refreshRecommendations: () => Promise<void>
  isLoading: (key: string) => boolean
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState)

  const refreshSession = useCallback(async () => {
    try {
      const res = await api.getSession(state.sessionId)
      dispatch({ type: 'SET_SESSION_STATE', state: res.state })
    } catch (e) {
      console.error('Failed to refresh session:', e)
    }
  }, [state.sessionId])

  const refreshRecommendations = useCallback(async () => {
    try {
      const res = await api.getRecommendations(state.sessionId)
      dispatch({ type: 'SET_RECOMMENDATIONS', recs: res.recommendations })
    } catch {
      // recommendations are non-critical
    }
  }, [state.sessionId])

  const isLoading = useCallback(
    (key: string) => state.loadingKeys.has(key),
    [state.loadingKeys],
  )

  return (
    <AppContext.Provider value={{ state, dispatch, refreshSession, refreshRecommendations, isLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
