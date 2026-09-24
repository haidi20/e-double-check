import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { dashboardMobileState } from '@/features/dashboard/state/dashboardMobileState'
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import type { DashboardMobileCategoryItem } from '@/features/dashboard/type/dashboardMobileTypes'

export const useDashboardMobileVm = defineStore('dashboardMobileVm', () => {
  const view = reactive({ ...dashboardMobileState.view })
  const priorityItems = dashboardMobileState.priorityItems
  const checklistVm = useChecklistQuestionsVm()

  const categories = computed<DashboardMobileCategoryItem[]>(() =>
    checklistVm.categoryCards
      .filter((category) => category.isVisible)
      .map((category) => ({
        id: category.id,
        name: category.name,
        questionCount: category.questionCount,
        icon: category.icon,
        routePath: `/checklist/${category.id}`
      }))
  )

  const totalQuestions = computed(() =>
    categories.value.reduce((total, category) => total + category.questionCount, 0)
  )

  const categoryCount = computed(() => categories.value.length)
  const shiftDateLabel = computed(
    () => new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
  )
  const shiftLabel = computed(() => {
    const hour = new Date().getHours()

    return hour < 11 ? 'Pagi' : hour < 15 ? 'Siang' : 'Sore'
  })

  return {
    view,
    priorityItems,
    categories,
    totalQuestions,
    categoryCount,
    shiftDateLabel,
    shiftLabel
  }
})
