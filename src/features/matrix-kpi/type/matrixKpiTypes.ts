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

export interface KpiMetric {
  label: string
  value: string
  trend: string
  icon: string
  progress: number
  progressWidth: string
}

export interface KpiRow {
  code: string
  name: string
  target: string
  realization: string
  status: string
}

export interface InvoiceTimingRow {
  invoiceNo: string
  outletName: string
  issuedAt: string
  deliveredAt: string
  duration: string
  status: string
}

export interface InvoiceTimingTab {
  id: 'before' | 'after'
  label: string
  description: string
  rows: InvoiceTimingRow[]
}

export interface MatrixKpiView extends FeatureContent {
  mode: 'kpi'
  headingTitle: string
  primaryActionLabel: string
  slaDays: number
  slaHours: number
  activeInvoiceTabId: InvoiceTimingTab['id']
  metrics: KpiMetric[]
  rows: KpiRow[]
  invoiceTabs: InvoiceTimingTab[]
  tableEyebrow: string
  tableTitle: string
  tableStatus: string
  formTitle: string
  formSubtitle: string
  formSubmitLabel: string
  formSuccessMessage: string
  isFormModalOpen: boolean
  isFormSubmitted: boolean
}

export interface MatrixKpiState extends FeatureContent {
  view: MatrixKpiView
}
