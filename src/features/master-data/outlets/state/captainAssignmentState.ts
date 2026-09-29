export interface CaptainAssignmentState {
  isOpen: boolean
  outletId: string | null
  selectedEmployeeId: string
  search: string
  formError: string
}

export const captainAssignmentState: CaptainAssignmentState = {
  isOpen: false,
  outletId: null,
  selectedEmployeeId: '',
  search: '',
  formError: ''
}
