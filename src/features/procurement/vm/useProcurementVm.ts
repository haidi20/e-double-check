import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { procurementState } from '@/features/procurement/vm/procurementState'

export const useProcurementVm = defineStore('procurementVm', () => {
  const view = reactive({ ...procurementState.view })
  registerStateHmr(view, 'procurementState')

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
    ...procurementState,
    view,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})


