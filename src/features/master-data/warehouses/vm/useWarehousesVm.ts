import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { warehousesState } from '@/features/master-data/warehouses/vm/warehousesState'

export const useWarehousesVm = defineStore('warehousesVm', () => {
  const view = reactive({ ...warehousesState.view })
  registerStateHmr(view, 'warehousesState')

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
    ...warehousesState,
    view,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})


