import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { historyState } from '@/features/history/state/historyState'
import type { HistoryFilter, HistoryItem } from '@/features/history/type/historyTypes'

export const useHistoryVm = defineStore('historyVm', () => {
  const view = reactive({ ...historyState.view })
  const items = reactive(historyState.items.map((item) => ({ ...item })))

  const filteredItems = computed<HistoryItem[]>(() => {
    if (view.activeFilter === 'all') {
      return items
    }

    return items.filter((item) => item.status === view.activeFilter)
  })

  const summary = computed(() => ({
    total: items.length,
    completed: items.filter((item) => item.status === 'completed').length,
    running: items.filter((item) => item.status === 'running').length
  }))

  const hasItems = computed(() => filteredItems.value.length > 0)

  const setFilter = (filter: HistoryFilter) => {
    view.activeFilter = filter
  }

  const progressWidth = (item: HistoryItem) =>
    `${Math.round((item.completedCount / item.totalCount) * 100)}%`

  const progressLabel = (item: HistoryItem) =>
    `${item.completedCount}/${item.totalCount} item`

  return {
    view,
    filteredItems,
    summary,
    hasItems,
    setFilter,
    progressWidth,
    progressLabel
  }
})
