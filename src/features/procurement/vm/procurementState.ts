import { syncStateHmr } from '@/core/vm/registerStateHmr'
import type { ProcurementState } from '@/features/procurement/type/procurementTypes'

export const procurementState: ProcurementState = {
  title: "Pengadaan",
  subtitle: "Pembelian Barang",
  description: "Modul untuk mengatur pesanan pembelian dan pengadaan barang dari pemasok.",
  usage: "Dipakai saat perusahaan perlu membeli barang agar stok tersedia untuk dijual atau didistribusikan.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Pesanan pembelian",
      description: "Membuat permintaan pembelian barang ke pemasok."
    },
    {
      title: "Penerimaan barang",
      description: "Mencatat barang yang datang dari pemasok."
    },
    {
      title: "Tagihan pemasok",
      description: "Menjadi dasar pencatatan pembayaran ke pemasok."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "PEN-001",
      name: "Pengadaan 1",
      category: "Pembelian Barang",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Membuat permintaan pembelian barang ke pemasok."
    },
    {
      id: 2,
      code: "PEN-002",
      name: "Pengadaan 2",
      category: "Pembelian Barang",
      owner: "Supervisor",
      status: "Diproses",
      description: "Mencatat barang yang datang dari pemasok."
    },
    {
      id: 3,
      code: "PEN-003",
      name: "Pengadaan 3",
      category: "Pembelian Barang",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Menjadi dasar pencatatan pembayaran ke pemasok."
    },
    {
      id: 4,
      code: "PEN-004",
      name: "Pengadaan 4",
      category: "Pembelian Barang",
      owner: "Supervisor",
      status: "Aktif",
      description: "Membuat permintaan pembelian barang ke pemasok."
    },
    {
      id: 5,
      code: "PEN-005",
      name: "Pengadaan 5",
      category: "Pembelian Barang",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Mencatat barang yang datang dari pemasok."
    },
    {
      id: 6,
      code: "PEN-006",
      name: "Pengadaan 6",
      category: "Pembelian Barang",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Menjadi dasar pencatatan pembayaran ke pemasok."
    },
    {
      id: 7,
      code: "PEN-007",
      name: "Pengadaan 7",
      category: "Pembelian Barang",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Membuat permintaan pembelian barang ke pemasok."
    },
    {
      id: 8,
      code: "PEN-008",
      name: "Pengadaan 8",
      category: "Pembelian Barang",
      owner: "Supervisor",
      status: "Diproses",
      description: "Mencatat barang yang datang dari pemasok."
    },
    {
      id: 9,
      code: "PEN-009",
      name: "Pengadaan 9",
      category: "Pembelian Barang",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Menjadi dasar pencatatan pembayaran ke pemasok."
    },
    {
      id: 10,
      code: "PEN-010",
      name: "Pengadaan 10",
      category: "Pembelian Barang",
      owner: "Supervisor",
      status: "Aktif",
      description: "Membuat permintaan pembelian barang ke pemasok."
    }
  ],
  view: {
    title: "Pengadaan",
    subtitle: "Pembelian Barang",
    description: "Modul untuk mengatur pesanan pembelian dan pengadaan barang dari pemasok.",
    usage: "Dipakai saat perusahaan perlu membeli barang agar stok tersedia untuk dijual atau didistribusikan.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Pesanan pembelian",
        description: "Membuat permintaan pembelian barang ke pemasok."
      },
      {
        title: "Penerimaan barang",
        description: "Mencatat barang yang datang dari pemasok."
      },
      {
        title: "Tagihan pemasok",
        description: "Menjadi dasar pencatatan pembayaran ke pemasok."
      }
    ],
    mode: "operations",
    headingTitle: "Pengadaan",
    primaryActionLabel: "Buat Data Baru",
    dummyData: [
      {
        id: 1,
        code: "PEN-001",
        name: "Pengadaan 1",
        category: "Pembelian Barang",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Membuat permintaan pembelian barang ke pemasok."
      },
      {
        id: 2,
        code: "PEN-002",
        name: "Pengadaan 2",
        category: "Pembelian Barang",
        owner: "Supervisor",
        status: "Diproses",
        description: "Mencatat barang yang datang dari pemasok."
      },
      {
        id: 3,
        code: "PEN-003",
        name: "Pengadaan 3",
        category: "Pembelian Barang",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Menjadi dasar pencatatan pembayaran ke pemasok."
      },
      {
        id: 4,
        code: "PEN-004",
        name: "Pengadaan 4",
        category: "Pembelian Barang",
        owner: "Supervisor",
        status: "Aktif",
        description: "Membuat permintaan pembelian barang ke pemasok."
      },
      {
        id: 5,
        code: "PEN-005",
        name: "Pengadaan 5",
        category: "Pembelian Barang",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Mencatat barang yang datang dari pemasok."
      },
      {
        id: 6,
        code: "PEN-006",
        name: "Pengadaan 6",
        category: "Pembelian Barang",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Menjadi dasar pencatatan pembayaran ke pemasok."
      },
      {
        id: 7,
        code: "PEN-007",
        name: "Pengadaan 7",
        category: "Pembelian Barang",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Membuat permintaan pembelian barang ke pemasok."
      },
      {
        id: 8,
        code: "PEN-008",
        name: "Pengadaan 8",
        category: "Pembelian Barang",
        owner: "Supervisor",
        status: "Diproses",
        description: "Mencatat barang yang datang dari pemasok."
      },
      {
        id: 9,
        code: "PEN-009",
        name: "Pengadaan 9",
        category: "Pembelian Barang",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Menjadi dasar pencatatan pembayaran ke pemasok."
      },
      {
        id: 10,
        code: "PEN-010",
        name: "Pengadaan 10",
        category: "Pembelian Barang",
        owner: "Supervisor",
        status: "Aktif",
        description: "Membuat permintaan pembelian barang ke pemasok."
      }
    ],
    operationMetrics: [
      {
        label: "Pesanan Aktif",
        value: "121",
        trend: "+12%",
        icon: "PA",
        progress: 76,
        progressWidth: "76%"
      },
      {
        label: "Selesai Hari Ini",
        value: "41",
        trend: "+8%",
        icon: "SH",
        progress: 68,
        progressWidth: "68%"
      },
      {
        label: "Perlu Tindak Lanjut",
        value: "10",
        trend: "-3%",
        icon: "TL",
        progress: 34,
        progressWidth: "34%"
      }
    ],
    searchPlaceholder: "Cari data pengadaan",
    operationRows: [
      {
        code: "TRX-98234-JKT",
        primary: "PT Sinar Abadi",
        secondary: "Reguler",
        owner: "Budi Santoso",
        status: "Diproses",
        amount: "24 koli"
      },
      {
        code: "TRX-98235-MKS",
        primary: "PO-778 Pemasok Utama",
        secondary: "Prioritas",
        owner: "Siti Wahyuni",
        status: "Dalam perjalanan",
        amount: "12 koli"
      },
      {
        code: "TRX-98236-BPN",
        primary: "Toko Lautan Jaya",
        secondary: "Terjadwal",
        owner: "Andi Pratama",
        status: "Menunggu jadwal",
        amount: "8 koli"
      },
      {
        code: "TRX-98237-SBY",
        primary: "PT Delta Niaga",
        secondary: "Ekonomi",
        owner: "Rina Melati",
        status: "Selesai",
        amount: "18 koli"
      },
      {
        code: "TRX-98238-BDG",
        primary: "PO-779 Sentra Material",
        secondary: "Reguler",
        owner: "Dewi Kartika",
        status: "Diproses",
        amount: "31 koli"
      },
      {
        code: "TRX-98239-DPS",
        primary: "Bali Retail Group",
        secondary: "Prioritas",
        owner: "Fajar Nugroho",
        status: "Dalam perjalanan",
        amount: "15 koli"
      },
      {
        code: "TRX-98240-MDN",
        primary: "PT Medan Logistik",
        secondary: "Butuh verifikasi dokumen",
        owner: "Nadia Putri",
        status: "Menunggu dokumen",
        amount: "20 koli"
      },
      {
        code: "TRX-98241-SMR",
        primary: "CV Borneo Jaya",
        secondary: "Reguler",
        owner: "Raka Saputra",
        status: "Diproses",
        amount: "11 koli"
      },
      {
        code: "TRX-98242-PLM",
        primary: "Toko Sriwijaya",
        secondary: "Perlu tindak lanjut",
        owner: "Maya Lestari",
        status: "Tertunda",
        amount: "9 koli"
      },
      {
        code: "TRX-98243-MDO",
        primary: "PO-780 Gudang Utara",
        secondary: "Ekonomi",
        owner: "Agus Salim",
        status: "Selesai",
        amount: "27 koli"
      }
    ],
    formTitle: "Detail pengadaan",
    formSubtitle: "Formulir Cepat",
    formSubmitLabel: "Simpan Data",
    formSuccessMessage: "Data pengadaan berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "transactionNumber",
        label: "Nomor transaksi",
        type: "text",
        value: "TRX-98238-MKS",
        readonly: true
      },
      {
        id: "customer",
        label: "Pelanggan",
        type: "select",
        value: "PT Sinar Abadi",
        options: ["PT Sinar Abadi", "CV Maju Bersama"]
      },
      {
        id: "schedule",
        label: "Jadwal",
        type: "text",
        value: "26 Mei 2026"
      },
      {
        id: "note",
        label: "Catatan",
        type: "textarea",
        value: "Pastikan dokumen dan barang sudah diverifikasi sebelum diproses.",
        rows: 4,
        wide: true
      }
    ]
  }
}


if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    syncStateHmr('procurementState', module, 'procurementState')
  })
}

