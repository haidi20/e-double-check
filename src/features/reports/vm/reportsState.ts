import { syncStateHmr } from '@/core/vm/registerStateHmr'
import type { ReportsState } from '@/features/reports/type/reportsTypes'

const reportItems = [
  {
    id: 1,
    code: 'LAP-001',
    name: 'Laporan barang yang paling banyak dipesan',
    category: 'Pesanan',
    owner: 'Owner',
    status: 'Aktif',
    description: 'Rekap ranking barang berdasarkan jumlah pesanan outlet.'
  },
  {
    id: 2,
    code: 'LAP-002',
    name: 'Laporan outlet yang sering pesan',
    category: 'Outlet',
    owner: 'Owner',
    status: 'Aktif',
    description: 'Rekap outlet dengan frekuensi pemesanan tertinggi.'
  },
  {
    id: 3,
    code: 'LAP-003',
    name: 'Laporan jumlah faktur pengiriman sebelum dan sesudah 2x24 jam',
    category: 'Faktur',
    owner: 'Owner',
    status: 'Aktif',
    description: 'Perbandingan faktur yang dikirim tepat waktu dan lewat batas 2x24 jam.'
  },
  {
    id: 4,
    code: 'LAP-004',
    name: 'Laporan stok barang',
    category: 'Stok',
    owner: 'Owner',
    status: 'Aktif',
    description: 'Monitoring stok barang saat ini dan kebutuhan restock.'
  },
  {
    id: 5,
    code: 'LAP-005',
    name: 'Laporan barang retur',
    category: 'Retur',
    owner: 'Owner',
    status: 'Aktif',
    description: 'Rekap barang retur berdasarkan nomor faktur, jumlah, dan catatan retur.'
  }
]

const reportActions = [
  {
    title: 'Laporan barang',
    description: 'Menampilkan barang yang paling banyak dipesan oleh outlet.'
  },
  {
    title: 'Laporan outlet',
    description: 'Menampilkan outlet yang paling sering melakukan pemesanan.'
  },
  {
    title: 'Laporan faktur',
    description: 'Membandingkan jumlah faktur pengiriman sebelum dan sesudah 2x24 jam.'
  }
]

const reportTabs = [
  {
    id: 'top-products',
    label: 'Barang Terbanyak',
    description: 'Laporan barang yang paling banyak dipesan oleh outlet.',
    rows: [
      {
        code: 'BRG-001',
        primary: 'Beras Premium 5 kg',
        secondary: 'Dipesan oleh 18 outlet',
        owner: 'Mei 2026',
        status: 'Teratas',
        amount: '428 item'
      },
      {
        code: 'BRG-002',
        primary: 'Minyak Goreng 1 liter',
        secondary: 'Dipesan oleh 15 outlet',
        owner: 'Mei 2026',
        status: 'Stabil',
        amount: '312 item'
      },
      {
        code: 'BRG-003',
        primary: 'Gula Pasir 1 kg',
        secondary: 'Dipesan oleh 14 outlet',
        owner: 'Mei 2026',
        status: 'Naik',
        amount: '286 item'
      }
    ]
  },
  {
    id: 'top-outlets',
    label: 'Outlet Sering Pesan',
    description: 'Laporan outlet yang paling sering melakukan pemesanan.',
    rows: [
      {
        code: 'OUT-001',
        primary: 'SBM Sudirman',
        secondary: 'Frekuensi pemesanan tertinggi',
        owner: 'Mei 2026',
        status: 'Aktif',
        amount: '42 pesanan'
      },
      {
        code: 'OUT-002',
        primary: 'SBM Dago Bandung',
        secondary: 'Pesanan reguler mingguan',
        owner: 'Mei 2026',
        status: 'Aktif',
        amount: '37 pesanan'
      },
      {
        code: 'OUT-003',
        primary: 'SBM Malioboro Yogyakarta',
        secondary: 'Pesanan bahan baku campuran',
        owner: 'Mei 2026',
        status: 'Aktif',
        amount: '31 pesanan'
      }
    ]
  },
  {
    id: 'invoice-timing',
    label: 'Faktur 2x24 Jam',
    description: 'Laporan jumlah faktur pengiriman sebelum dan sesudah 2x24 jam.',
    rows: [
      {
        code: 'FKT-001',
        primary: 'Faktur dikirim sebelum 2x24 jam',
        secondary: 'Pengiriman sesuai batas layanan',
        owner: 'Mei 2026',
        status: 'Sesuai',
        amount: '184 faktur'
      },
      {
        code: 'FKT-002',
        primary: 'Faktur dikirim sesudah 2x24 jam',
        secondary: 'Butuh evaluasi proses pengiriman',
        owner: 'Mei 2026',
        status: 'Perlu ditinjau',
        amount: '29 faktur'
      },
      {
        code: 'FKT-003',
        primary: 'Persentase ketepatan pengiriman',
        secondary: 'Dihitung dari total faktur terkirim',
        owner: 'Mei 2026',
        status: 'Sesuai target',
        amount: '86%'
      }
    ]
  },
  {
    id: 'stock',
    label: 'Stok Barang',
    description: 'Laporan posisi stok barang saat ini.',
    rows: [
      {
        code: 'STK-001',
        primary: 'Barang stok aman',
        secondary: 'Jumlah barang di atas ambang minimum',
        owner: 'Real-time',
        status: 'Aman',
        amount: '62 barang'
      },
      {
        code: 'STK-002',
        primary: 'Barang perlu restock',
        secondary: 'Jumlah barang di bawah ambang minimum',
        owner: 'Real-time',
        status: 'Perlu perhatian',
        amount: '12 barang'
      },
      {
        code: 'STK-003',
        primary: 'Barang kosong',
        secondary: 'Stok tidak tersedia untuk diproses',
        owner: 'Real-time',
        status: 'Kritis',
        amount: '3 barang'
      }
    ]
  },
  {
    id: 'returns',
    label: 'Barang Retur',
    description: 'Laporan barang retur berdasarkan nomor faktur, jumlah, dan catatan.',
    rows: [
      {
        code: 'RTR-001',
        primary: 'Retur barang rusak',
        secondary: 'Retur dicatat dari faktur outlet',
        owner: 'Mei 2026',
        status: 'Diproses',
        amount: '8 item'
      },
      {
        code: 'RTR-002',
        primary: 'Retur barang tidak sesuai',
        secondary: 'Selisih barang dengan faktur pengiriman',
        owner: 'Mei 2026',
        status: 'Diverifikasi',
        amount: '4 item'
      },
      {
        code: 'RTR-003',
        primary: 'Retur karena jumlah kurang',
        secondary: 'Catatan retur dari outlet tujuan',
        owner: 'Mei 2026',
        status: 'Selesai',
        amount: '2 item'
      }
    ]
  }
]

export const reportsState: ReportsState = {
  title: 'Laporan',
  subtitle: 'Laporan Owner',
  description: 'Modul untuk melihat laporan operasional distribusi yang dibutuhkan owner.',
  usage: 'Dipakai untuk memantau pesanan, outlet, faktur pengiriman, stok barang, dan retur.',
  status: 'Status: siap dikembangkan.',
  actions: reportActions,
  dummyData: reportItems,
  view: {
    title: 'Laporan',
    subtitle: 'Laporan Owner',
    description: 'Daftar laporan operasional yang dapat dilihat owner untuk memantau distribusi SBM.',
    usage: 'Dipakai untuk evaluasi pesanan, outlet, faktur, stok, dan retur.',
    status: 'Status: siap dikembangkan.',
    actions: reportActions,
    mode: 'operations',
    headingTitle: 'Laporan',
    primaryActionLabel: 'Ekspor Laporan',
    dummyData: reportItems,
    operationMetrics: [
      {
        label: 'Total Laporan',
        value: '5',
        trend: 'Owner',
        icon: 'LO',
        progress: 100,
        progressWidth: '100%'
      },
      {
        label: 'Laporan Operasional',
        value: '3',
        trend: 'Pesanan',
        icon: 'OP',
        progress: 60,
        progressWidth: '60%'
      },
      {
        label: 'Laporan Kontrol',
        value: '2',
        trend: 'Stok & retur',
        icon: 'KR',
        progress: 40,
        progressWidth: '40%'
      }
    ],
    searchPlaceholder: 'Cari laporan owner',
    activeTabId: reportTabs[0].id,
    tabs: reportTabs,
    operationRows: [
      {
        code: 'LAP-001',
        primary: 'Laporan barang yang paling banyak dipesan',
        secondary: 'Ranking barang berdasarkan jumlah pesanan outlet',
        owner: 'Harian / bulanan',
        status: 'Aktif',
        amount: 'Top barang'
      },
      {
        code: 'LAP-002',
        primary: 'Laporan outlet yang sering pesan',
        secondary: 'Frekuensi pemesanan setiap outlet',
        owner: 'Harian / bulanan',
        status: 'Aktif',
        amount: 'Top outlet'
      },
      {
        code: 'LAP-003',
        primary: 'Laporan jumlah faktur pengiriman sebelum dan sesudah 2x24 jam',
        secondary: 'Monitoring ketepatan waktu pengiriman berdasarkan faktur',
        owner: 'Per periode',
        status: 'Aktif',
        amount: 'Tepat waktu'
      },
      {
        code: 'LAP-004',
        primary: 'Laporan stok barang',
        secondary: 'Posisi stok barang saat ini dan kebutuhan restock',
        owner: 'Real-time',
        status: 'Aktif',
        amount: 'Stok'
      },
      {
        code: 'LAP-005',
        primary: 'Laporan barang retur',
        secondary: 'Barang retur berdasarkan nomor faktur, jumlah, dan catatan',
        owner: 'Per periode',
        status: 'Aktif',
        amount: 'Retur'
      }
    ],
    formTitle: 'Ekspor laporan owner',
    formSubtitle: 'Laporan',
    formSubmitLabel: 'Ekspor Laporan',
    formSuccessMessage: 'Permintaan ekspor laporan owner berhasil dibuat.',
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: 'period',
        label: 'Periode',
        type: 'text',
        value: 'Mei 2026'
      },
      {
        id: 'reportType',
        label: 'Jenis laporan',
        type: 'select',
        value: 'Laporan barang yang paling banyak dipesan',
        options: reportItems.map((item) => item.name)
      },
      {
        id: 'format',
        label: 'Format',
        type: 'select',
        value: 'PDF',
        options: ['PDF', 'Excel', 'CSV']
      },
      {
        id: 'note',
        label: 'Catatan',
        type: 'textarea',
        value: 'Laporan digunakan untuk evaluasi owner.',
        rows: 4,
        wide: true
      }
    ]
  }
}


if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    syncStateHmr('reportsState', module, 'reportsState')
  })
}

