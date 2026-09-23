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

export interface OrderProductItem {
  code: string
  name: string
  unit: string
  qty: number
  price: string
  amount: string
}

export interface OrderEmployeeItem {
  name: string
  role: string
}

export interface OrderImportRow {
  orderNumber: string
  invoiceNumber: string
  customerName: string
  printDate: string
  salesman: string
  itemSummary: string
  totalQty: string
  totalAmount: string
  status: string
}

export interface ImportedOrderInvoice {
  orderNumber: string
  invoiceNumber: string
  supplierName: string
  customerName: string
  customerAddress: string
  invoiceDate: string
  dueDate: string
  salesman: string
  sourceFileName: string
  sourceFileUrl: string
  sourceFileType: string
  subtotal: string
  tax: string
  totalAmount: string
  status: string
  products: OrderProductItem[]
  employees: OrderEmployeeItem[]
}

export interface InvoiceReviewSummary {
  amountInWords: string
  discount: string
  receiverLabel: string
  senderLabel: string
  paymentTitle: string
  paymentBankRows: string[]
}

export interface OrderReturnPolicy {
  title: string
  description: string
}

export interface OrderReturnForm {
  invoiceNumber: string
  note: string
  items: OrderReturnItem[]
}

export interface OrderReturnItem {
  id: string
  code: string
  name: string
  unit: string
  invoiceQty: number
  returnQty: string
  checked: boolean
}

export interface OrderFormCustomerOption {
  code: string
  name: string
  address: string
}

export interface OrderFormProductOption {
  code: string
  name: string
  unit: string
}

export interface OrderManualItem {
  id: string
  productCode: string
  qty: string
}

export interface OrderManualForm {
  invoiceNumber: string
  customerCode: string
  items: OrderManualItem[]
}

export interface OrdersView extends FeatureContent {
  mode: 'operations'
  headingTitle: string
  primaryActionLabel: string
  reviewTitle: string
  isImportModalOpen: boolean
  isImportReviewOpen: boolean
  isImportSubmitted: boolean
  importFileLabel: string
  importFileHint: string
  importEyebrow: string
  importUploadTitle: string
  importUploadDescription: string
  importReviewDescription: string
  importDropzoneBadge: string
  importDropzoneTitle: string
  importSelectLabel: string
  importChangeLabel: string
  importActiveFileLabel: string
  importSelectedFilePrefix: string
  importProcessLabel: string
  importSendLabel: string
  importCloseLabel: string
  importCancelLabel: string
  importSuccessMessage: string
  importChecklist: string[]
  selectedImportFileName: string
  selectedImportFileType: string
  selectedImportFileSize: string
  selectedImportFileUrl: string
  dummyData: DummyDataItem[]
  orderMetrics: MetricItem[]
  searchPlaceholder: string
  orderRows: OrderImportRow[]
  selectedOrder: ImportedOrderInvoice
  reviewSummary: InvoiceReviewSummary
  formTitle: string
  formSubtitle: string
  formSubmitLabel: string
  formSuccessMessage: string
  isFormModalOpen: boolean
  isFormSubmitted: boolean
  formCustomers: OrderFormCustomerOption[]
  formProducts: OrderFormProductOption[]
  formManual: OrderManualForm
  returnTitle: string
  returnSubtitle: string
  returnSubmitLabel: string
  returnSuccessMessage: string
  returnPolicy: OrderReturnPolicy[]
  returnForm: OrderReturnForm
  isReturnModalOpen: boolean
  isReturnSubmitted: boolean
  importNotes: string[]
}

export interface OrdersState extends FeatureContent {
  dummyData: DummyDataItem[]
  view: OrdersView
}
