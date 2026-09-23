import type { PaymentsState } from '@/features/payments/type/paymentsTypes'

export const paymentsState: PaymentsState = {
  title: "Pembayaran",
  subtitle: "Pelunasan Transaksi",
  description: "Modul untuk mencatat pembayaran dan status tagihan.",
  usage: "Dipakai untuk memantau transaksi yang sudah lunas, belum lunas, atau perlu ditagih.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Catat pembayaran",
      description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
    },
    {
      title: "Pantau tagihan",
      description: "Melihat status lunas dan belum lunas."
    },
    {
      title: "Rekap pelunasan",
      description: "Membantu pengelola membuat laporan pembayaran."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "PEM-001",
      name: "Pembayaran 1",
      category: "Pelunasan Transaksi",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
    },
    {
      id: 2,
      code: "PEM-002",
      name: "Pembayaran 2",
      category: "Pelunasan Transaksi",
      owner: "Supervisor",
      status: "Diproses",
      description: "Melihat status lunas dan belum lunas."
    },
    {
      id: 3,
      code: "PEM-003",
      name: "Pembayaran 3",
      category: "Pelunasan Transaksi",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu pengelola membuat laporan pembayaran."
    },
    {
      id: 4,
      code: "PEM-004",
      name: "Pembayaran 4",
      category: "Pelunasan Transaksi",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
    },
    {
      id: 5,
      code: "PEM-005",
      name: "Pembayaran 5",
      category: "Pelunasan Transaksi",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Melihat status lunas dan belum lunas."
    },
    {
      id: 6,
      code: "PEM-006",
      name: "Pembayaran 6",
      category: "Pelunasan Transaksi",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Membantu pengelola membuat laporan pembayaran."
    },
    {
      id: 7,
      code: "PEM-007",
      name: "Pembayaran 7",
      category: "Pelunasan Transaksi",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
    },
    {
      id: 8,
      code: "PEM-008",
      name: "Pembayaran 8",
      category: "Pelunasan Transaksi",
      owner: "Supervisor",
      status: "Diproses",
      description: "Melihat status lunas dan belum lunas."
    },
    {
      id: 9,
      code: "PEM-009",
      name: "Pembayaran 9",
      category: "Pelunasan Transaksi",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu pengelola membuat laporan pembayaran."
    },
    {
      id: 10,
      code: "PEM-010",
      name: "Pembayaran 10",
      category: "Pelunasan Transaksi",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
    }
  ],
  view: {
    title: "Pembayaran",
    subtitle: "Pelunasan Transaksi",
    description: "Modul untuk mencatat pembayaran dan status tagihan.",
    usage: "Dipakai untuk memantau transaksi yang sudah lunas, belum lunas, atau perlu ditagih.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Catat pembayaran",
        description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
      },
      {
        title: "Pantau tagihan",
        description: "Melihat status lunas dan belum lunas."
      },
      {
        title: "Rekap pelunasan",
        description: "Membantu pengelola membuat laporan pembayaran."
      }
    ],
    mode: "operations",
    headingTitle: "Pembayaran",
    primaryActionLabel: "Buat Data Baru",
    dummyData: [
      {
        id: 1,
        code: "PEM-001",
        name: "Pembayaran 1",
        category: "Pelunasan Transaksi",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
      },
      {
        id: 2,
        code: "PEM-002",
        name: "Pembayaran 2",
        category: "Pelunasan Transaksi",
        owner: "Supervisor",
        status: "Belum lunas",
        description: "Melihat status lunas dan belum lunas."
      },
      {
        id: 3,
        code: "PEM-003",
        name: "Pembayaran 3",
        category: "Pelunasan Transaksi",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu pengelola membuat laporan pembayaran."
      },
      {
        id: 4,
        code: "PEM-004",
        name: "Pembayaran 4",
        category: "Pelunasan Transaksi",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
      },
      {
        id: 5,
        code: "PEM-005",
        name: "Pembayaran 5",
        category: "Pelunasan Transaksi",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Melihat status lunas dan belum lunas."
      },
      {
        id: 6,
        code: "PEM-006",
        name: "Pembayaran 6",
        category: "Pelunasan Transaksi",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Membantu pengelola membuat laporan pembayaran."
      },
      {
        id: 7,
        code: "PEM-007",
        name: "Pembayaran 7",
        category: "Pelunasan Transaksi",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
      },
      {
        id: 8,
        code: "PEM-008",
        name: "Pembayaran 8",
        category: "Pelunasan Transaksi",
        owner: "Supervisor",
        status: "Diproses",
        description: "Melihat status lunas dan belum lunas."
      },
      {
        id: 9,
        code: "PEM-009",
        name: "Pembayaran 9",
        category: "Pelunasan Transaksi",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu pengelola membuat laporan pembayaran."
      },
      {
        id: 10,
        code: "PEM-010",
        name: "Pembayaran 10",
        category: "Pelunasan Transaksi",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan pembayaran pelanggan atau transaksi terkait."
      }
    ],
    operationMetrics: [
      {
        label: "Tagihan Aktif",
        value: "70",
        trend: "+12%",
        icon: "PA",
        progress: 76,
        progressWidth: "76%"
      },
      {
        label: "Selesai Hari Ini",
        value: "30",
        trend: "+8%",
        icon: "SH",
        progress: 68,
        progressWidth: "68%"
      },
      {
        label: "Perlu Tindak Lanjut",
        value: "3",
        trend: "-3%",
        icon: "TL",
        progress: 34,
        progressWidth: "34%"
      }
    ],
    searchPlaceholder: "Cari data pembayaran",
    operationRows: [
      {
        code: "TRX-98234-JKT",
        primary: "Invoice PT Sinar Abadi",
        secondary: "Reguler",
        owner: "Budi Santoso",
        status: "Belum lunas",
        amount: "Rp24.500.000"
      },
      {
        code: "TRX-98235-MKS",
        primary: "CV Maju Bersama",
        secondary: "Prioritas",
        owner: "Siti Wahyuni",
        status: "Sebagian",
        amount: "Rp12.800.000"
      },
      {
        code: "TRX-98236-BPN",
        primary: "Toko Lautan Jaya",
        secondary: "Terjadwal",
        owner: "Andi Pratama",
        status: "Belum lunas",
        amount: "Rp8.250.000"
      },
      {
        code: "TRX-98237-SBY",
        primary: "PT Delta Niaga",
        secondary: "Ekonomi",
        owner: "Rina Melati",
        status: "Lunas",
        amount: "Rp17.600.000"
      },
      {
        code: "TRX-98238-BDG",
        primary: "UD Cipta Mandiri",
        secondary: "Reguler",
        owner: "Dewi Kartika",
        status: "Perlu verifikasi",
        amount: "Rp21.300.000"
      },
      {
        code: "TRX-98239-DPS",
        primary: "Bali Retail Group",
        secondary: "Prioritas",
        owner: "Fajar Nugroho",
        status: "Sebagian",
        amount: "Rp9.450.000"
      },
      {
        code: "TRX-98240-MDN",
        primary: "Invoice PT Medan Logistik",
        secondary: "Butuh verifikasi dokumen",
        owner: "Nadia Putri",
        status: "Perlu verifikasi",
        amount: "Rp32.100.000"
      },
      {
        code: "TRX-98241-SMR",
        primary: "CV Borneo Jaya",
        secondary: "Reguler",
        owner: "Raka Saputra",
        status: "Belum lunas",
        amount: "Rp14.750.000"
      },
      {
        code: "TRX-98242-PLM",
        primary: "Toko Sriwijaya",
        secondary: "Perlu tindak lanjut",
        owner: "Maya Lestari",
        status: "Jatuh tempo",
        amount: "Rp6.900.000"
      },
      {
        code: "TRX-98243-MDO",
        primary: "PT Celebes Utara",
        secondary: "Ekonomi",
        owner: "Agus Salim",
        status: "Lunas",
        amount: "Rp28.400.000"
      }
    ],
    formTitle: "Detail pembayaran",
    formSubtitle: "Pencatatan",
    formSubmitLabel: "Simpan Pembayaran",
    formSuccessMessage: "Pembayaran berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "invoiceNumber",
        label: "Nomor faktur",
        type: "text",
        value: "INV-98238-MKS",
        readonly: true
      },
      {
        id: "method",
        label: "Metode",
        type: "select",
        value: "Transfer Bank",
        options: ["Transfer Bank", "Tunai"]
      },
      {
        id: "paymentDate",
        label: "Tanggal bayar",
        type: "text",
        value: "26 Mei 2026"
      },
      {
        id: "note",
        label: "Catatan",
        type: "textarea",
        value: "Cocokkan nominal pembayaran dengan invoice pelanggan.",
        rows: 4,
        wide: true
      }
    ]
  }
}
