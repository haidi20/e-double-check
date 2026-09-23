export interface FeatureAction {
  title: string
  description: string
}

export interface FeatureContent {
  title: string
  subtitle: string
  description: string
  usage: string
  status: string
  actions: FeatureAction[]
}

export interface MetricItem {
  label: string
  value: string
  trend: string
  icon: string
  progress: number
  progressWidth: string
}

export interface ChartBar {
  id: string
  height: string
}

export interface DataRow {
  code: string
  primary: string
  secondary: string
  owner: string
  status: string
  amount: string
}

export interface GoodsRow {
  code: string
  name: string
  category: string
  unit: string
  stock: string
  status: string
}

export interface EmployeeRow {
  initials: string
  name: string
  role: string
  department: string
  score: string
  status: string
}

export interface AccessRow {
  initials: string
  name: string
  role: string
  area: string
  status: string
}

export type UsersTabId = 'users' | 'roles' | 'sessions'

export interface UsersTab {
  id: UsersTabId
  label: string
}

export interface RoleCard {
  name: string
  users: string
  scope: string
}

export interface PermissionRow {
  feature: string
  view: string
  create: string
  update: string
  remove: string
  removeClass: string
}

export interface SessionRow {
  initials: string
  name: string
  device: string
  location: string
  status: string
}

export interface TrackingStep {
  title: string
  detail: string
  state: 'done' | 'active' | 'next'
  className: string
}

export interface SummaryCard {
  label?: string
  value?: string
  title?: string
  description: string
  icon?: string
}

export interface MasterRow {
  code: string
  name: string
  description: string
  owner: string
  status: string
}

export interface DummyDataItem {
  id: number
  code: string
  name: string
  category: string
  owner: string
  status: string
  description: string
}

export type UserFormFieldType = 'text' | 'select' | 'textarea'

export interface UserFormField {
  id: string
  label: string
  type: UserFormFieldType
  value: string
  readonly?: boolean
  rows?: number
  wide?: boolean
  options?: string[]
}

export interface UsersView extends FeatureContent {
  mode: 'access'
  headingTitle: string
  primaryActionLabel: string
  activeTabId: UsersTabId
  tabs: UsersTab[]
  dummyData: DummyDataItem[]
  accessRows: AccessRow[]
  roleCards: RoleCard[]
  permissionRows: PermissionRow[]
  sessionRows: SessionRow[]
  formTitle: string
  formSubtitle: string
  formSubmitLabel: string
  formSuccessMessage: string
  isFormModalOpen: boolean
  isFormSubmitted: boolean
  formFields: UserFormField[]
  accountEnabledLabel: string
  accountEnabledValue: string
}

export interface UsersState extends FeatureContent {
  dummyData: DummyDataItem[]
  view: UsersView
}
