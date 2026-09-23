import type { MatrixKpiState } from '@/features/matrix-kpi/type/matrixKpiTypes'

const actions = [
  {
    title: 'Pesanan',
    description: 'Memantau jumlah pesanan yang sedang diproses.'
  },
  {
    title: 'Faktur',
    description: 'Memantau ketepatan waktu faktur dan pengiriman.'
  },
  {
    title: 'Retur',
    description: 'Memantau jumlah barang retur per periode.'
  }
]

const invoiceTabs = [
  {
    id: 'before',
    label: 'Faktur Sebelum Batas Waktu',
    description: 'Daftar faktur yang pengirimannya selesai sebelum batas waktu KPI.',
    rows: [
      {
        invoiceNo: 'INV-2026-0018',
        outletName: 'SBM Sudirman',
        issuedAt: '28 Mei 2026 08:12',
        deliveredAt: '29 Mei 2026 14:20',
        duration: '30 jam 8 menit',
        status: 'Tepat waktu'
      },
      {
        invoiceNo: 'INV-2026-0021',
        outletName: 'SBM Dago Bandung',
        issuedAt: '28 Mei 2026 09:05',
        deliveredAt: '30 Mei 2026 07:30',
        duration: '46 jam 25 menit',
        status: 'Tepat waktu'
      },
      {
        invoiceNo: 'INV-2026-0024',
        outletName: 'SBM Tunjungan Surabaya',
        issuedAt: '28 Mei 2026 10:40',
        deliveredAt: '29 Mei 2026 18:05',
        duration: '31 jam 25 menit',
        status: 'Tepat waktu'
      }
    ]
  },
  {
    id: 'after',
    label: 'Faktur Sesudah Batas Waktu',
    description: 'Daftar faktur yang pengirimannya melewati batas waktu KPI.',
    rows: [
      {
        invoiceNo: 'INV-2026-0019',
        outletName: 'SBM Malioboro Yogyakarta',
        issuedAt: '27 Mei 2026 11:10',
        deliveredAt: '30 Mei 2026 13:45',
        duration: '74 jam 35 menit',
        status: 'Lewat batas'
      },
      {
        invoiceNo: 'INV-2026-0027',
        outletName: 'SBM Kuta Bali',
        issuedAt: '27 Mei 2026 15:00',
        deliveredAt: '30 Mei 2026 17:15',
        duration: '74 jam 15 menit',
        status: 'Lewat batas'
      }
    ]
  }
] as const

export const matrixKpiState: MatrixKpiState = {
  title: 'Metrik KPI',
  subtitle: 'Operasional',
  description: 'Ringkasan indikator performa distribusi, faktur, stok, dan retur untuk pemantauan owner.',
  usage: 'Dipakai untuk melihat performa operasional secara cepat sebelum membuka laporan detail.',
  status: 'Status: siap dikembangkan.',
  actions,
  view: {
    title: 'Metrik KPI',
    subtitle: 'Operasional',
    description: 'Ringkasan indikator performa distribusi, faktur, stok, dan retur untuk pemantauan owner.',
    usage: 'Dipakai untuk melihat performa operasional secara cepat sebelum membuka laporan detail.',
    status: 'Status: siap dikembangkan.',
    actions,
    mode: 'kpi',
    headingTitle: 'Metrik KPI',
    primaryActionLabel: 'Atur KPI',
    slaDays: 2,
    slaHours: 24,
    activeInvoiceTabId: 'before',
    metrics: [
      {
        label: 'Pesanan diproses',
        value: '128',
        trend: '+12%',
        icon: 'PO',
        progress: 78,
        progressWidth: '78%'
      },
      {
        label: 'Faktur tepat waktu',
        value: '91%',
        trend: '+6%',
        icon: 'FT',
        progress: 91,
        progressWidth: '91%'
      },
      {
        label: 'Pengiriman <= 2x24 jam',
        value: '86%',
        trend: '+4%',
        icon: 'SJ',
        progress: 86,
        progressWidth: '86%'
      },
      {
        label: 'Retur barang',
        value: '14',
        trend: '-8%',
        icon: 'RT',
        progress: 28,
        progressWidth: '28%'
      }
    ],
    rows: [
      {
        code: 'KPI-001',
        name: 'Barang paling banyak dipesan',
        target: 'Top 10 barang',
        realization: 'Beras Premium 5 kg',
        status: 'Terpantau'
      },
      {
        code: 'KPI-002',
        name: 'Outlet paling sering pesan',
        target: 'Top 10 outlet',
        realization: 'SBM Sudirman',
        status: 'Terpantau'
      },
      {
        code: 'KPI-003',
        name: 'Faktur sebelum dan sesudah 2x24 jam',
        target: 'Minimal 85%',
        realization: '86%',
        status: 'Sesuai target'
      },
      {
        code: 'KPI-004',
        name: 'Stok barang',
        target: 'Stok aman',
        realization: '12 item perlu restock',
        status: 'Perlu perhatian'
      },
      {
        code: 'KPI-005',
        name: 'Barang retur',
        target: 'Retur rendah',
        realization: '14 retur bulan ini',
        status: 'Dipantau'
      }
    ],
    invoiceTabs: invoiceTabs.map((tab) => ({
      ...tab,
      rows: [...tab.rows]
    })),
    tableEyebrow: 'Matrix KPI',
    tableTitle: 'Faktur Pengiriman',
    tableStatus: 'Update harian',
    formTitle: 'Pengaturan KPI',
    formSubtitle: 'Batas Waktu Faktur',
    formSubmitLabel: 'Simpan Pengaturan',
    formSuccessMessage: 'Pengaturan batas waktu KPI berhasil diperbarui.',
    isFormModalOpen: false,
    isFormSubmitted: false
  }
}
