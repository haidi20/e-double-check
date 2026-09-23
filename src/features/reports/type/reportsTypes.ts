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

export interface ReportTab {
  id: string
  label: string
  description: string
  rows: DataRow[]
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

export type ReportFormFieldType = 'text' | 'select' | 'textarea'

export interface ReportFormField {
  id: string
  label: string
  type: ReportFormFieldType
  value: string
  readonly?: boolean
  rows?: number
  wide?: boolean
  options?: string[]
}

export interface ReportsView extends FeatureContent {
  mode: 'operations'
  headingTitle: string
  primaryActionLabel: string
  dummyData: DummyDataItem[]
  operationMetrics: MetricItem[]
  searchPlaceholder: string
  activeTabId: string
  tabs: ReportTab[]
  operationRows: DataRow[]
  formTitle: string
  formSubtitle: string
  formSubmitLabel: string
  formSuccessMessage: string
  isFormModalOpen: boolean
  isFormSubmitted: boolean
  formFields: ReportFormField[]
}

export interface ReportsState extends FeatureContent {
  dummyData: DummyDataItem[]
  view: ReportsView
}
