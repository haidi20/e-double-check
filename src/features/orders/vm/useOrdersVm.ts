import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { ordersState } from '@/features/orders/vm/ordersState'
import type { OrderManualItem, OrderReturnItem } from '@/features/orders/type/ordersTypes'

export const useOrdersVm = defineStore('ordersVm', () => {
  const view = reactive({ ...ordersState.view })
  let manualItemSequence = view.formManual.items.length

  const fallbackPreviewUrl = '/files/faktur.jpeg'

  const revokeSelectedFileUrl = () => {
    if (view.selectedImportFileUrl.startsWith('blob:')) {
      URL.revokeObjectURL(view.selectedImportFileUrl)
    }
  }

  const resetSelectedImportFile = () => {
    revokeSelectedFileUrl()
    view.selectedImportFileName = ''
    view.selectedImportFileType = ''
    view.selectedImportFileSize = ''
    view.selectedImportFileUrl = ''
  }

  const getFileTypeLabel = (file: File) => {
    const extension = file.name.split('.').pop()?.toUpperCase()

    return extension || file.type || 'FILE'
  }

  const getFileSizeLabel = (size: number) => {
    if (size < 1024 * 1024) {
      return `${Math.max(Math.round(size / 1024), 1)} KB`
    }

    return `${(size / 1024 / 1024).toFixed(1)} MB`
  }

  const canProcessImport = computed(() => Boolean(view.selectedImportFileName))

  const importModalTitle = computed(() =>
    view.isImportReviewOpen ? view.reviewTitle : view.importUploadTitle
  )

  const importModalDescription = computed(() =>
    view.isImportReviewOpen ? view.importReviewDescription : view.importUploadDescription
  )

  const importPreviewUrl = computed(() => view.selectedImportFileUrl || view.selectedOrder.sourceFileUrl || fallbackPreviewUrl)

  const importDropzoneBadge = computed(() => view.selectedImportFileType || view.importDropzoneBadge)

  const selectedImportFileDisplay = computed(() =>
    view.selectedImportFileName || view.importFileLabel
  )

  const selectedImportFileMeta = computed(() => {
    const type = view.selectedImportFileType || view.selectedOrder.sourceFileType

    return view.selectedImportFileSize ? `${type} / ${view.selectedImportFileSize}` : type
  })

  const importSelectButtonLabel = computed(() =>
    view.selectedImportFileName ? view.importChangeLabel : view.importSelectLabel
  )

  const selectedFormCustomer = computed(() =>
    view.formCustomers.find((customer) => customer.code === view.formManual.customerCode) || view.formCustomers[0]
  )

  const getFormProduct = (productCode: string) =>
    view.formProducts.find((product) => product.code === productCode) || view.formProducts[0]

  const getManualItemUnit = (productCode: string) => getFormProduct(productCode)?.unit || ''

  const selectedManualItems = computed(() =>
    view.formManual.items.map((item) => ({
      ...item,
      product: getFormProduct(item.productCode),
      qtyNumber: Number(item.qty) || 0
    }))
  )

  const manualFormTotalQty = computed(() =>
    selectedManualItems.value.reduce((total, item) => total + item.qtyNumber, 0)
  )

  const selectedReturnOrder = computed(() =>
    view.orderRows.find((row) => row.invoiceNumber === view.returnForm.invoiceNumber) || view.orderRows[0]
  )

  const buildReturnItems = (invoiceNumber: string): OrderReturnItem[] => {
    const row = view.orderRows.find((orderRow) => orderRow.invoiceNumber === invoiceNumber)

    if (invoiceNumber === view.selectedOrder.invoiceNumber) {
      return view.selectedOrder.products.map((item) => ({
        id: `return-${item.code}`,
        code: item.code,
        name: item.name,
        unit: item.unit,
        invoiceQty: item.qty,
        returnQty: '1',
        checked: false
      }))
    }

    const items = row?.itemSummary.split(',').map((item) => item.trim()).filter(Boolean) || []
    const totalQty = Number(row?.totalQty) || items.length
    const splitQty = Math.max(Math.floor(totalQty / Math.max(items.length, 1)), 1)

    return items.map((item, index) => ({
      id: `return-${invoiceNumber}-${index + 1}`,
      code: `${invoiceNumber}-${index + 1}`,
      name: item,
      unit: 'item',
      invoiceQty: splitQty,
      returnQty: '1',
      checked: false
    }))
  }

  const selectedReturnItems = computed(() =>
    view.returnForm.items.filter((item) => item.checked)
  )

  const allReturnItemsChecked = computed(() =>
    view.returnForm.items.length > 0 && view.returnForm.items.every((item) => item.checked)
  )

  const returnSelectedQty = computed(() =>
    selectedReturnItems.value.reduce((total, item) => total + (Number(item.returnQty) || 0), 0)
  )

  const openImportModal = () => {
    view.isImportModalOpen = true
    view.isImportReviewOpen = false
    view.isImportSubmitted = false
    resetSelectedImportFile()
  }

  const closeImportModal = () => {
    view.isImportModalOpen = false
    view.isImportReviewOpen = false
    view.isImportSubmitted = false
    resetSelectedImportFile()
  }

  const handleImportFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    const file = target?.files?.[0]

    resetSelectedImportFile()
    view.isImportSubmitted = false

    if (!file) {
      return
    }

    view.selectedImportFileName = file.name
    view.selectedImportFileType = getFileTypeLabel(file)
    view.selectedImportFileSize = getFileSizeLabel(file.size)
    view.selectedImportFileUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : fallbackPreviewUrl
    view.importFileLabel = file.name
  }

  const processImportFile = () => {
    if (!canProcessImport.value) {
      return
    }

    view.selectedOrder.sourceFileName = view.selectedImportFileName
    view.selectedOrder.sourceFileType = view.selectedImportFileType
    view.selectedOrder.sourceFileUrl = importPreviewUrl.value
    view.isImportReviewOpen = true
  }

  const sendImportReview = () => {
    const importedRow = {
      orderNumber: view.selectedOrder.orderNumber,
      invoiceNumber: view.selectedOrder.invoiceNumber,
      customerName: view.selectedOrder.customerName,
      printDate: view.selectedOrder.invoiceDate,
      salesman: view.selectedOrder.salesman,
      itemSummary: view.selectedOrder.products.map((item) => item.name).join(', '),
      totalQty: String(view.selectedOrder.products.reduce((total, item) => total + item.qty, 0)),
      totalAmount: view.selectedOrder.totalAmount,
      status: 'Siap kirim'
    }
    const rowIndex = view.orderRows.findIndex((row) => row.invoiceNumber === importedRow.invoiceNumber)

    if (rowIndex >= 0) {
      view.orderRows[rowIndex] = importedRow
    } else {
      view.orderRows.unshift(importedRow)
    }

    view.selectedOrder.status = 'Siap kirim'
    view.isImportSubmitted = true
  }

  const openFormModal = () => {
    view.isFormModalOpen = true
    view.isFormSubmitted = false
  }

  const closeFormModal = () => {
    view.isFormModalOpen = false
    view.isFormSubmitted = false
  }

  const updateManualCustomer = (event: Event) => {
    const target = event.target as HTMLSelectElement | null

    if (!target) {
      return
    }

    view.formManual.customerCode = target.value
    view.isFormSubmitted = false
  }

  const updateManualItem = (itemId: string, field: keyof Pick<OrderManualItem, 'productCode' | 'qty'>, event: Event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null
    const item = view.formManual.items.find((manualItem) => manualItem.id === itemId)

    if (!target || !item) {
      return
    }

    item[field] = target.value
    view.isFormSubmitted = false
  }

  const addManualItem = () => {
    const firstProduct = view.formProducts[0]

    manualItemSequence += 1
    view.formManual.items.push({
      id: `manual-item-${manualItemSequence}`,
      productCode: firstProduct?.code || '',
      qty: '1'
    })
    view.isFormSubmitted = false
  }

  const removeManualItem = (itemId: string) => {
    if (view.formManual.items.length <= 1) {
      return
    }

    view.formManual.items = view.formManual.items.filter((item) => item.id !== itemId)
    view.isFormSubmitted = false
  }

  const saveFormModal = () => {
    const customer = selectedFormCustomer.value
    const validItems = selectedManualItems.value.filter((item) => item.product && item.qtyNumber > 0)

    if (!customer || validItems.length === 0) {
      return
    }

    const savedRow = {
      orderNumber: `PSN-MANUAL-${String(view.orderRows.length + 1).padStart(3, '0')}`,
      invoiceNumber: view.formManual.invoiceNumber,
      customerName: customer.name,
      printDate: '29 Mei 2026',
      salesman: 'Admin Operasional',
      itemSummary: validItems.map((item) => item.product.name).join(', '),
      totalQty: String(manualFormTotalQty.value),
      totalAmount: 'Rp0',
      status: 'Draft'
    }
    const rowIndex = view.orderRows.findIndex((row) => row.invoiceNumber === savedRow.invoiceNumber)

    if (rowIndex >= 0) {
      view.orderRows[rowIndex] = savedRow
    } else {
      view.orderRows.unshift(savedRow)
    }

    view.selectedOrder.invoiceNumber = view.formManual.invoiceNumber
    view.selectedOrder.customerName = customer.name
    view.selectedOrder.customerAddress = customer.address
    view.selectedOrder.products = validItems.map((item) => ({
      code: item.product.code,
      name: item.product.name,
      unit: item.product.unit,
      qty: item.qtyNumber,
      price: 'Rp0',
      amount: 'Rp0'
    }))
    view.isFormSubmitted = true
  }

  const openReturnModal = (invoiceNumber: string) => {
    view.returnForm.invoiceNumber = invoiceNumber
    view.returnForm.note = ''
    view.returnForm.items = buildReturnItems(invoiceNumber)
    view.isReturnModalOpen = true
    view.isReturnSubmitted = false
  }

  const closeReturnModal = () => {
    view.isReturnModalOpen = false
    view.isReturnSubmitted = false
  }

  const updateReturnNote = (event: Event) => {
    const target = event.target as HTMLTextAreaElement | null

    if (!target) {
      return
    }

    view.returnForm.note = target.value
    view.isReturnSubmitted = false
  }

  const toggleAllReturnItems = (event: Event) => {
    const target = event.target as HTMLInputElement | null

    if (!target) {
      return
    }

    view.returnForm.items.forEach((item) => {
      item.checked = target.checked
    })
    view.isReturnSubmitted = false
  }

  const toggleReturnItem = (itemId: string, event: Event) => {
    const target = event.target as HTMLInputElement | null
    const item = view.returnForm.items.find((returnItem) => returnItem.id === itemId)

    if (!target || !item) {
      return
    }

    item.checked = target.checked
    view.isReturnSubmitted = false
  }

  const updateReturnItemQty = (itemId: string, event: Event) => {
    const target = event.target as HTMLInputElement | null
    const item = view.returnForm.items.find((returnItem) => returnItem.id === itemId)

    if (!target || !item) {
      return
    }

    item.returnQty = target.value
    view.isReturnSubmitted = false
  }

  const saveReturnModal = () => {
    if (selectedReturnItems.value.length === 0) {
      return
    }

    view.isReturnSubmitted = true
  }

  return {
    ...ordersState,
    view,
    canProcessImport,
    importModalTitle,
    importModalDescription,
    importPreviewUrl,
    importDropzoneBadge,
    selectedImportFileDisplay,
    selectedImportFileMeta,
    importSelectButtonLabel,
    selectedFormCustomer,
    selectedManualItems,
    manualFormTotalQty,
    selectedReturnOrder,
    selectedReturnItems,
    allReturnItemsChecked,
    returnSelectedQty,
    getManualItemUnit,
    openImportModal,
    closeImportModal,
    handleImportFileChange,
    processImportFile,
    sendImportReview,
    openFormModal,
    closeFormModal,
    updateManualCustomer,
    updateManualItem,
    addManualItem,
    removeManualItem,
    saveFormModal,
    openReturnModal,
    closeReturnModal,
    updateReturnNote,
    toggleAllReturnItems,
    toggleReturnItem,
    updateReturnItemQty,
    saveReturnModal
  }
})
