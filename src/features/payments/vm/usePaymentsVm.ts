import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { paymentsState } from '@/features/payments/vm/paymentsState'

export const usePaymentsVm = defineStore('paymentsVm', () => {
  const view = reactive({ ...paymentsState.view })

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
    ...paymentsState,
    view,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})
