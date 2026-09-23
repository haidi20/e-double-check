import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { customersState } from '@/features/master-data/customers/vm/customersState'

export const useCustomersVm = defineStore('customersVm', () => {
  const view = reactive({ ...customersState.view })

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
    ...customersState,
    view,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})
