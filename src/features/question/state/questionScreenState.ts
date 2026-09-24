import type { QuestionScreenState } from '@/features/question/type/questionTypes'

export const questionScreenState: QuestionScreenState = {
  ariaLabel: 'Halaman pertanyaan',
  title: 'Daftar Pertanyaan',
  subtitle: 'Semua kategori dan pertanyaan tampil dalam satu halaman.',
  sectionLabel: 'Semua Kategori & Pertanyaan',
  searchPlaceholder: 'Cari pertanyaan...',
  emptyQuestionTitle: 'Belum ada pertanyaan',
  emptyQuestionDescription: 'Coba kata kunci lain.',
  emptyTitle: 'Kategori belum tersedia',
  emptyDescription: 'Tambahkan kategori checklist terlebih dahulu.',
  isHelperModalOpen: false,
  helperSearchTerm: '',
  searchTerm: '',
  workDate: new Date().toISOString().slice(0, 10),
  answers: {},
  savedQuestionIds: []
}
