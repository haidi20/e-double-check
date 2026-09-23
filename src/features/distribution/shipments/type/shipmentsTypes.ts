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

export interface DummyDataItem {
  id: number
  code: string
  name: string
  category: string
  owner: string
  status: string
  description: string
}

export interface ShipmentRow {
  code: string
  invoiceSummary: string
  customerSummary: string
  driverLabel: string
  vehicleLabel: string
  status: string
  loadSummary: string
}

export interface ShipmentInvoiceOption {
  invoiceNumber: string
  customerName: string
  itemSummary: string
  totalQty: string
  status: string
  selected: boolean
}

export interface ShipmentOption {
  id: string
  label: string
  description: string
}

export interface ShipmentDetail {
  code: string
  status: string
  selectedInvoiceSummary: string
  driverLabel: string
  vehicleLabel: string
  note: string
}

export interface ShipmentsView extends FeatureContent {
  mode: 'operations'
  headingTitle: string
  primaryActionLabel: string
  dummyData: DummyDataItem[]
  operationMetrics: MetricItem[]
  searchPlaceholder: string
  shipmentRows: ShipmentRow[]
  invoiceOptions: ShipmentInvoiceOption[]
  driverOptions: ShipmentOption[]
  vehicleOptions: ShipmentOption[]
  selectedShipment: ShipmentDetail
  formTitle: string
  formSubtitle: string
  formSubmitLabel: string
  formSuccessMessage: string
  isFormModalOpen: boolean
  isFormSubmitted: boolean
}

export interface ShipmentsState extends FeatureContent {
  dummyData: DummyDataItem[]
  view: ShipmentsView
}
