import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { UsersTabId } from '@/features/settings/users/type/usersTypes'
import { usersState } from '@/features/settings/users/vm/usersState'

export const useUsersVm = defineStore('usersVm', () => {
  const view = reactive({ ...usersState.view })
  registerStateHmr(view, 'usersState')

  const openFormModal = () => {
    view.isFormModalOpen = true
    view.isFormSubmitted = false
  }

  const setActiveTab = (tabId: UsersTabId) => {
    view.activeTabId = tabId
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
    ...usersState,
    view,
    setActiveTab,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})


