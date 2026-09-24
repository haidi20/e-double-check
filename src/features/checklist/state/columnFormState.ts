import type { ChecklistColumnMode, ChecklistColumnType } from '@/features/checklist/type/checklistTypes'

export interface ColumnFormState {
  label: string
  type: ChecklistColumnType
  mode: ChecklistColumnMode
  required: boolean
  error: string
}

export const columnFormState: ColumnFormState = {
  label: '',
  type: 'text',
  mode: 'read-only',
  required: false,
  error: ''
}
