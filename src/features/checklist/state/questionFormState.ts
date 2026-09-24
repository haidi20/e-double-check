import type { ChecklistQuestionValue } from '@/features/checklist/type/checklistTypes'

export interface QuestionFormState {
  editingQuestionId: string | null
  values: Record<string, ChecklistQuestionValue>
  error: string
}

export const questionFormState: QuestionFormState = {
  editingQuestionId: null,
  values: {},
  error: ''
}
