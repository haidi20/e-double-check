export type HistoryStatus = 'running' | 'completed'
export type HistoryFilter = 'all' | HistoryStatus

export interface HistoryFilterItem {
  id: HistoryFilter
  label: string
}

export interface HistoryItem {
  id: string
  dateLabel: string
  shiftLabel: string
  outletName: string
  completedCount: number
  totalCount: number
  status: HistoryStatus
  statusLabel: string
}

export interface HistoryView {
  eyebrow: string
  title: string
  description: string
  activeFilter: HistoryFilter
  filters: HistoryFilterItem[]
  emptyTitle: string
  emptyDescription: string
}

export interface HistoryState {
  view: HistoryView
  items: HistoryItem[]
}
