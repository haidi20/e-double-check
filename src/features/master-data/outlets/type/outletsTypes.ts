export interface OutletRow {
  id: string
  code: string
  name: string
  owner: string
  status: string
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
