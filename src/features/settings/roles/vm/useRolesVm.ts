import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { rolesState } from '@/features/settings/roles/vm/rolesState'

export const useRolesVm = defineStore('rolesVm', () => {
  const view = reactive({ ...rolesState.view })
  registerStateHmr(view, 'rolesState')

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
    ...rolesState,
    view,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})


