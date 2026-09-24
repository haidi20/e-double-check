export interface QuestionScreenState {
  ariaLabel: string
  title: string
  subtitle: string
  sectionLabel: string
  searchPlaceholder: string
  emptyQuestionTitle: string
  emptyQuestionDescription: string
  emptyTitle: string
  emptyDescription: string
  isHelperModalOpen: boolean
  helperSearchTerm: string
  searchTerm: string
  workDate: string
  answers: Record<string, string | number | boolean>
  savedQuestionIds: string[]
}
