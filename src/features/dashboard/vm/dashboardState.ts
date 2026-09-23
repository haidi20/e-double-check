import type { DashboardState } from '@/features/dashboard/type/dashboardTypes'

export const dashboardState: DashboardState = {
  title: "Halaman Utama",
  subtitle: "Ringkasan Operasional",
  description: "Modul untuk menampilkan kondisi utama aplikasi E-Distribusi SBM.",
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
    description: "Modul untuk menampilkan kondisi utama aplikasi E-Distribusi SBM.",
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
    chartEyebrow: "Grafik Operasional",
    chartTitle: "Tren pesanan 7 hari terakhir",
    chartStatus: "Stabil",
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
        label: "Pesanan Masuk",
        value: "1.284",
        trend: "+12%",
        icon: "PM",
        progress: 78,
        progressWidth: "78%"
      },
      {
        label: "Pesanan Diproses",
        value: "842",
        trend: "Stabil",
        icon: "PD",
        progress: 65,
        progressWidth: "65%"
      },
      {
        label: "Rata-rata Waktu",
        value: "4,2 jam",
        trend: "-4%",
        icon: "RW",
        progress: 52,
        progressWidth: "52%"
      },
      {
        label: "Skor KPI",
        value: "94,8%",
        trend: "Sangat Baik",
        icon: "SK",
        progress: 94,
        progressWidth: "94%"
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
    formTitle: "Pesanan kerja baru",
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
    ]
  }
}
