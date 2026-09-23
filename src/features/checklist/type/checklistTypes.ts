export interface ChecklistCategory {
  id: string
  name: string
  description: string
  questionCount: number
}

export interface ChecklistQuestion {
  id: string
  categoryId: string
  name: string
  service: string
  executor?: string
  controller?: string
  requiresCheckTime?: boolean
  requiresDoubleCheck?: boolean
  requiresFinalChecker?: boolean
}

export interface ChecklistQuestionsState {
  categories: ChecklistCategory[]
  questions: ChecklistQuestion[]
  selectedCategoryId: string | null
}
