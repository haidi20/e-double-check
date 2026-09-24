import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { categoryQuestionsModalState } from '@/features/checklist/state/categoryQuestionsModalState'
import { useChecklistQuestionsByCategoryVm } from '@/features/checklist/vm/useChecklistQuestionsByCategoryVm'
import { useQuestionFormVm } from '@/features/checklist/vm/useQuestionFormVm'

export const useCategoryQuestionsModalVm = defineStore('categoryQuestionsModalVm', () => {
  const view = reactive({ ...categoryQuestionsModalState })
  const categoryVm = useChecklistQuestionsByCategoryVm()
  const questionFormVm = useQuestionFormVm()

  const category = computed(() => categoryVm.category)
  const form = computed(() => questionFormVm.form)
  const fields = computed(() => questionFormVm.fields)
  const error = computed(() => questionFormVm.error)
  const isEditing = computed(() => questionFormVm.isEditing)

  const open = (questionId?: string) => {
    if (!categoryVm.categoryId) {
      return
    }

    questionFormVm.open(categoryVm.categoryId, questionId)
    view.isOpen = true
  }

  const close = () => {
    view.isOpen = false
    questionFormVm.reset()
  }

  const submitQuestion = () => {
    if (questionFormVm.submit()) {
      close()
    }
  }

  const removeQuestion = (questionId: string) => {
    categoryVm.removeQuestion(questionId)
  }

  return {
    view,
    category,
    form,
    fields,
    error,
    isEditing,
    open,
    close,
    submitQuestion,
    removeQuestion
  }
})
