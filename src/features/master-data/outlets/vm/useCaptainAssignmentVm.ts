import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { captainAssignmentState } from '@/features/master-data/outlets/state/captainAssignmentState'
import { useOutletsVm } from '@/features/master-data/outlets/vm/useOutletsVm'
import { useEmployeesVm } from '@/features/master-data/employess/vm/useEmployeesVm'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'

const today = () => new Date().toISOString().slice(0, 10)

export interface CaptainAssignmentRow {
  id: string
  employeeName: string
  assignedAt: string
  releasedAt: string
  isActive: boolean
}

export const useCaptainAssignmentVm = defineStore('captainAssignmentVm', () => {
  const view = reactive({ ...captainAssignmentState })
  const outletsVm = useOutletsVm()
  const employeesVm = useEmployeesVm()
  const authVm = useAuthVm()

  const outlet = computed(() =>
    outletsVm.view.outlets.find((item) => item.id === view.outletId) ?? null
  )

  const assignmentsForOutlet = computed(() =>
    outletsVm.view.captainAssignments
      .filter((item) => item.outletId === view.outletId)
      .slice()
      .sort((a, b) => b.assignedAt.localeCompare(a.assignedAt))
  )

  const activeCaptain = computed(
    () => assignmentsForOutlet.value.find((item) => !item.releasedAt) ?? null
  )

  const eligibleEmployees = computed(() =>
    employeesVm.view.employeeRows
      .filter((item) => item.status === 'Aktif')
      .map((item) => ({ value: item.id, label: item.name, detail: item.role }))
  )

  const filteredHistory = computed<CaptainAssignmentRow[]>(() => {
    const query = view.search.trim().toLowerCase()

    return assignmentsForOutlet.value
      .filter((item) =>
        !query ||
        item.employeeName.toLowerCase().includes(query) ||
        item.assignedAt.includes(query)
      )
      .map((item) => ({
        id: item.id,
        employeeName: item.employeeName,
        assignedAt: item.assignedAt,
        releasedAt: item.releasedAt ?? '-',
        isActive: !item.releasedAt
      }))
  })

  const ensureAdmin = () => {
    if (authVm.selectedRole !== 'employee') {
      return true
    }

    view.formError = 'Hanya admin yang dapat mengubah data master.'
    return false
  }

  const open = (outletId: string) => {
    view.outletId = outletId
    view.selectedEmployeeId = ''
    view.search = ''
    view.formError = ''
    view.isOpen = true
  }

  const close = () => {
    view.isOpen = false
    view.outletId = null
    view.formError = ''
  }

  const assign = () => {
    if (!ensureAdmin()) {
      return false
    }

    if (!view.outletId) {
      return false
    }

    const employee = employeesVm.view.employeeRows.find(
      (item) => item.id === view.selectedEmployeeId
    )

    if (!employee) {
      view.formError = 'Pilih pegawai kapten terlebih dahulu.'
      return false
    }

    const previous = outletsVm.view.captainAssignments.find(
      (item) => item.outletId === view.outletId && !item.releasedAt
    )

    if (previous) {
      previous.releasedAt = today()
    }

    outletsVm.view.captainAssignments.push({
      id: `cap-${Date.now()}`,
      outletId: view.outletId,
      employeeId: employee.id,
      employeeName: employee.name,
      assignedAt: today()
    })

    view.selectedEmployeeId = ''
    view.formError = ''
    return true
  }

  const release = (assignmentId: string) => {
    if (!ensureAdmin()) {
      return false
    }

    const assignment = outletsVm.view.captainAssignments.find(
      (item) => item.id === assignmentId
    )

    if (!assignment || assignment.releasedAt) {
      return false
    }

    assignment.releasedAt = today()
    return true
  }

  return {
    view,
    outlet,
    activeCaptain,
    eligibleEmployees,
    filteredHistory,
    open,
    close,
    assign,
    release
  }
})
