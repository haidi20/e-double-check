import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { VehicleFormDraft } from '@/features/master-data/vehicles/type/vehiclesTypes'
import { vehiclesState } from '@/features/master-data/vehicles/vm/vehiclesState'

export const useVehiclesVm = defineStore('vehiclesVm', () => {
  const view = reactive({ ...vehiclesState.view })
  registerStateHmr(view, 'vehiclesState')

  const openFormModal = () => {
    view.isFormModalOpen = true
    view.isFormSubmitted = false
  }

  const closeFormModal = () => {
    view.isFormModalOpen = false
    view.isFormSubmitted = false
  }

  const updateFormDraft = (fieldId: keyof VehicleFormDraft, event: Event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | null

    if (!target) {
      return
    }

    view.formDraft[fieldId] = target.value
  }

  const saveFormModal = () => {
    view.isFormSubmitted = true
  }

  return {
    ...vehiclesState,
    view,
    openFormModal,
    closeFormModal,
    updateFormDraft,
    saveFormModal
  }
})


