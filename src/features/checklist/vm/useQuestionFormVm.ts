import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { questionFormState } from '@/features/checklist/state/questionFormState'
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import type { ChecklistColumn } from '@/features/checklist/type/checklistTypes'

export const useQuestionFormVm = defineStore('questionFormVm', () => {
  const form = reactive({ ...questionFormState })
  const questionsVm = useChecklistQuestionsVm()

  const fields = computed<ChecklistColumn[]>(() =>
    questionsVm.view.categories.find(
      (category) => category.id === questionsVm.view.modal.questionModalCategoryId
    )?.columns ?? []
  )

  const error = computed(() => questionsVm.view.modal.questionFormError)
  const isEditing = computed(() => form.editingQuestionId !== null)

  const resetValues = () => {
    form.values = Object.fromEntries(
      fields.value.map((column) => [
        column.id,
        column.type === 'boolean' ? false : ''
      ])
    )
  }

  const fillFromQuestion = (questionId: string) => {
    const question = questionsVm.view.questions.find((item) => item.id === questionId)

    if (!question) {
      resetValues()
      return
    }

    form.values = Object.fromEntries(
      fields.value.map((column) => {
        const columnId = column.id
        const label = column.label.toLowerCase()
        const storedValue = question.values?.[columnId]

        if (storedValue !== undefined) {
          return [columnId, storedValue]
        }

        if (column.type === 'boolean') {
          return [columnId, false]
        }

        if (label.includes('layanan')) {
          return [columnId, question.service]
        }

        if (['item yang dicek', 'langkah', 'item', 'tindakan', 'pertanyaan'].some((keyword) => label.includes(keyword))) {
          return [columnId, question.name]
        }

        if (label.includes('pelaksana')) {
          return [columnId, question.executor ?? '']
        }

        if (label.includes('kontrol')) {
          return [columnId, question.controller ?? '']
        }

        return [columnId, '']
      })
    )
  }

  const reset = () => {
    resetValues()
    form.editingQuestionId = questionFormState.editingQuestionId
    form.error = questionFormState.error
  }

  const open = (categoryId: string, questionId?: string) => {
    questionsVm.setQuestionModalCategory(categoryId)
    reset()

    if (questionId) {
      form.editingQuestionId = questionId
      fillFromQuestion(questionId)
    }
  }

  const close = () => {
    questionsVm.closeQuestionModal()
    reset()
  }

  const submit = () => {
    const questionInput = { values: form.values }
    const isSuccess = form.editingQuestionId
      ? questionsVm.updateQuestion(form.editingQuestionId, questionInput)
      : questionsVm.addQuestion(questionInput)

    if (isSuccess) {
      reset()
    }

    return isSuccess
  }

  return {
    form,
    fields,
    error,
    isEditing,
    reset,
    open,
    close,
    submit
  }
})
