import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { outletsState } from '@/features/master-data/outlets/state/outletsState'
import type { OutletFormField } from '@/features/master-data/outlets/type/outletsTypes'

const statusOptions = ['Aktif', 'Perlu ditinjau', 'Tidak aktif']

export const useOutletsVm = defineStore('outletsVm', () => {
  const view = reactive({
    ...outletsState.view,
    outlets: [...outletsState.view.outlets],
    formFields: outletsState.view.formFields.map((field) => ({ ...field }))
  })
  const searchQuery = ref('')

  const outletRows = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()

    if (!query) {
      return view.outlets
    }

    return view.outlets.filter((row) =>
      row.name.toLowerCase().includes(query) ||
      row.owner.toLowerCase().includes(query)
    )
  })

  const updateFormField = (fieldId: OutletFormField['id'], event: Event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null
    const field = view.formFields.find((item) => item.id === fieldId)

    if (!target || !field) {
      return
    }

    field.value = target.value
  }

  const openCreateModal = () => {
    view.editingOutletId = null
    view.formFields.forEach((field) => {
      field.value = field.id === 'status' ? 'Aktif' : ''
    })
    view.isFormSubmitted = false
    view.formError = ''
    view.isFormModalOpen = true
  }

  const openEditModal = (outletId: string) => {
    const outlet = view.outlets.find((row) => row.id === outletId)

    if (!outlet) {
      return
    }

    view.editingOutletId = outlet.id
    view.formFields.forEach((field) => {
      field.value = field.id === 'name' ? outlet.name : field.id === 'owner' ? outlet.owner : outlet.status
    })
    view.isFormSubmitted = false
    view.formError = ''
    view.isFormModalOpen = true
  }

  const closeFormModal = () => {
    view.isFormModalOpen = false
  }

  const saveFormModal = () => {
    const name = view.formFields.find((field) => field.id === 'name')?.value.trim() ?? ''
    const owner = view.formFields.find((field) => field.id === 'owner')?.value.trim() ?? ''
    const status = view.formFields.find((field) => field.id === 'status')?.value ?? 'Aktif'

    if (!name || !owner) {
      view.isFormSubmitted = false
      view.formError = 'Nama warung dan penanggung jawab wajib diisi.'
      return
    }

    if (view.editingOutletId) {
      const outlet = view.outlets.find((row) => row.id === view.editingOutletId)

      if (outlet) {
        outlet.name = name
        outlet.owner = owner
        outlet.status = status
      }
    } else {
      const nextNumber = view.outlets.reduce((max, row) => {
        const parsed = Number(row.code.replace('WRG-', ''))

        return Number.isFinite(parsed) && parsed > max ? parsed : max
      }, 0) + 1

      view.outlets.push({
        id: "outlet-" + Date.now(),
        code: "WRG-" + String(nextNumber).padStart(3, "0"),
        name,
        owner,
        status
      })
    }

    view.isFormSubmitted = true
    view.formError = ''
    view.isFormModalOpen = false
  }

  const deleteOutlet = (outletId: string) => {
    const index = view.outlets.findIndex((row) => row.id === outletId)

    if (index >= 0) {
      view.outlets.splice(index, 1)
    }
  }

  return {
    view,
    searchQuery,
    outletRows,
    updateFormField,
    openCreateModal,
    openEditModal,
    closeFormModal,
    saveFormModal,
    deleteOutlet
  }
})
