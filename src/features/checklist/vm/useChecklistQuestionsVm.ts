import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { checklistQuestionsState } from '@/features/checklist/state/checklistQuestionsState'
import { localChecklistRepository } from '@/features/checklist/repository/localChecklistRepository'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'
import { useServicesVm } from '@/features/master-data/services/vm/useServicesVm'
import type { ChecklistCategory, ChecklistColumn, ChecklistColumnGridSpan, ChecklistColumnMode, ChecklistQuestion, ChecklistQuestionValue } from '@/features/checklist/type/checklistTypes'

const defaultCategoryIcon = 'M4 6h16v4H4zM4 12h16v4H4zM4 18h16v2H4z'

const categoryIconMap: Record<string, string> = {
  'persiapan-shift': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v4l3 2',
  'cek-ulang-pra-sibuk': 'M4 6h16M4 12h16M4 18h16M8 4v4M16 10v4M11 16v4',
  'penerimaan-pesanan': 'M6 6h12v15H6V6Zm3 5h6M9 15h4M9 3h6l1 3H8l1-3Z',
  'jam-sibuk': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v4l3 2M4 12h2M18 12h2',
  'insiden-pesanan': 'M12 3 22 21H2L12 3Zm0 6v6m0 4v.01',
  'penutupan-shift': 'M12 3 20 7v5c0 5-3.4 8.1-8 10-4.6-1.9-8-5-8-10V7l8-4Zm-3 9 2 2 4-5'
}

const toPlainRecords = <T>(records: T[]): T[] => JSON.parse(JSON.stringify(records)) as T[]

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
  number: number
  id: string
  name: string
  service: string
  serviceAbbreviation: string
  badge: string | null
}

export const useChecklistQuestionsVm = defineStore('checklistQuestionsVm', () => {
  const router = useRouter()
  const authVm = useAuthVm()
  const servicesVm = useServicesVm()
  const view = reactive({
    ...checklistQuestionsState,
    modal: { ...checklistQuestionsState.modal },
    columnModal: { ...checklistQuestionsState.columnModal, editingColumnId: null as string | null },
    categoryModal: { ...checklistQuestionsState.categoryModal }
  })
  registerStateHmr(view, 'checklistQuestionsState')

  const savedCategories = localChecklistRepository.loadCategories()

  if (savedCategories) {
    view.categories = savedCategories
  }

  const savedQuestions = localChecklistRepository.loadQuestions()

  if (savedQuestions) {
    view.questions = savedQuestions
  }

  const resolveServiceId = (serviceLabel: string) => {
    const normalized = serviceLabel.trim().toLowerCase()
    const match = servicesVm.view.services.find((service) =>
      service.name.toLowerCase() === normalized ||
      service.code.toLowerCase() === normalized
    )

    return match?.id ?? servicesVm.view.services[0]?.id ?? 'service-1'
  }

  view.questions.forEach((question) => {
    if (!question.serviceId) {
      question.serviceId = resolveServiceId(question.service)
    }
  })

  watch(
    () => [view.categories, view.questions],
    () => {
      localChecklistRepository.saveCategories(toPlainRecords(view.categories))
      localChecklistRepository.saveQuestions(toPlainRecords(view.questions))
    },
    { deep: true }
  )

  const isMasterEditor = computed(() => authVm.selectedRole !== 'employee')

  const ensureMasterEditor = () => {
    if (isMasterEditor.value) {
      return true
    }

    view.categoryModal.actionError = 'Hanya admin yang dapat mengubah data master.'
    return false
  }

  const mapCategoryCard = (category: ChecklistCategory): ChecklistCategoryCardItem => ({
    id: category.id,
    name: category.name,
    description: category.description,
    questionCount: questionRowsByCategory.value[category.id]?.length ?? 0,
    icon: categoryIconMap[category.id] ?? defaultCategoryIcon,
    isVisible: category.isVisible,
    columns: category.columns,
    displayColumns: category.columns.filter(
      (column) => column.label.trim().toLowerCase() !== 'no'
    )
  })

  const categoryCards = computed<ChecklistCategoryCardItem[]>(() =>
    view.categories
      .filter((category) => !category.isArchived)
      .map((category: ChecklistCategory) => mapCategoryCard(category))
  )

  const archivedCategoryCards = computed<ChecklistCategoryCardItem[]>(() =>
    view.categories
      .filter((category) => category.isArchived)
      .map((category: ChecklistCategory) => mapCategoryCard(category))
  )

  const serviceNameOf = (question: ChecklistQuestion) => {
    const service = servicesVm.view.services.find((item) => item.id === question.serviceId)

    return service?.name ?? question.service
  }

  const serviceAbbreviationOf = (question: ChecklistQuestion) => {
    const service = servicesVm.view.services.find((item) => item.id === question.serviceId)
    const label = service?.code ?? serviceNameOf(question)

    return label.slice(0, 2).toUpperCase()
  }

  const mapQuestionRows = (categoryId: string, archived: boolean): ChecklistQuestionRow[] => {
    let number = 0

    return view.questions
      .filter((question) => question.categoryId === categoryId && question.isArchived === archived)
      .map((question) => {
        number += 1

        return {
          number,
          id: question.id,
          name: question.name,
          service: serviceNameOf(question),
          serviceAbbreviation: serviceAbbreviationOf(question),
          badge: question.requiresDoubleCheck
            ? 'Cek ganda'
            : question.requiresFinalChecker
              ? 'Pemeriksa akhir'
              : question.requiresCheckTime
                ? 'Jam cek'
                : null
        }
      })
  }

  const questionRowsByCategory = computed<Record<string, ChecklistQuestionRow[]>>(() =>
    Object.fromEntries(
      view.categories.map((category: ChecklistCategory) => [
        category.id,
        mapQuestionRows(category.id, false)
      ])
    )
  )

  const archivedQuestionRowsByCategory = computed<Record<string, ChecklistQuestionRow[]>>(() =>
    Object.fromEntries(
      view.categories.map((category: ChecklistCategory) => [
        category.id,
        mapQuestionRows(category.id, true)
      ])
    )
  )

  const openCategory = (categoryId: string) => {
    router.push(`/checklist/${categoryId}`)
  }

  const toggleCategoryVisibility = (categoryId: string) => {
    if (!ensureMasterEditor()) {
      return
    }

    const category = view.categories.find((item) => item.id === categoryId)

    if (category) {
      category.isVisible = !category.isVisible
    }
  }

  const openCategoryModal = (categoryId?: string) => {
    view.categoryModal.editingCategoryId = categoryId ?? null
    view.categoryModal.categoryFormError = ''
    view.categoryModal.isCategoryModalOpen = true
  }

  const closeCategoryModal = () => {
    view.categoryModal.isCategoryModalOpen = false
    view.categoryModal.editingCategoryId = null
    view.categoryModal.categoryFormError = ''
  }

  const addCategory = (input: { name: string; description: string }) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const name = input.name.trim()

    if (!name) {
      view.categoryModal.categoryFormError = 'Nama kategori wajib diisi.'
      return false
    }

    const isDuplicate = view.categories.some(
      (category) => category.name.trim().toLowerCase() === name.toLowerCase()
    )

    if (isDuplicate) {
      view.categoryModal.categoryFormError = 'Nama kategori sudah digunakan.'
      return false
    }

    view.categories.push({
      id: `kategori-${Date.now()}`,
      name,
      description: input.description.trim(),
      questionCount: 0,
      isVisible: true,
      columns: []
    })

    view.categoryModal.isCategoryModalOpen = false
    view.categoryModal.editingCategoryId = null
    view.categoryModal.categoryFormError = ''
    view.categoryModal.actionError = ''
    return true
  }

  const updateCategory = (categoryId: string, input: { name: string; description: string }) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const category = view.categories.find((item) => item.id === categoryId)

    if (!category) {
      return false
    }

    const name = input.name.trim()

    if (!name) {
      view.categoryModal.categoryFormError = 'Nama kategori wajib diisi.'
      return false
    }

    const isDuplicate = view.categories.some(
      (item) => item.id !== categoryId && item.name.trim().toLowerCase() === name.toLowerCase()
    )

    if (isDuplicate) {
      view.categoryModal.categoryFormError = 'Nama kategori sudah digunakan.'
      return false
    }

    category.name = name
    category.description = input.description.trim()
    view.categoryModal.isCategoryModalOpen = false
    view.categoryModal.editingCategoryId = null
    view.categoryModal.categoryFormError = ''
    view.categoryModal.actionError = ''
    return true
  }

  const moveCategory = (categoryId: string, direction: 'up' | 'down') => {
    if (!ensureMasterEditor()) {
      return false
    }

    const index = view.categories.findIndex((item) => item.id === categoryId)
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (index < 0 || targetIndex < 0 || targetIndex >= view.categories.length) {
      return false
    }

    const [category] = view.categories.splice(index, 1)
    view.categories.splice(targetIndex, 0, category)
    view.categoryModal.actionError = ''
    return true
  }

  const archiveCategory = (categoryId: string) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const category = view.categories.find((item) => item.id === categoryId)

    if (!category) {
      return false
    }

    category.isArchived = true
    view.categoryModal.actionError = ''
    return true
  }

  const restoreCategory = (categoryId: string) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const category = view.categories.find((item) => item.id === categoryId)

    if (!category) {
      return false
    }

    category.isArchived = false
    view.categoryModal.actionError = ''
    return true
  }

  const deleteCategory = (categoryId: string) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const index = view.categories.findIndex((item) => item.id === categoryId)

    if (index < 0) {
      return false
    }

    const hasQuestions = view.questions.some((question) => question.categoryId === categoryId)

    if (hasQuestions) {
      view.categoryModal.actionError =
        'Kategori masih memiliki pertanyaan. Arsipkan kategori untuk menjaga riwayat.'
      return false
    }

    view.categories.splice(index, 1)
    view.categoryModal.actionError = ''
    return true
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
    if (!ensureMasterEditor()) {
      return false
    }

    if (!view.modal.questionModalCategoryId) {
      return false
    }

    const categoryId = view.modal.questionModalCategoryId
    const category = view.categories.find((item) => item.id === categoryId)

    if (!category) {
      return false
    }

    const missingColumn = category.columns.find((column) => {
      if (!column.required || column.mode === 'read-only') {
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
    const serviceId = valueOfColumn((column) => column.label.toLowerCase().includes('layanan'))
    const service = servicesVm.view.services.find((item) => item.id === serviceId)?.name ?? ''
    const executor = valueOfColumn((column) => column.label.toLowerCase().includes('pelaksana'))
    const controller = valueOfColumn((column) => column.label.toLowerCase().includes('kontrol'))
    const checkTime = valueOfColumn((column) => column.label.toLowerCase().includes('jam cek'))

    if (!name || !serviceId) {
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
      serviceId,
      values: input.values,
      executor: executor || undefined,
      controller: controller || undefined,
      requiresCheckTime: checkTime ? true : undefined
    })

    category.questionCount += 1

    view.modal.isQuestionModalOpen = false
    view.modal.questionFormError = ''
    return true
  }

  const updateQuestion = (questionId: string, input: { values: Record<string, ChecklistQuestionValue> }) => {
    if (!ensureMasterEditor()) {
      return false
    }

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
    const serviceId = valueOfColumn((column) => column.label.toLowerCase().includes('layanan'))
    const service = servicesVm.view.services.find((item) => item.id === serviceId)?.name ?? ''
    const executor = valueOfColumn((column) => column.label.toLowerCase().includes('pelaksana'))
    const controller = valueOfColumn((column) => column.label.toLowerCase().includes('kontrol'))
    const checkTime = valueOfColumn((column) => column.label.toLowerCase().includes('jam cek'))

    if (!name || !serviceId) {
      view.modal.questionFormError = 'Kolom pertanyaan dan layanan wajib diisi.'
      return false
    }

    question.name = name
    question.service = service
    question.serviceId = serviceId
    question.values = input.values
    question.executor = executor || undefined
    question.controller = controller || undefined
    question.requiresCheckTime = checkTime ? true : undefined
    view.modal.questionFormError = ''
    return true
  }

  const removeQuestion = (questionId: string) => {
    if (!ensureMasterEditor()) {
      return false
    }

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

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    if (!ensureMasterEditor()) {
      return false
    }

    const question = view.questions.find((item) => item.id === questionId)

    if (!question) {
      return false
    }

    const categoryIndexes = view.questions
      .map((item, index) =>
        item.categoryId === question.categoryId && !item.isArchived ? index : -1
      )
      .filter((index) => index >= 0)
    const position = categoryIndexes.indexOf(view.questions.indexOf(question))
    const targetPosition = direction === 'up' ? position - 1 : position + 1

    if (position < 0 || targetPosition < 0 || targetPosition >= categoryIndexes.length) {
      return false
    }

    const currentIndex = view.questions.indexOf(question)
    const targetIndex = categoryIndexes[targetPosition]

    view.questions.splice(currentIndex, 1)
    view.questions.splice(targetIndex > currentIndex ? targetIndex - 1 : targetIndex, 0, question)
    return true
  }

  const archiveQuestion = (questionId: string) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const question = view.questions.find((item) => item.id === questionId)

    if (!question) {
      return false
    }

    question.isArchived = true
    return true
  }

  const restoreQuestion = (questionId: string) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const question = view.questions.find((item) => item.id === questionId)

    if (!question) {
      return false
    }

    question.isArchived = false
    return true
  }

  const openColumnModal = (categoryId: string, columnId?: string) => {
    if (!ensureMasterEditor()) {
      return
    }

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

  const addColumn = (input: {
    label: string
    type: ChecklistColumn['type']
    mode: ChecklistColumnMode
    required: boolean
    gridSpan: ChecklistColumnGridSpan
    boldValue: boolean
    answerTypeId?: string
    options?: string[]
  }) => {
    if (!ensureMasterEditor()) {
      return false
    }

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
        existing.gridSpan = input.gridSpan
        existing.boldValue = input.boldValue
        existing.answerTypeId = input.answerTypeId
        existing.options = input.options?.length ? input.options : undefined
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
        required: input.required,
        gridSpan: input.gridSpan,
        boldValue: input.boldValue,
        answerTypeId: input.answerTypeId,
        options: input.options?.length ? input.options : undefined
      })
    }

    view.columnModal.isColumnModalOpen = false
    view.columnModal.editingColumnId = null
    view.columnModal.columnFormError = ''
    return true
  }

  const removeColumn = (categoryId: string, columnId: string) => {
    if (!ensureMasterEditor()) {
      return
    }

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
    categoryModal: view.categoryModal,
    isMasterEditor,
    categoryCards,
    archivedCategoryCards,
    questionRowsByCategory,
    archivedQuestionRowsByCategory,
    openCategory,
    toggleCategoryVisibility,
    openCategoryModal,
    closeCategoryModal,
    addCategory,
    updateCategory,
    moveCategory,
    archiveCategory,
    restoreCategory,
    deleteCategory,
    openQuestionModal,
    setQuestionModalCategory,
    closeQuestionModal,
    addQuestion,
    updateQuestion,
    removeQuestion,
    moveQuestion,
    archiveQuestion,
    restoreQuestion,
    openColumnModal,
    closeColumnModal,
    addColumn,
    removeColumn
  }
})
