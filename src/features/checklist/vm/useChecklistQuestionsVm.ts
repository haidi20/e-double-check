import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { checklistQuestionsState } from '@/features/checklist/state/checklistQuestionsState'
import type { ChecklistCategory, ChecklistColumn, ChecklistColumnMode, ChecklistQuestion, ChecklistQuestionValue } from '@/features/checklist/type/checklistTypes'

const defaultCategoryIcon = 'M4 6h16v4H4zM4 12h16v4H4zM4 18h16v2H4z'

const categoryIconMap: Record<string, string> = {
  'persiapan-shift': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v4l3 2',
  'cek-ulang-pra-sibuk': 'M4 6h16M4 12h16M4 18h16M8 4v4M16 10v4M11 16v4',
  'penerimaan-pesanan': 'M6 6h12v15H6V6Zm3 5h6M9 15h4M9 3h6l1 3H8l1-3Z',
  'jam-sibuk': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v4l3 2M4 12h2M18 12h2',
  'insiden-pesanan': 'M12 3 22 21H2L12 3Zm0 6v6m0 4v.01',
  'penutupan-shift': 'M12 3 20 7v5c0 5-3.4 8.1-8 10-4.6-1.9-8-5-8-10V7l8-4Zm-3 9 2 2 4-5'
}

export interface ChecklistCategoryCardItem {
  id: string
  name: string
  description: string
  questionCount: number
  icon: string
  isVisible: boolean
  columns: ChecklistColumn[]
  displayColumns: ChecklistColumn[]
}

export interface ChecklistQuestionRow {
  id: string
  name: string
  service: string
  serviceAbbreviation: string
  badge: string | null
}

export const useChecklistQuestionsVm = defineStore('checklistQuestionsVm', () => {
  const router = useRouter()
  const view = reactive({
    ...checklistQuestionsState,
    modal: { ...checklistQuestionsState.modal },
    columnModal: { ...checklistQuestionsState.columnModal, editingColumnId: null as string | null }
  })
  registerStateHmr(view, 'checklistQuestionsState')

  const categoryCards = computed<ChecklistCategoryCardItem[]>(() =>
    view.categories.map((category: ChecklistCategory) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      questionCount: category.questionCount,
      icon: categoryIconMap[category.id] ?? defaultCategoryIcon,
      isVisible: category.isVisible,
      columns: category.columns,
      displayColumns: category.columns.filter(
        (column) => column.label.trim().toLowerCase() !== 'no'
      )
    }))
  )

  const openCategory = (categoryId: string) => {
    router.push(`/checklist/${categoryId}`)
  }

  const toggleCategoryVisibility = (categoryId: string) => {
    const category = view.categories.find((item) => item.id === categoryId)

    if (category) {
      category.isVisible = !category.isVisible
    }
  }

  const openQuestionModal = (categoryId: string) => {
    view.modal.questionModalCategoryId = categoryId
    view.modal.isQuestionModalOpen = true
    view.modal.questionFormError = ''
  }

  const closeQuestionModal = () => {
    view.modal.isQuestionModalOpen = false
    view.modal.questionFormError = ''
  }

  const setQuestionModalCategory = (categoryId: string) => {
    view.modal.questionModalCategoryId = categoryId
    view.modal.questionFormError = ''
  }

  const addQuestion = (input: { values: Record<string, ChecklistQuestionValue> }) => {
    if (!view.modal.questionModalCategoryId) {
      return false
    }

    const categoryId = view.modal.questionModalCategoryId
    const category = view.categories.find((item) => item.id === categoryId)

    if (!category) {
      return false
    }

    const missingColumn = category.columns.find((column) => {
      if (!column.required) {
        return false
      }

      const value = input.values[column.id]

      return typeof value === 'boolean' ? !value : String(value ?? '').trim() === ''
    })

    if (missingColumn) {
      view.modal.questionFormError = `Kolom ${missingColumn.label} wajib diisi.`
      return false
    }

    const valueOfColumn = (predicate: (column: ChecklistColumn) => boolean) => {
      const column = category.columns.find(predicate)
      const value = column ? input.values[column.id] : undefined

      return typeof value === 'string' ? value.trim() : ''
    }

    const mainTextColumn =
      category.columns.find(
        (column) =>
          column.type === 'text' &&
          ['item yang dicek', 'langkah', 'item', 'tindakan', 'pertanyaan'].some((keyword) =>
            column.label.toLowerCase().includes(keyword)
          )
      ) ??
      category.columns.find(
        (column) => column.type === 'text' && !column.label.toLowerCase().includes('layanan')
      )

    const name = mainTextColumn ? valueOfColumn((column) => column.id === mainTextColumn.id) : ''
    const service = valueOfColumn((column) => column.label.toLowerCase().includes('layanan'))
    const executor = valueOfColumn((column) => column.label.toLowerCase().includes('pelaksana'))
    const controller = valueOfColumn((column) => column.label.toLowerCase().includes('kontrol'))
    const checkTime = valueOfColumn((column) => column.label.toLowerCase().includes('jam cek'))

    if (!name || !service) {
      view.modal.questionFormError = 'Kolom pertanyaan dan layanan wajib diisi.'
      return false
    }

    const nextNumber = view.questions.reduce((max, row) => {
      const match = row.id.match(/^q-(\d+)$/)

      return match ? Math.max(max, Number(match[1])) : max
    }, 0) + 1

    view.questions.push({
      id: `q-${String(nextNumber).padStart(3, '0')}`,
      categoryId,
      name,
      service,
      values: input.values,
      executor: executor || undefined,
      controller: controller || undefined,
      requiresCheckTime: checkTime ? true : undefined
    })

    if (category) {
      category.questionCount += 1
    }

    view.modal.isQuestionModalOpen = false
    view.modal.questionFormError = ''
    return true
  }

  const updateQuestion = (questionId: string, input: { values: Record<string, ChecklistQuestionValue> }) => {
    const question = view.questions.find((item) => item.id === questionId)

    if (!question) {
      return false
    }

    const category = view.categories.find((item) => item.id === question.categoryId)

    if (!category) {
      return false
    }

    const missingColumn = category.columns.find((column) => {
      if (!column.required) {
        return false
      }

      const value = input.values[column.id]

      return typeof value === 'boolean' ? !value : String(value ?? '').trim() === ''
    })

    if (missingColumn) {
      view.modal.questionFormError = `Kolom ${missingColumn.label} wajib diisi.`
      return false
    }

    const valueOfColumn = (predicate: (column: ChecklistColumn) => boolean) => {
      const column = category.columns.find(predicate)
      const value = column ? input.values[column.id] : undefined

      return typeof value === 'string' ? value.trim() : ''
    }

    const mainTextColumn =
      category.columns.find(
        (column) =>
          column.type === 'text' &&
          ['item yang dicek', 'langkah', 'item', 'tindakan', 'pertanyaan'].some((keyword) =>
            column.label.toLowerCase().includes(keyword)
          )
      ) ??
      category.columns.find(
        (column) => column.type === 'text' && !column.label.toLowerCase().includes('layanan')
      )

    const name = mainTextColumn ? valueOfColumn((column) => column.id === mainTextColumn.id) : ''
    const service = valueOfColumn((column) => column.label.toLowerCase().includes('layanan'))
    const executor = valueOfColumn((column) => column.label.toLowerCase().includes('pelaksana'))
    const controller = valueOfColumn((column) => column.label.toLowerCase().includes('kontrol'))
    const checkTime = valueOfColumn((column) => column.label.toLowerCase().includes('jam cek'))

    if (!name || !service) {
      view.modal.questionFormError = 'Kolom pertanyaan dan layanan wajib diisi.'
      return false
    }

    question.name = name
    question.service = service
    question.values = input.values
    question.executor = executor || undefined
    question.controller = controller || undefined
    question.requiresCheckTime = checkTime ? true : undefined
    view.modal.questionFormError = ''
    return true
  }

  const removeQuestion = (questionId: string) => {
    const index = view.questions.findIndex((item) => item.id === questionId)

    if (index < 0) {
      return false
    }

    const question = view.questions[index]
    const category = view.categories.find((item) => item.id === question.categoryId)

    view.questions.splice(index, 1)

    if (category) {
      category.questionCount = Math.max(0, category.questionCount - 1)
    }

    view.modal.isQuestionModalOpen = false
    view.modal.questionModalCategoryId = null
    view.modal.questionFormError = ''
    return true
  }

  const openColumnModal = (categoryId: string, columnId?: string) => {
    view.columnModal.columnModalCategoryId = categoryId
    view.columnModal.editingColumnId = columnId ?? null
    view.columnModal.isColumnModalOpen = true
    view.columnModal.columnFormError = ''
  }

  const closeColumnModal = () => {
    view.columnModal.isColumnModalOpen = false
    view.columnModal.editingColumnId = null
    view.columnModal.columnFormError = ''
  }

  const addColumn = (input: { label: string; type: ChecklistColumn['type']; mode: ChecklistColumnMode; required: boolean }) => {
    if (!view.columnModal.columnModalCategoryId) {
      return false
    }

    const trimmedLabel = input.label.trim()

    if (!trimmedLabel) {
      view.columnModal.columnFormError = 'Nama kolom wajib diisi.'
      return false
    }

    const category = view.categories.find(
      (item) => item.id === view.columnModal.columnModalCategoryId
    )

    if (!category) {
      return false
    }

    const isDuplicate = category.columns.some(
      (column) =>
        column.label.toLowerCase() === trimmedLabel.toLowerCase() &&
        column.id !== view.columnModal.editingColumnId
    )

    if (isDuplicate) {
      view.columnModal.columnFormError = 'Nama kolom sudah digunakan pada kategori ini.'
      return false
    }

    if (view.columnModal.editingColumnId) {
      const existing = category.columns.find(
        (column) => column.id === view.columnModal.editingColumnId
      )

      if (existing) {
        existing.label = trimmedLabel
        existing.type = input.type
        existing.mode = input.mode
        existing.required = input.required
      }
    } else {
      const nextNumber = category.columns.reduce((max, column) => {
        const match = column.id.match(/^col-(\d+)$/)

        return match ? Math.max(max, Number(match[1])) : max
      }, 0) + 1

      category.columns.push({
        id: `col-${nextNumber}`,
        label: trimmedLabel,
        type: input.type,
        mode: input.mode,
        required: input.required
      })
    }

    view.columnModal.isColumnModalOpen = false
    view.columnModal.editingColumnId = null
    view.columnModal.columnFormError = ''
    return true
  }

  const removeColumn = (categoryId: string, columnId: string) => {
    const category = view.categories.find((item) => item.id === categoryId)

    if (!category) {
      return
    }

    const index = category.columns.findIndex((column) => column.id === columnId)

    if (index >= 0) {
      category.columns.splice(index, 1)
    }
  }

  return {
    view,
    columnModal: view.columnModal,
    categoryCards,
    openCategory,
    toggleCategoryVisibility,
    openQuestionModal,
    setQuestionModalCategory,
    closeQuestionModal,
    addQuestion,
    updateQuestion,
    removeQuestion,
    openColumnModal,
    closeColumnModal,
    addColumn,
    removeColumn
  }
})
