import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { checklistQuestionsState } from '@/features/checklist/state/checklistQuestionsState'

export const useChecklistQuestionsVm = defineStore('checklistQuestionsVm', () => {
  const view = reactive({ ...checklistQuestionsState })
  registerStateHmr(view, 'checklistQuestionsState')

  const selectedCategory = computed(
    () => view.categories.find((category) => category.id === view.selectedCategoryId) ?? null
  )

  const selectedCategoryQuestions = computed(() =>
    selectedCategory.value
      ? view.questions.filter((question) => question.categoryId === selectedCategory.value?.id)
      : []
  )

  const selectCategory = (categoryId: string) => {
    view.selectedCategoryId = categoryId
  }

  const clearSelectedCategory = () => {
    view.selectedCategoryId = null
  }

  return {
    view,
    selectedCategory,
    selectedCategoryQuestions,
    selectCategory,
    clearSelectedCategory
  }
})
