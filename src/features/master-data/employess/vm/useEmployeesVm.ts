import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { employeesState } from '@/features/master-data/employess/vm/employeesState'

export const useEmployeesVm = defineStore('employeesVm', () => {
  const view = reactive({ ...employeesState.view })
  registerStateHmr(view, 'employeesState')
  const searchQuery = ref('')
  const selectedDepartment = ref('all')

  const employeeRows = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()

    return view.employeeRows.filter((row) => {
      const matchesQuery = !query ||
        row.name.toLowerCase().includes(query) ||
        row.role.toLowerCase().includes(query)
      const matchesDepartment = selectedDepartment.value === 'all' ||
        row.department === selectedDepartment.value

      return matchesQuery && matchesDepartment
    })
  })

  const setSearchQuery = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    searchQuery.value = target?.value ?? ''
  }

  const setSelectedDepartment = (event: Event) => {
    const target = event.target as HTMLSelectElement | null
    selectedDepartment.value = target?.value ?? 'all'
  }

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
    ...employeesState,
    view,
    searchQuery,
    selectedDepartment,
    employeeRows,
    setSearchQuery,
    setSelectedDepartment,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})


