import type { ChecklistRepository } from '@/features/checklist/repository/checklistRepository'
import type {
  ChecklistAnswerType,
  ChecklistCategory,
  ChecklistQuestion
} from '@/features/checklist/type/checklistTypes'

const STORAGE_KEYS = {
  categories: 'checklist.categories.v1',
  questions: 'checklist.questions.v1',
  answerTypes: 'checklist.answerTypes.v1'
} as const

const readRecords = <T>(key: string): T[] | null => {
  if (typeof localStorage === 'undefined') {
    return null
  }

  try {
    const raw = localStorage.getItem(key)

    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw)

    return Array.isArray(parsed) ? (parsed as T[]) : null
  } catch {
    return null
  }
}

const writeRecords = <T>(key: string, records: T[]): void => {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    localStorage.setItem(key, JSON.stringify(records))
  } catch {
    return
  }
}

export const localChecklistRepository: ChecklistRepository = {
  loadCategories: () => readRecords<ChecklistCategory>(STORAGE_KEYS.categories),
  saveCategories: (categories) => writeRecords(STORAGE_KEYS.categories, categories),
  loadQuestions: () => readRecords<ChecklistQuestion>(STORAGE_KEYS.questions),
  saveQuestions: (questions) => writeRecords(STORAGE_KEYS.questions, questions),
  loadAnswerTypes: () => readRecords<ChecklistAnswerType>(STORAGE_KEYS.answerTypes),
  saveAnswerTypes: (answerTypes) => writeRecords(STORAGE_KEYS.answerTypes, answerTypes)
}
