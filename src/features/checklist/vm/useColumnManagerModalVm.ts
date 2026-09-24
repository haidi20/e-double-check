import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { columnManagerModalState } from '@/features/checklist/state/columnManagerModalState'
import { useColumnFormVm } from '@/features/checklist/vm/useColumnFormVm'
import type { ColumnManagerModalTab } from '@/features/checklist/type/checklistTypes'

export const useColumnManagerModalVm = defineStore('columnManagerModalVm', () => {
  const view = reactive({ ...columnManagerModalState })
  const formVm = useColumnFormVm()

  const category = computed(() => formVm.category)
  const columns = computed(() => formVm.category?.columns ?? [])
  const error = computed(() => formVm.error)

  const open = (categoryId: string, activeTab: ColumnManagerModalTab = 'form') => {
    formVm.open(categoryId)
    view.isOpen = true
    view.activeTab = activeTab
  }

  const openEdit = (categoryId: string, columnId: string) => {
    formVm.open(categoryId, columnId)
    view.isOpen = true
    view.activeTab = 'form'
  }

  const setTab = (activeTab: ColumnManagerModalTab) => {
    view.activeTab = activeTab
  }

  const close = () => {
    view.isOpen = false
    formVm.close()
  }

  const submit = () => {
    if (formVm.submit()) {
      setTab('columns')
    }
  }

  return {
    view,
    formVm,
    category,
    columns,
    error,
    open,
    openEdit,
    setTab,
    close,
    submit
  }
})
