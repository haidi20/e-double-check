import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { routesState } from '@/features/distribution/routes/vm/routesState'

export const useRoutesVm = defineStore('routesVm', () => {
  const view = reactive({ ...routesState.view })

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
    ...routesState,
    view,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})
