import type {
  ChecklistAnswerType,
  ChecklistCategory,
  ChecklistQuestion
} from '@/features/checklist/type/checklistTypes'

export interface ChecklistRepository {
  loadCategories(): ChecklistCategory[] | null
  saveCategories(categories: ChecklistCategory[]): void
  loadQuestions(): ChecklistQuestion[] | null
  saveQuestions(questions: ChecklistQuestion[]): void
  loadAnswerTypes(): ChecklistAnswerType[] | null
  saveAnswerTypes(answerTypes: ChecklistAnswerType[]): void
}
