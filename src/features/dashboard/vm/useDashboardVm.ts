import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { DashboardDeliveryOrderItem, DashboardLineChart } from '@/features/dashboard/type/dashboardTypes'
import { dashboardState } from '@/features/dashboard/vm/dashboardState'
import { deliveryOrdersState } from '@/features/distribution/delivery-orders/vm/deliveryOrdersState'

export const useDashboardVm = defineStore('dashboardVm', () => {
  const view = reactive({ ...dashboardState.view })
  const visibleDeliveryOrderLimit = 5

  const trendChart = computed<DashboardLineChart>(() => {
    const width = 1000
    const height = 220
    const paddingX = 0
    const paddingY = 18
    const values = view.trendItems.map((item) => item.value)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const range = Math.max(maxValue - minValue, 1)
    const maxIndex = Math.max(view.trendItems.length - 1, 1)
    const baseline = height - paddingY

    const points = view.trendItems.map((item, index) => {
      const x = paddingX + (index / maxIndex) * (width - paddingX * 2)
      const y = paddingY + (1 - (item.value - minValue) / range) * (height - paddingY * 2)

      return {
        ...item,
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        xPercent: `${Number(((x / width) * 100).toFixed(2))}%`,
        yPercent: `${Number(((y / height) * 100).toFixed(2))}%`
      }
    })

    const gridPath = Array.from({ length: 5 }, (_, index) => {
      const y = paddingY + (index / 4) * (baseline - paddingY)

      return `M0 ${Number(y.toFixed(2))}H${width}`
    }).join('')
    const linePath = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ')
    const areaPath = points.length
      ? `M ${points[0].x} ${baseline} ${linePath.replace('M', 'L')} L ${points[points.length - 1].x} ${baseline} Z`
      : ''

    return {
      viewBox: `0 0 ${width} ${height}`,
      gridPath,
      linePath,
      areaPath,
      labelColumns: `repeat(${points.length}, minmax(0, 1fr))`,
      points
    }
  })

  const deliveryOrderItems = computed<DashboardDeliveryOrderItem[]>(() =>
    deliveryOrdersState.view.operationRows.slice(0, visibleDeliveryOrderLimit).map((row, index) => ({
      id: row.code,
      code: row.code,
      customer: row.primary,
      detail: `${row.secondary} / ${row.amount} / ${row.owner}`,
      status: row.status,
      icon: `SJ${index + 1}`
    }))
  )

  const deliveryOrderTotalLabel = computed(
    () => `${deliveryOrderItems.value.length} terbaru dari ${deliveryOrdersState.view.operationRows.length} surat jalan`
  )

  const deliveryOrderEmptyMessage = computed(() => 'Belum ada data surat jalan untuk ditampilkan.')

  const openFormModal = () => {
    view.isFormModalOpen = true
    view.isFormSubmitted = false
  }

  const closeFormModal = () => {
    view.isFormModalOpen = false
    view.isFormSubmitted = false
  }

  const updateFormField = (fieldId: string, event: Event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
    const field = view.formFields.find((item) => item.id === fieldId)

    if (!target || !field || field.readonly) {
      return
    }

    field.value = target.value
  }

  const saveFormModal = () => {
    view.isFormSubmitted = true
  }

  return {
    ...dashboardState,
    trendChart,
    deliveryOrderItems,
    deliveryOrderTotalLabel,
    deliveryOrderEmptyMessage,
    view,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})
