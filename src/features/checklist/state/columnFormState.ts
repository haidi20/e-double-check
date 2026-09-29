import type { ChecklistColumnGridSpan, ChecklistColumnMode, ChecklistColumnType } from '@/features/checklist/type/checklistTypes'

export interface ColumnFormState {
  label: string
  type: ChecklistColumnType
  answerTypeId: string
  mode: ChecklistColumnMode
  required: boolean
  gridSpan: ChecklistColumnGridSpan
  boldValue: boolean
  error: string
}

export const columnFormState: ColumnFormState = {
  label: '',
  type: 'text',
  answerTypeId: 'at-text',
  mode: 'read-only',
  required: false,
  gridSpan: 6,
  boldValue: false,
  error: ''
}
