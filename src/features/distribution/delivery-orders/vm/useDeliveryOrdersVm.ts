import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { deliveryOrdersState } from '@/features/distribution/delivery-orders/vm/deliveryOrdersState'

export const useDeliveryOrdersVm = defineStore('deliveryOrdersVm', () => {
  const view = reactive({ ...deliveryOrdersState.view })
  registerStateHmr(view, 'deliveryOrdersState')

  const filteredVehicleOptions = computed(() => {
    const keyword = view.vehicleSearch.trim().toLowerCase()

    if (!keyword) {
      return view.vehicleOptions
    }

    return view.vehicleOptions.filter((vehicle) =>
      `${vehicle.label} ${vehicle.detail}`.toLowerCase().includes(keyword)
    )
  })

  const selectedVehicle = computed(
    () => view.vehicleOptions.find((vehicle) => vehicle.id === view.selectedVehicleId) ?? view.vehicleOptions[0]
  )

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

  const updateVehicleSearch = (event: Event) => {
    const target = event.target as HTMLInputElement | null

    if (!target) {
      return
    }

    view.vehicleSearch = target.value
  }

  const selectVehicle = (vehicleId: string) => {
    const vehicle = view.vehicleOptions.find((item) => item.id === vehicleId)

    if (!vehicle) {
      return
    }

    view.selectedVehicleId = vehicle.id
    view.vehicleSearch = vehicle.label
  }

  return {
    ...deliveryOrdersState,
    view,
    filteredVehicleOptions,
    selectedVehicle,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal,
    updateVehicleSearch,
    selectVehicle
  }
})


