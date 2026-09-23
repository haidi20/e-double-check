import { syncStateHmr } from '@/core/vm/registerStateHmr'
import type { AuthState } from '@/features/auth/type/authTypes'

export const authState: AuthState = {
  title: "Autentikasi",
  subtitle: "Keamanan Akses",
  description: "Modul untuk mengatur proses masuk, keluar, dan validasi akses pengguna.",
  usage: "Dipakai agar hanya pengguna yang memiliki hak akses yang dapat membuka aplikasi.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Masuk pengguna",
      description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
    },
    {
      title: "Keluar pengguna",
      description: "Mengakhiri sesi pengguna dengan aman."
    },
    {
      title: "Periksa akses",
      description: "Memastikan pengguna hanya membuka menu yang sesuai hak aksesnya."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "AUT-001",
      name: "Autentikasi 1",
      category: "Keamanan Akses",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
    },
    {
      id: 2,
      code: "AUT-002",
      name: "Autentikasi 2",
      category: "Keamanan Akses",
      owner: "Supervisor",
      status: "Diproses",
      description: "Mengakhiri sesi pengguna dengan aman."
    },
    {
      id: 3,
      code: "AUT-003",
      name: "Autentikasi 3",
      category: "Keamanan Akses",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Memastikan pengguna hanya membuka menu yang sesuai hak aksesnya."
    },
    {
      id: 4,
      code: "AUT-004",
      name: "Autentikasi 4",
      category: "Keamanan Akses",
      owner: "Supervisor",
      status: "Aktif",
      description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
    },
    {
      id: 5,
      code: "AUT-005",
      name: "Autentikasi 5",
      category: "Keamanan Akses",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Mengakhiri sesi pengguna dengan aman."
    },
    {
      id: 6,
      code: "AUT-006",
      name: "Autentikasi 6",
      category: "Keamanan Akses",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Memastikan pengguna hanya membuka menu yang sesuai hak aksesnya."
    },
    {
      id: 7,
      code: "AUT-007",
      name: "Autentikasi 7",
      category: "Keamanan Akses",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
    },
    {
      id: 8,
      code: "AUT-008",
      name: "Autentikasi 8",
      category: "Keamanan Akses",
      owner: "Supervisor",
      status: "Diproses",
      description: "Mengakhiri sesi pengguna dengan aman."
    },
    {
      id: 9,
      code: "AUT-009",
      name: "Autentikasi 9",
      category: "Keamanan Akses",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Memastikan pengguna hanya membuka menu yang sesuai hak aksesnya."
    },
    {
      id: 10,
      code: "AUT-010",
      name: "Autentikasi 10",
      category: "Keamanan Akses",
      owner: "Supervisor",
      status: "Aktif",
      description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
    }
  ],
  view: {
    title: "Autentikasi",
    subtitle: "Keamanan Akses",
    description: "Modul untuk mengatur proses masuk, keluar, dan validasi akses pengguna.",
    usage: "Dipakai agar hanya pengguna yang memiliki hak akses yang dapat membuka aplikasi.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Masuk pengguna",
        description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
      },
      {
        title: "Keluar pengguna",
        description: "Mengakhiri sesi pengguna dengan aman."
      },
      {
        title: "Periksa akses",
        description: "Memastikan pengguna hanya membuka menu yang sesuai hak aksesnya."
      }
    ],
    mode: "access",
    headingTitle: "Keamanan Akses",
    primaryActionLabel: "Periksa Sesi",
    dummyData: [
      {
        id: 1,
        code: "AUT-001",
        name: "Autentikasi 1",
        category: "Keamanan Akses",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
      },
      {
        id: 2,
        code: "AUT-002",
        name: "Autentikasi 2",
        category: "Keamanan Akses",
        owner: "Supervisor",
        status: "Diproses",
        description: "Mengakhiri sesi pengguna dengan aman."
      },
      {
        id: 3,
        code: "AUT-003",
        name: "Autentikasi 3",
        category: "Keamanan Akses",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Memastikan pengguna hanya membuka menu yang sesuai hak aksesnya."
      },
      {
        id: 4,
        code: "AUT-004",
        name: "Autentikasi 4",
        category: "Keamanan Akses",
        owner: "Supervisor",
        status: "Aktif",
        description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
      },
      {
        id: 5,
        code: "AUT-005",
        name: "Autentikasi 5",
        category: "Keamanan Akses",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Mengakhiri sesi pengguna dengan aman."
      },
      {
        id: 6,
        code: "AUT-006",
        name: "Autentikasi 6",
        category: "Keamanan Akses",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Memastikan pengguna hanya membuka menu yang sesuai hak aksesnya."
      },
      {
        id: 7,
        code: "AUT-007",
        name: "Autentikasi 7",
        category: "Keamanan Akses",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
      },
      {
        id: 8,
        code: "AUT-008",
        name: "Autentikasi 8",
        category: "Keamanan Akses",
        owner: "Supervisor",
        status: "Diproses",
        description: "Mengakhiri sesi pengguna dengan aman."
      },
      {
        id: 9,
        code: "AUT-009",
        name: "Autentikasi 9",
        category: "Keamanan Akses",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Memastikan pengguna hanya membuka menu yang sesuai hak aksesnya."
      },
      {
        id: 10,
        code: "AUT-010",
        name: "Autentikasi 10",
        category: "Keamanan Akses",
        owner: "Supervisor",
        status: "Aktif",
        description: "Memvalidasi akun sebelum pengguna masuk ke aplikasi."
      }
    ],
    accessRows: [
      {
        initials: "NP",
        name: "Nadia Putri",
        role: "Admin Gudang",
        area: "Gudang Pusat",
        status: "Aktif"
      },
      {
        initials: "RS",
        name: "Raka Saputra",
        role: "Supervisor Distribusi",
        area: "Wilayah Timur",
        status: "Aktif"
      },
      {
        initials: "ML",
        name: "Maya Lestari",
        role: "Keuangan",
        area: "Pembayaran",
        status: "Perlu verifikasi"
      },
      {
        initials: "BS",
        name: "Budi Santoso",
        role: "Koordinator Gudang",
        area: "Gudang Pusat",
        status: "Aktif"
      },
      {
        initials: "SW",
        name: "Siti Wahyuni",
        role: "Admin Distribusi",
        area: "Wilayah Timur",
        status: "Aktif"
      },
      {
        initials: "AP",
        name: "Andi Pratama",
        role: "Kurir",
        area: "Rute Makassar",
        status: "Aktif"
      },
      {
        initials: "RM",
        name: "Rina Melati",
        role: "Staf Dokumen",
        area: "Administrasi",
        status: "Aktif"
      },
      {
        initials: "DK",
        name: "Dewi Kartika",
        role: "Analis Persediaan",
        area: "Persediaan",
        status: "Nonaktif"
      },
      {
        initials: "FN",
        name: "Fajar Nugroho",
        role: "Pengawas Armada",
        area: "Armada Timur",
        status: "Aktif"
      },
      {
        initials: "AS",
        name: "Agus Salim",
        role: "Kurir Prioritas",
        area: "Rute Prioritas",
        status: "Perlu verifikasi"
      }
    ],
    formTitle: "Validasi pengguna",
    formSubtitle: "Kontrol Akses",
    formSubmitLabel: "Simpan Akses",
    formSuccessMessage: "Akses pengguna berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "account",
        label: "Akun",
        type: "text",
        value: ""
      },
      {
        id: "role",
        label: "Peran",
        type: "select",
        value: "Admin Gudang",
        options: ["Admin Gudang", "Supervisor Distribusi", "Keuangan"]
      }
    ],
    accessEnabledLabel: "Akses aktif",
    accessEnabledValue: "Ya"
  }
}


if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    syncStateHmr('authState', module, 'authState')
  })
}

