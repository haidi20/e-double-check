import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { servicesState } from '@/features/master-data/services/state/servicesState'
import type { ServiceFormField } from '@/features/master-data/services/type/servicesTypes'

export const useServicesVm = defineStore('servicesVm', () => {
  const view = reactive({
    ...servicesState.view,
    services: [...servicesState.view.services],
    formFields: servicesState.view.formFields.map((field) => ({ ...field }))
  })
  const searchQuery = ref('')

  const serviceRows = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()

    if (!query) {
      return view.services
    }

    return view.services.filter((row) =>
      row.name.toLowerCase().includes(query) ||
      row.code.toLowerCase().includes(query) ||
      row.description.toLowerCase().includes(query)
    )
  })

  const openCreateModal = () => {
    view.editingServiceId = null
    view.formFields.forEach((field) => {
      field.value = field.id === 'status' ? 'Aktif' : ''
    })
    view.isFormSubmitted = false
    view.formError = ''
    view.isFormModalOpen = true
  }

  const openEditModal = (serviceId: string) => {
    const service = view.services.find((row) => row.id === serviceId)

    if (!service) {
      return
    }

    view.editingServiceId = service.id
    view.formFields.forEach((field) => {
      if (field.id === 'code') {
        field.value = service.code
      } else if (field.id === 'name') {
        field.value = service.name
      } else if (field.id === 'description') {
        field.value = service.description
      } else if (field.id === 'status') {
        field.value = service.status
      }
    })
    view.isFormSubmitted = false
    view.formError = ''
    view.isFormModalOpen = true
  }

  const closeFormModal = () => {
    view.isFormModalOpen = false
  }

  const saveFormModal = () => {
    const code = view.formFields.find((field) => field.id === 'code')?.value.trim().toUpperCase() ?? ''
    const name = view.formFields.find((field) => field.id === 'name')?.value.trim() ?? ''
    const description = view.formFields.find((field) => field.id === 'description')?.value.trim() ?? ''
    const status = view.formFields.find((field) => field.id === 'status')?.value ?? 'Aktif'

    if (!code || !name) {
      view.isFormSubmitted = false
      view.formError = 'Kode dan nama layanan wajib diisi.'
      return
    }

    const isDuplicateCode = view.services.some(
      (row) => row.code === code && row.id !== view.editingServiceId
    )

    if (isDuplicateCode) {
      view.isFormSubmitted = false
      view.formError = 'Kode layanan sudah digunakan.'
      return
    }

    if (view.editingServiceId) {
      const service = view.services.find((row) => row.id === view.editingServiceId)

      if (service) {
        service.code = code
        service.name = name
        service.description = description
        service.status = status
      }
    } else {
      view.services.push({
        id: 'service-' + Date.now(),
        code,
        name,
        description,
        status
      })
    }

    view.isFormSubmitted = true
    view.formError = ''
    view.isFormModalOpen = false
  }

  const deleteService = (serviceId: string) => {
    const index = view.services.findIndex((row) => row.id === serviceId)

    if (index >= 0) {
      view.services.splice(index, 1)
    }
  }

  return {
    view,
    searchQuery,
    serviceRows,
    openCreateModal,
    openEditModal,
    closeFormModal,
    saveFormModal,
    deleteService
  }
})