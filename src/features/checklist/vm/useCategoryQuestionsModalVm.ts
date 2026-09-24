import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { ChecklistColumn } from '@/features/checklist/type/checklistTypes'
import { categoryQuestionsModalState } from '@/features/checklist/state/categoryQuestionsModalState'
import { useChecklistQuestionsByCategoryVm } from '@/features/checklist/vm/useChecklistQuestionsByCategoryVm'
import { useQuestionFormVm } from '@/features/checklist/vm/useQuestionFormVm'

export const useCategoryQuestionsModalVm = defineStore('categoryQuestionsModalVm', () => {
  const view = reactive({ ...categoryQuestionsModalState })
  const categoryVm = useChecklistQuestionsByCategoryVm()
  const questionFormVm = useQuestionFormVm()

  const category = computed(() => categoryVm.category)
  const form = computed(() => questionFormVm.form)
  const fields = computed(() =>
    questionFormVm.fields.filter(
      (column) => !['no', 'nomor'].includes(column.label.trim().toLowerCase())
    )
  )
  const serviceOptions = computed(() => questionFormVm.serviceOptions)

  const isServiceColumn = (column: ChecklistColumn) =>
    column.type === 'text' && column.label.trim().toLowerCase() === 'layanan'

  const isQuestionColumn = (column: ChecklistColumn) =>
    column.type === 'text' &&
    ['item yang dicek', 'langkah', 'item', 'tindakan', 'pertanyaan'].some((keyword) =>
      column.label.trim().toLowerCase().includes(keyword)
    )

  const getFieldLayoutClass = (column: ChecklistColumn) => {
    const isFullWidth =
      column.gridSpan === 12 ||
      ((!column.gridSpan && isServiceColumn(column)) ||
        (!column.gridSpan && isQuestionColumn(column)))

    if (isFullWidth) {
      return 'category-questions-modal__field--full'
    }

    return 'category-questions-modal__field--half'
  }

  const getQuestionValue = (columnId: string) =>
    String(questionFormVm.form.values[columnId] ?? '')

  const updateQuestionValue = (columnId: string, event: Event) => {
    const target = event.target
    questionFormVm.form.values[columnId] =
      target instanceof HTMLTextAreaElement ? target.value : ''
  }

  const getServiceValue = (columnId: string) => String(questionFormVm.form.values[columnId] ?? '')

  const setServiceValue = (columnId: string, value: string) => {
    questionFormVm.form.values[columnId] = value
  }
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
    serviceOptions,
    isServiceColumn,
    isQuestionColumn,
    getFieldLayoutClass,
    getQuestionValue,
    updateQuestionValue,
    getServiceValue,
    setServiceValue,
    error,
    isEditing,
    open,
    close,
    submitQuestion,
    removeQuestion
  }
})
