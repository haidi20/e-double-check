export interface ServiceRow {
  id: string
  code: string
  name: string
  description: string
  status: string
}

export type ServiceFormFieldType = 'text' | 'textarea' | 'select'

export interface ServiceFormField {
  id: 'code' | 'name' | 'description' | 'status'
  label: string
  type: ServiceFormFieldType
  value: string
  options?: string[]
}

export interface ServicesView {
  title: string
  subtitle: string
  description: string
  headingTitle: string
  primaryActionLabel: string
  searchPlaceholder: string
  services: ServiceRow[]
  formTitle: string
  formSubtitle: string
  formSubmitLabel: string
  formSuccessMessage: string
  formError: string
  isFormModalOpen: boolean
  isFormSubmitted: boolean
  editingServiceId: string | null
  formFields: ServiceFormField[]
}

export interface ServicesState {
  view: ServicesView
}