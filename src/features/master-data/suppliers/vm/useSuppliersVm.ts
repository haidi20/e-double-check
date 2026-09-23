import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { suppliersState } from '@/features/master-data/suppliers/vm/suppliersState'

export const useSuppliersVm = defineStore('suppliersVm', () => {
  const view = reactive({ ...suppliersState.view })
  registerStateHmr(view, 'suppliersState')

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
    ...suppliersState,
    view,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})


