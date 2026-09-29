export interface OutletRow {
  id: string
  code: string
  name: string
  owner: string
  status: string
}

export interface CaptainAssignment {
  id: string
  outletId: string
  employeeId: string
  employeeName: string
  assignedAt: string
  releasedAt?: string
}

export type OutletFormFieldType = 'text' | 'select'

export interface OutletFormField {
  id: 'name' | 'owner' | 'status'
  label: string
  type: OutletFormFieldType
  value: string
  options?: string[]
}

export interface OutletsView {
  title: string
  subtitle: string
  description: string
  headingTitle: string
  primaryActionLabel: string
  searchPlaceholder: string
  outlets: OutletRow[]
  captainAssignments: CaptainAssignment[]
  formTitle: string
  formSubtitle: string
  formSubmitLabel: string
  formSuccessMessage: string
  formError: string
  isFormModalOpen: boolean
  isFormSubmitted: boolean
  editingOutletId: string | null
  formFields: OutletFormField[]
}

export interface OutletsState {
  view: OutletsView
}
