export type ShortcutScope = 'global' | 'navigation' | 'page'

export interface ShortcutCommand {
  id: string
  label: string
  description: string
  scope: ShortcutScope
  pageContext?: string
  routePath?: string
  defaultBinding: string
  handler: string
  category: string
}

export interface ShortcutBinding {
  commandId: string
  binding: string | null
  isCustom: boolean
}

export interface StoredBindings {
  version: number
  overrides: Record<string, string | null>
}

export interface ShortcutSettingsState {
  isRecording: boolean
  recordingCommandId: string | null
  lastConflict: string | null
  searchQuery: string
  activeCategoryFilter: string
  pendingPageAction: string | null
}

export interface CheatSheetState {
  searchQuery: string
  activeId: string | null
}
