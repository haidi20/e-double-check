import type { ChecklistAnswerTypesState } from '@/features/checklist/type/checklistTypes'

export const checklistAnswerTypeState: ChecklistAnswerTypesState = {
  modal: {
    isOpen: false,
    editingAnswerTypeId: null,
    formError: ''
  },
  answerTypes: [
    { id: 'at-text', label: 'Teks', kind: 'text', isSystem: true },
    { id: 'at-number', label: 'Angka', kind: 'number', isSystem: true },
    { id: 'at-boolean', label: 'Ya / Tidak', kind: 'boolean', isSystem: true },
    { id: 'at-time', label: 'Waktu', kind: 'time', isSystem: true }
  ]
}
