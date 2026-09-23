import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { shipmentsState } from '@/features/distribution/shipments/vm/shipmentsState'

export const useShipmentsVm = defineStore('shipmentsVm', () => {
  const view = reactive({ ...shipmentsState.view })

  const openFormModal = () => {
    view.isFormModalOpen = true
    view.isFormSubmitted = false
  }

  const closeFormModal = () => {
    view.isFormModalOpen = false
    view.isFormSubmitted = false
  }

  const updateShipmentField = (fieldId: 'driverLabel' | 'vehicleLabel' | 'note', event: Event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null

    if (!target) {
      return
    }

    view.selectedShipment[fieldId] = target.value
  }

  const toggleInvoiceSelection = (invoiceNumber: string) => {
    const invoice = view.invoiceOptions.find((item) => item.invoiceNumber === invoiceNumber)

    if (!invoice) {
      return
    }

    invoice.selected = !invoice.selected
    const selectedCount = view.invoiceOptions.filter((item) => item.selected).length
    view.selectedShipment.selectedInvoiceSummary = `${selectedCount} faktur dipilih`
  }

  const saveFormModal = () => {
    view.isFormSubmitted = true
  }

  return {
    ...shipmentsState,
    view,
    openFormModal,
    closeFormModal,
    updateShipmentField,
    toggleInvoiceSelection,
    saveFormModal
  }
})
