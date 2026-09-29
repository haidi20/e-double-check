import type { ChecklistRepository } from '@/features/checklist/repository/checklistRepository'
import type {
  ChecklistAnswerType,
  ChecklistCategory,
  ChecklistQuestion
} from '@/features/checklist/type/checklistTypes'

export const remoteChecklistRepository: ChecklistRepository = {
  loadCategories: (): ChecklistCategory[] | null => {
    throw new Error('Remote checklist repository belum terhubung ke API.')
  },
  saveCategories: (categories: ChecklistCategory[]): void => {
    void categories
    throw new Error('Remote checklist repository belum terhubung ke API.')
  },
  loadQuestions: (): ChecklistQuestion[] | null => {
    throw new Error('Remote checklist repository belum terhubung ke API.')
  },
  saveQuestions: (questions: ChecklistQuestion[]): void => {
    void questions
    throw new Error('Remote checklist repository belum terhubung ke API.')
  },
  loadAnswerTypes: (): ChecklistAnswerType[] | null => {
    throw new Error('Remote checklist repository belum terhubung ke API.')
  },
  saveAnswerTypes: (answerTypes: ChecklistAnswerType[]): void => {
    void answerTypes
    throw new Error('Remote checklist repository belum terhubung ke API.')
  }
}
