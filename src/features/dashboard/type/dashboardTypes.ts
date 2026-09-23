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

export interface DashboardTrendItem {
  id: string
  label: string
  value: number
}

export interface DashboardChartPoint extends DashboardTrendItem {
  x: number
  y: number
  xPercent: string
  yPercent: string
}

export interface DashboardLineChart {
  viewBox: string
  gridPath: string
  linePath: string
  areaPath: string
  labelColumns: string
  points: DashboardChartPoint[]
}

export interface DashboardDeliveryOrderItem {
  id: string
  code: string
  customer: string
  detail: string
  status: string
  icon: string
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

export type DashboardFormFieldType = 'text' | 'select' | 'textarea'

export interface DashboardFormField {
  id: string
  label: string
  type: DashboardFormFieldType
  value: string
  readonly?: boolean
  rows?: number
  wide?: boolean
  options?: string[]
}

export interface DashboardView extends FeatureContent {
  mode: 'dashboard'
  headingTitle: string
  primaryActionLabel: string
  chartEyebrow: string
  chartTitle: string
  chartStatus: string
  deliveryOrderEyebrow: string
  deliveryOrderTitle: string
  dummyData: DummyDataItem[]
  dashboardMetrics: MetricItem[]
  trendItems: DashboardTrendItem[]
  dashboardOrders: DataRow[]
  formTitle: string
  formSubtitle: string
  formSubmitLabel: string
  formSuccessMessage: string
  isFormModalOpen: boolean
  isFormSubmitted: boolean
  formFields: DashboardFormField[]
}

export interface DashboardState extends FeatureContent {
  dummyData: DummyDataItem[]
  view: DashboardView
}
