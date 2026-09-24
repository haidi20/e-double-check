export type ChecklistColumnType = 'text' | 'number' | 'boolean' | 'time'
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
}

export interface ChecklistCategory {
  id: string
  name: string
  description: string
  questionCount: number
  isVisible: boolean
  columns: ChecklistColumn[]
}

export interface ChecklistQuestion {
  id: string
  categoryId: string
  name: string
  service: string
  values?: Partial<Record<string, ChecklistQuestionValue>>
  executor?: string
  controller?: string
  requiresCheckTime?: boolean
  requiresDoubleCheck?: boolean
  requiresFinalChecker?: boolean
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
}
