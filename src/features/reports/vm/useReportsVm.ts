import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { reportsState } from '@/features/reports/vm/reportsState'

export const useReportsVm = defineStore('reportsVm', () => {
  const view = reactive({ ...reportsState.view })
  registerStateHmr(view, 'reportsState')

  const activeTab = computed(() => {
    return view.tabs.find((tab) => tab.id === view.activeTabId) ?? view.tabs[0]
  })

  const activeRows = computed(() => activeTab.value?.rows ?? [])

  const setActiveTab = (tabId: string) => {
    view.activeTabId = tabId
  }

  const openFormModal = () => {
    view.isFormModalOpen = true
    view.isFormSubmitted = false
  }

  const closeFormModal = () => {
    view.isFormModalOpen = false
    view.isFormSubmitted = false
  }

  const updateFormField = (fieldId: string, event: Event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
    const field = view.formFields.find((item) => item.id === fieldId)

    if (!target || !field || field.readonly) {
      return
    }

    field.value = target.value
  }

  const saveFormModal = () => {
    view.isFormSubmitted = true
  }

  return {
    ...reportsState,
    view,
    activeTab,
    activeRows,
    setActiveTab,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})


