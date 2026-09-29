export type ChecklistColumnType = 'text' | 'number' | 'boolean' | 'time' | 'select'
export type ChecklistColumnMode = 'input' | 'read-only'
export type ChecklistColumnGridSpan = 6 | 12
export type ChecklistQuestionValue = string | number | boolean

export interface ChecklistColumn {
  id: string
  label: string
  type: ChecklistColumnType
  mode: ChecklistColumnMode
  required: boolean
  gridSpan?: ChecklistColumnGridSpan
  boldValue?: boolean
  options?: string[]
  answerTypeId?: string
}

export interface ChecklistCategory {
  id: string
  name: string
  description: string
  questionCount: number
  isVisible: boolean
  isArchived?: boolean
  columns: ChecklistColumn[]
}

export interface ChecklistQuestion {
  id: string
  categoryId: string
  name: string
  service: string
  serviceId?: string
  values?: Partial<Record<string, ChecklistQuestionValue>>
  executor?: string
  controller?: string
  requiresCheckTime?: boolean
  requiresDoubleCheck?: boolean
  requiresFinalChecker?: boolean
  isArchived?: boolean
}

export interface ChecklistQuestionModalState {
  isQuestionModalOpen: boolean
  questionModalCategoryId: string | null
  questionFormError: string
}

export interface ChecklistColumnModalState {
  isColumnModalOpen: boolean
  columnModalCategoryId: string | null
  editingColumnId: string | null
  columnFormError: string
}

export interface ChecklistQuestionsByCategoryState {
  categoryId: string | null
}

export interface CategoryQuestionsModalState {
  isOpen: boolean
}

export type ColumnManagerModalTab = 'columns' | 'form'

export interface ColumnManagerModalState {
  isOpen: boolean
  activeTab: ColumnManagerModalTab
}

export interface ChecklistQuestionsState {
  categories: ChecklistCategory[]
  questions: ChecklistQuestion[]
  modal: ChecklistQuestionModalState
  columnModal: ChecklistColumnModalState
  categoryModal: ChecklistCategoryModalState
}

export interface ChecklistCategoryModalState {
  isCategoryModalOpen: boolean
  editingCategoryId: string | null
  categoryFormError: string
  actionError: string
}

export interface ChecklistAnswerType {
  id: string
  label: string
  kind: ChecklistColumnType
  options?: string[]
  isSystem: boolean
  isArchived?: boolean
}

export interface ChecklistAnswerTypeModalState {
  isOpen: boolean
  editingAnswerTypeId: string | null
  formError: string
}

export interface ChecklistAnswerTypesState {
  answerTypes: ChecklistAnswerType[]
  modal: ChecklistAnswerTypeModalState
}
