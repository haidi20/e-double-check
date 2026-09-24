import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { checklistQuestionsByCategoryState } from '@/features/checklist/state/checklistQuestionsByCategoryState'
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import type { ChecklistQuestionRow } from '@/features/checklist/vm/useChecklistQuestionsVm'

export const useChecklistQuestionsByCategoryVm = defineStore('checklistQuestionsByCategoryVm', () => {
  const route = useRoute()
  const router = useRouter()
  const view = reactive({ ...checklistQuestionsByCategoryState })
  const questionsVm = useChecklistQuestionsVm()

  const categoryId = computed(() => {
    const param = route.params.categoryId

    return typeof param === 'string' ? param : null
  })

  const category = computed(() =>
    questionsVm.view.categories.find((item) => item.id === categoryId.value) ?? null
  )

  const questions = computed<ChecklistQuestionRow[]>(() => {
    if (!categoryId.value) {
      return []
    }

    return questionsVm.view.questions
      .filter((question) => question.categoryId === categoryId.value)
      .map((question) => ({
        id: question.id,
        name: question.name,
        service: question.service,
        serviceAbbreviation: question.service.slice(0, 2).toUpperCase(),
        badge: question.requiresDoubleCheck
          ? 'Cek ganda'
          : question.requiresFinalChecker
            ? 'Pemeriksa akhir'
            : question.requiresCheckTime
              ? 'Jam cek'
              : null
      }))
  })

  const pageHeading = computed(() =>
    category.value
      ? { title: category.value.name, description: category.value.description }
      : { title: 'Pertanyaan', description: 'Kategori tidak ditemukan.' }
  )

  const columns = computed(() => category.value?.columns ?? [])

  const goBack = () => {
    router.push('/checklist')
  }

  return {
    view,
    categoryId,
    category,
    questions,
    pageHeading,
    columns,
    goBack,
    setQuestionModalCategory: questionsVm.setQuestionModalCategory,
    removeQuestion: questionsVm.removeQuestion
  }
})
