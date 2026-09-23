import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { matrixKpiState } from '@/features/matrix-kpi/vm/matrixKpiState'
import type { InvoiceTimingTab } from '@/features/matrix-kpi/type/matrixKpiTypes'

export const useMatrixKpiVm = defineStore('matrixKpiVm', () => {
  const view = reactive({ ...matrixKpiState.view })
  registerStateHmr(view, 'matrixKpiState')

  const slaTotalHours = computed(() => view.slaDays * view.slaHours)
  const slaLabel = computed(() => `${view.slaDays}x${view.slaHours} jam (${slaTotalHours.value} jam)`)

  const activeInvoiceTab = computed(() => {
    return view.invoiceTabs.find((tab) => tab.id === view.activeInvoiceTabId) ?? view.invoiceTabs[0]
  })

  const activeInvoiceRows = computed(() => activeInvoiceTab.value?.rows ?? [])

  const setActiveInvoiceTab = (tabId: InvoiceTimingTab['id']) => {
    view.activeInvoiceTabId = tabId
  }

  const openFormModal = () => {
    view.isFormModalOpen = true
    view.isFormSubmitted = false
  }

  const closeFormModal = () => {
    view.isFormModalOpen = false
    view.isFormSubmitted = false
  }

  const saveFormModal = () => {
    view.isFormSubmitted = true
  }

  const updateSlaDays = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    const value = Number(target?.value ?? view.slaDays)
    view.slaDays = Number.isFinite(value) && value > 0 ? value : 1
  }

  const updateSlaHours = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    const value = Number(target?.value ?? view.slaHours)
    view.slaHours = Number.isFinite(value) && value > 0 ? value : 1
  }

  return {
    ...matrixKpiState,
    view,
    slaTotalHours,
    slaLabel,
    activeInvoiceTab,
    activeInvoiceRows,
    setActiveInvoiceTab,
    openFormModal,
    closeFormModal,
    saveFormModal,
    updateSlaDays,
    updateSlaHours
  }
})


