import { syncStateHmr } from '@/core/vm/registerStateHmr'
import type { DashboardState } from '@/features/dashboard/type/dashboardTypes'

export const dashboardState: DashboardState = {
  title: "Halaman Utama",
  subtitle: "Ringkasan Operasional",
  description: "Modul untuk menampilkan kondisi utama aplikasi Checklist Anti-Ketinggalan.",
  usage: "Dipakai sebagai halaman awal agar pengguna cepat melihat pesanan, stok, pengiriman, dan pembayaran.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Ringkasan data",
      description: "Menampilkan angka penting dari proses distribusi."
    },
    {
      title: "Pantauan aktivitas",
      description: "Membantu pengguna melihat proses yang perlu ditindaklanjuti."
    },
    {
      title: "Navigasi cepat",
      description: "Menjadi pintu masuk ke modul operasional lain."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "DAS-001",
      name: "Dasbor 1",
      category: "Ringkasan Operasional",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menampilkan angka penting dari proses distribusi."
    },
    {
      id: 2,
      code: "DAS-002",
      name: "Dasbor 2",
      category: "Ringkasan Operasional",
      owner: "Supervisor",
      status: "Diproses",
      description: "Membantu pengguna melihat proses yang perlu ditindaklanjuti."
    },
    {
      id: 3,
      code: "DAS-003",
      name: "Dasbor 3",
      category: "Ringkasan Operasional",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Menjadi pintu masuk ke modul operasional lain."
    },
    {
      id: 4,
      code: "DAS-004",
      name: "Dasbor 4",
      category: "Ringkasan Operasional",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menampilkan angka penting dari proses distribusi."
    },
    {
      id: 5,
      code: "DAS-005",
      name: "Dasbor 5",
      category: "Ringkasan Operasional",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Membantu pengguna melihat proses yang perlu ditindaklanjuti."
    },
    {
      id: 6,
      code: "DAS-006",
      name: "Dasbor 6",
      category: "Ringkasan Operasional",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Menjadi pintu masuk ke modul operasional lain."
    },
    {
      id: 7,
      code: "DAS-007",
      name: "Dasbor 7",
      category: "Ringkasan Operasional",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menampilkan angka penting dari proses distribusi."
    },
    {
      id: 8,
      code: "DAS-008",
      name: "Dasbor 8",
      category: "Ringkasan Operasional",
      owner: "Supervisor",
      status: "Diproses",
      description: "Membantu pengguna melihat proses yang perlu ditindaklanjuti."
    },
    {
      id: 9,
      code: "DAS-009",
      name: "Dasbor 9",
      category: "Ringkasan Operasional",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Menjadi pintu masuk ke modul operasional lain."
    },
    {
      id: 10,
      code: "DAS-010",
      name: "Dasbor 10",
      category: "Ringkasan Operasional",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menampilkan angka penting dari proses distribusi."
    }
  ],
  view: {
    title: "Halaman Utama",
    subtitle: "Ringkasan Operasional",
    description: "Modul untuk menampilkan kondisi utama aplikasi Checklist Anti-Ketinggalan.",
    usage: "Dipakai sebagai halaman awal agar pengguna cepat melihat pesanan, stok, pengiriman, dan pembayaran.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Ringkasan data",
        description: "Menampilkan angka penting dari proses distribusi."
      },
      {
        title: "Pantauan aktivitas",
        description: "Membantu pengguna melihat proses yang perlu ditindaklanjuti."
      },
      {
        title: "Navigasi cepat",
        description: "Menjadi pintu masuk ke modul operasional lain."
      }
    ],
    mode: "dashboard",
    headingTitle: "Halaman Utama",
    primaryActionLabel: "Pesanan Kerja Baru",
    chartEyebrow: "Aktivitas checklist",
    chartTitle: "Progres checklist 7 hari terakhir",
    chartStatus: "Berjalan",
    deliveryOrderEyebrow: "Surat Jalan",
    deliveryOrderTitle: "Surat jalan hari ini",
    dummyData: [
      {
        id: 1,
        code: "DAS-001",
        name: "Dasbor 1",
        category: "Ringkasan Operasional",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menampilkan angka penting dari proses distribusi."
      },
      {
        id: 2,
        code: "DAS-002",
        name: "Dasbor 2",
        category: "Ringkasan Operasional",
        owner: "Supervisor",
        status: "Diproses",
        description: "Membantu pengguna melihat proses yang perlu ditindaklanjuti."
      },
      {
        id: 3,
        code: "DAS-003",
        name: "Dasbor 3",
        category: "Ringkasan Operasional",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Menjadi pintu masuk ke modul operasional lain."
      },
      {
        id: 4,
        code: "DAS-004",
        name: "Dasbor 4",
        category: "Ringkasan Operasional",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menampilkan angka penting dari proses distribusi."
      },
      {
        id: 5,
        code: "DAS-005",
        name: "Dasbor 5",
        category: "Ringkasan Operasional",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Membantu pengguna melihat proses yang perlu ditindaklanjuti."
      },
      {
        id: 6,
        code: "DAS-006",
        name: "Dasbor 6",
        category: "Ringkasan Operasional",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Menjadi pintu masuk ke modul operasional lain."
      },
      {
        id: 7,
        code: "DAS-007",
        name: "Dasbor 7",
        category: "Ringkasan Operasional",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menampilkan angka penting dari proses distribusi."
      },
      {
        id: 8,
        code: "DAS-008",
        name: "Dasbor 8",
        category: "Ringkasan Operasional",
        owner: "Supervisor",
        status: "Diproses",
        description: "Membantu pengguna melihat proses yang perlu ditindaklanjuti."
      },
      {
        id: 9,
        code: "DAS-009",
        name: "Dasbor 9",
        category: "Ringkasan Operasional",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Menjadi pintu masuk ke modul operasional lain."
      },
      {
        id: 10,
        code: "DAS-010",
        name: "Dasbor 10",
        category: "Ringkasan Operasional",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menampilkan angka penting dari proses distribusi."
      }
    ],
    dashboardMetrics: [
      {
        label: "Sesi checklist aktif",
        value: "12",
        trend: "+3 hari ini",
        icon: "SC",
        progress: 75,
        progressWidth: "75%"
      },
      {
        label: "Checklist selesai",
        value: "86%",
        trend: "+8% minggu ini",
        icon: "✓",
        progress: 86,
        progressWidth: "86%"
      },
      {
        label: "Insiden terbuka",
        value: "4",
        trend: "2 perlu tindak lanjut",
        icon: "IN",
        progress: 35,
        progressWidth: "35%"
      },
      {
        label: "Outlet aktif",
        value: "8",
        trend: "Semua terpantau",
        icon: "OT",
        progress: 100,
        progressWidth: "100%"
      }
    ],
    trendItems: [
      {
        id: "rabu-lalu",
        label: "Rab",
        value: 42
      },
      {
        id: "kamis-lalu",
        label: "Kam",
        value: 58
      },
      {
        id: "jumat-lalu",
        label: "Jum",
        value: 46
      },
      {
        id: "sabtu-lalu",
        label: "Sab",
        value: 70
      },
      {
        id: "minggu-lalu",
        label: "Min",
        value: 64
      },
      {
        id: "senin-kemarin",
        label: "Sen",
        value: 86
      },
      {
        id: "hari-ini",
        label: "Hari ini",
        value: 92
      }
    ],
    dashboardOrders: [
      {
        code: "TRX-98234-JKT",
        primary: "PT Sinar Abadi",
        secondary: "Jakarta Timur",
        owner: "Budi Santoso",
        status: "Diproses",
        amount: "24 koli"
      },
      {
        code: "TRX-98235-MKS",
        primary: "CV Maju Bersama",
        secondary: "Makassar",
        owner: "Siti Wahyuni",
        status: "Dalam perjalanan",
        amount: "12 koli"
      },
      {
        code: "TRX-98236-BPN",
        primary: "Toko Lautan Jaya",
        secondary: "Balikpapan",
        owner: "Andi Pratama",
        status: "Menunggu jadwal",
        amount: "8 koli"
      },
      {
        code: "TRX-98237-SBY",
        primary: "PT Delta Niaga",
        secondary: "Surabaya",
        owner: "Rina Melati",
        status: "Selesai",
        amount: "18 koli"
      },
      {
        code: "TRX-98238-BDG",
        primary: "UD Cipta Mandiri",
        secondary: "Bandung",
        owner: "Dewi Kartika",
        status: "Diproses",
        amount: "31 koli"
      },
      {
        code: "TRX-98239-DPS",
        primary: "Bali Retail Group",
        secondary: "Denpasar",
        owner: "Fajar Nugroho",
        status: "Dalam perjalanan",
        amount: "15 koli"
      },
      {
        code: "TRX-98240-MDN",
        primary: "PT Medan Logistik",
        secondary: "Medan",
        owner: "Nadia Putri",
        status: "Menunggu dokumen",
        amount: "20 koli"
      },
      {
        code: "TRX-98241-SMR",
        primary: "CV Borneo Jaya",
        secondary: "Samarinda",
        owner: "Raka Saputra",
        status: "Diproses",
        amount: "11 koli"
      },
      {
        code: "TRX-98242-PLM",
        primary: "Toko Sriwijaya",
        secondary: "Palembang",
        owner: "Maya Lestari",
        status: "Tertunda",
        amount: "9 koli"
      },
      {
        code: "TRX-98243-MDO",
        primary: "PT Celebes Utara",
        secondary: "Manado",
        owner: "Agus Salim",
        status: "Selesai",
        amount: "27 koli"
      }
    ],
    dashboardActivities: [
      {
        id: "activity-session-1",
        title: "Sesi pagi Outlet Panakkukang",
        description: "Persiapan shift sedang diisi oleh Andi Pratama.",
        dateLabel: "Hari ini, 07:15",
        valueLabel: "68%",
        valueClass: "status-pill"
      },
      {
        id: "activity-incident-1",
        title: "Insiden pesanan tidak lengkap",
        description: "Sambal matah belum tercatat pada pesanan TA-1042.",
        dateLabel: "Hari ini, 10:42",
        valueLabel: "Perlu tindak lanjut",
        valueClass: "status-pill status-pill--warning"
      },
      {
        id: "activity-session-2",
        title: "Penutupan shift malam",
        description: "Menunggu pemeriksaan akhir dari kapten outlet.",
        dateLabel: "Kemarin, 22:10",
        valueLabel: "Menunggu",
        valueClass: "status-pill"
      }
    ],    formTitle: "Pesanan kerja baru",
    formSubtitle: "Formulir Cepat",
    formSubmitLabel: "Simpan Pesanan Kerja",
    formSuccessMessage: "Pesanan kerja berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "orderNumber",
        label: "Nomor pesanan",
        type: "text",
        value: "PSN-250526-011",
        readonly: true
      },
      {
        id: "customer",
        label: "Pelanggan",
        type: "select",
        value: "PT Sinar Abadi",
        options: ["PT Sinar Abadi", "CV Maju Bersama", "Toko Lautan Jaya"]
      },
      {
        id: "owner",
        label: "Penanggung jawab",
        type: "select",
        value: "Budi Santoso",
        options: ["Budi Santoso", "Siti Wahyuni", "Andi Pratama"]
      },
      {
        id: "note",
        label: "Catatan",
        type: "textarea",
        value: "Pesanan kerja dibuat dari dashboard untuk diproses.",
        rows: 4,
        wide: true
      }
    ],
    profileInitials: "HN",
    profileName: "HAIDI NURHADINATA",
    profilePoints: "105 livin' poin",
    accountCategories: [
      { id: "savings", label: "Tabungan", icon: "Rp" },
      { id: "deposit", label: "Deposito", icon: "o" },
      { id: "credit-card", label: "Kartu Kredit", icon: "=" },
      { id: "loan", label: "Pinjaman", icon: "%" },
      { id: "investment", label: "Investasi", icon: "I" },
    ],
    activeAccountCategoryId: "savings",
    accountName: "Tabungan Mandiri",
    accountBalance: "Rp *****",
    isBalanceVisible: false,
    favoriteItems: [
      { id: "dashboard", label: "Dashboard", icon: "H", routePath: "/dashboard" },
      { id: "questions", label: "Daftar Pertanyaan", icon: "?", routePath: "/checklist" },
      { id: "services", label: "Layanan", icon: "L", routePath: "/layanan" },
      { id: "outlets", label: "Warung", icon: "O", routePath: "/outlets" },
      { id: "employees", label: "Pegawai", icon: "P", routePath: "/employees" }
    ],
    quickActions: [
      { id: "questions", label: "Daftar Pertanyaan", routePath: "/checklist", icon: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" },
      { id: "history", label: "Riwayat", routePath: "/reports", icon: "M4 5h16v14H4zM8 3v4M16 3v4M7 11h3M14 11h3M7 15h3" }
    ],
    bottomItems: [
      { id: "home", label: "Beranda", routePath: "/dashboard", icon: "M3 10 12 3l9 7v10H3V10Zm6 10v-6h6v6" },
      { id: "products", label: "Produk Anda", routePath: "/products", icon: "M4 8h16v12H4zM7 8V6a5 5 0 0 1 10 0v2M8 13h8" },
      { id: "favorite", label: "Sukha", routePath: "/roles", icon: "M12 21s-7-4.4-9-9.2C1.5 8.2 3.7 5 7 5c2 0 3.4 1.1 5 2.8C13.6 6.1 15 5 17 5c3.3 0 5.5 3.2 4 6.8C19 16.6 12 21 12 21Z" },
      { id: "loyalty", label: "Loyalty", routePath: "/reports", icon: "M4 17a8 8 0 1 1 16 0M7 17a5 5 0 1 1 10 0M10 17a2 2 0 1 1 4 0" }
    ],
    activeBottomItemId: "home",
    promoLabel: "Baru! Belanja di mana saja tinggal tap HP"
  }
}


if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    syncStateHmr('dashboardState', module, 'dashboardState')
  })
}

