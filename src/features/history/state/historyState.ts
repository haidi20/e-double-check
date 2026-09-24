import type { HistoryState } from '@/features/history/type/historyTypes'

export const historyState: HistoryState = {
  view: {
    eyebrow: 'Aktivitas Shift',
    title: 'Riwayat Checklist',
    description: 'Lacak checklist shift sebelumnya dan item yang sudah selesai.',
    activeFilter: 'all',
    filters: [
      { id: 'all', label: 'Semua' },
      { id: 'running', label: 'Berjalan' },
      { id: 'completed', label: 'Selesai' }
    ],
    emptyTitle: 'Belum ada riwayat',
    emptyDescription: 'Riwayat checklist akan muncul setelah shift dimulai.'
  },
  items: [
    {
      id: 'history-01',
      dateLabel: '24 September 2026',
      shiftLabel: 'Shift Siang',
      outletName: 'Warung Pusat',
      completedCount: 48,
      totalCount: 48,
      status: 'completed',
      statusLabel: 'Selesai'
    },
    {
      id: 'history-02',
      dateLabel: '23 September 2026',
      shiftLabel: 'Shift Sore',
      outletName: 'Warung Pusat',
      completedCount: 41,
      totalCount: 48,
      status: 'completed',
      statusLabel: 'Selesai'
    },
    {
      id: 'history-03',
      dateLabel: '22 September 2026',
      shiftLabel: 'Shift Pagi',
      outletName: 'Warung Pusat',
      completedCount: 24,
      totalCount: 48,
      status: 'running',
      statusLabel: 'Berjalan'
    }
  ]
}
