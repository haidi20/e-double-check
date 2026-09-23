import { syncStateHmr } from '@/core/vm/registerStateHmr'
import type { UsersState } from '@/features/settings/users/type/usersTypes'

export const usersState: UsersState = {
  title: "Pengguna",
  subtitle: "Akun Pengguna",
  description: "Modul untuk mengelola akun pengguna aplikasi.",
  usage: "Dipakai oleh pengelola sistem untuk membuat akun, mengubah data pengguna, dan mengatur peran.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Kelola akun",
      description: "Membuat, mengubah, atau menonaktifkan pengguna."
    },
    {
      title: "Hubungkan peran",
      description: "Menentukan hak akses pengguna berdasarkan peran."
    },
    {
      title: "Pantau akses",
      description: "Membantu pengelola mengontrol siapa yang dapat memakai aplikasi."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "PEN-001",
      name: "Pengguna 1",
      category: "Akun Pengguna",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Membuat, mengubah, atau menonaktifkan pengguna."
    },
    {
      id: 2,
      code: "PEN-002",
      name: "Pengguna 2",
      category: "Akun Pengguna",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menentukan hak akses pengguna berdasarkan peran."
    },
    {
      id: 3,
      code: "PEN-003",
      name: "Pengguna 3",
      category: "Akun Pengguna",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu pengelola mengontrol siapa yang dapat memakai aplikasi."
    },
    {
      id: 4,
      code: "PEN-004",
      name: "Pengguna 4",
      category: "Akun Pengguna",
      owner: "Supervisor",
      status: "Aktif",
      description: "Membuat, mengubah, atau menonaktifkan pengguna."
    },
    {
      id: 5,
      code: "PEN-005",
      name: "Pengguna 5",
      category: "Akun Pengguna",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Menentukan hak akses pengguna berdasarkan peran."
    },
    {
      id: 6,
      code: "PEN-006",
      name: "Pengguna 6",
      category: "Akun Pengguna",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Membantu pengelola mengontrol siapa yang dapat memakai aplikasi."
    },
    {
      id: 7,
      code: "PEN-007",
      name: "Pengguna 7",
      category: "Akun Pengguna",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Membuat, mengubah, atau menonaktifkan pengguna."
    },
    {
      id: 8,
      code: "PEN-008",
      name: "Pengguna 8",
      category: "Akun Pengguna",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menentukan hak akses pengguna berdasarkan peran."
    },
    {
      id: 9,
      code: "PEN-009",
      name: "Pengguna 9",
      category: "Akun Pengguna",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu pengelola mengontrol siapa yang dapat memakai aplikasi."
    },
    {
      id: 10,
      code: "PEN-010",
      name: "Pengguna 10",
      category: "Akun Pengguna",
      owner: "Supervisor",
      status: "Aktif",
      description: "Membuat, mengubah, atau menonaktifkan pengguna."
    }
  ],
  view: {
    title: "Pengguna",
    subtitle: "Akun Pengguna",
    description: "Modul untuk mengelola akun pengguna aplikasi.",
    usage: "Dipakai oleh pengelola sistem untuk membuat akun, mengubah data pengguna, dan mengatur peran.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Kelola akun",
        description: "Membuat, mengubah, atau menonaktifkan pengguna."
      },
      {
        title: "Hubungkan peran",
        description: "Menentukan hak akses pengguna berdasarkan peran."
      },
      {
        title: "Pantau akses",
        description: "Membantu pengelola mengontrol siapa yang dapat memakai aplikasi."
      }
    ],
    mode: "access",
    headingTitle: "Manajemen Pengguna",
    primaryActionLabel: "Tambah Pengguna Baru",
    activeTabId: "users",
    tabs: [
      {
        id: "users",
        label: "Daftar Pengguna"
      },
      {
        id: "roles",
        label: "Peran & Izin"
      },
      {
        id: "sessions",
        label: "Sesi Masuk"
      }
    ],
    dummyData: [
      {
        id: 1,
        code: "PEN-001",
        name: "Pengguna 1",
        category: "Akun Pengguna",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Membuat, mengubah, atau menonaktifkan pengguna."
      },
      {
        id: 2,
        code: "PEN-002",
        name: "Pengguna 2",
        category: "Akun Pengguna",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menentukan hak akses pengguna berdasarkan peran."
      },
      {
        id: 3,
        code: "PEN-003",
        name: "Pengguna 3",
        category: "Akun Pengguna",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu pengelola mengontrol siapa yang dapat memakai aplikasi."
      },
      {
        id: 4,
        code: "PEN-004",
        name: "Pengguna 4",
        category: "Akun Pengguna",
        owner: "Supervisor",
        status: "Aktif",
        description: "Membuat, mengubah, atau menonaktifkan pengguna."
      },
      {
        id: 5,
        code: "PEN-005",
        name: "Pengguna 5",
        category: "Akun Pengguna",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Menentukan hak akses pengguna berdasarkan peran."
      },
      {
        id: 6,
        code: "PEN-006",
        name: "Pengguna 6",
        category: "Akun Pengguna",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Membantu pengelola mengontrol siapa yang dapat memakai aplikasi."
      },
      {
        id: 7,
        code: "PEN-007",
        name: "Pengguna 7",
        category: "Akun Pengguna",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Membuat, mengubah, atau menonaktifkan pengguna."
      },
      {
        id: 8,
        code: "PEN-008",
        name: "Pengguna 8",
        category: "Akun Pengguna",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menentukan hak akses pengguna berdasarkan peran."
      },
      {
        id: 9,
        code: "PEN-009",
        name: "Pengguna 9",
        category: "Akun Pengguna",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu pengelola mengontrol siapa yang dapat memakai aplikasi."
      },
      {
        id: 10,
        code: "PEN-010",
        name: "Pengguna 10",
        category: "Akun Pengguna",
        owner: "Supervisor",
        status: "Aktif",
        description: "Membuat, mengubah, atau menonaktifkan pengguna."
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
    roleCards: [
      {
        name: "Admin Sistem",
        users: "5 pengguna",
        scope: "Akses penuh aplikasi"
      },
      {
        name: "Supervisor Gudang",
        users: "12 pengguna",
        scope: "Persediaan, surat jalan, laporan"
      },
      {
        name: "Admin Distribusi",
        users: "9 pengguna",
        scope: "Order pesanan, faktur, dan pengiriman"
      },
      {
        name: "Kurir",
        users: "26 pengguna",
        scope: "Rute dan status pengiriman"
      }
    ],
    permissionRows: [
      {
        feature: "Order Pesanan",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Inventaris",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Surat Jalan",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Pengiriman",
        view: "Ya",
        create: "Tidak",
        update: "Ya",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Laporan",
        view: "Ya",
        create: "Tidak",
        update: "Tidak",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Pengaturan",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Ya",
        removeClass: "check"
      }
    ],
    sessionRows: [
      {
        initials: "NP",
        name: "Nadia Putri",
        device: "Chrome - Windows",
        location: "Gudang Pusat",
        status: "Aktif sekarang"
      },
      {
        initials: "RS",
        name: "Raka Saputra",
        device: "Safari - iPhone",
        location: "Wilayah Timur",
        status: "15 menit lalu"
      },
      {
        initials: "AP",
        name: "Andi Pratama",
        device: "Android App",
        location: "Rute Makassar",
        status: "1 jam lalu"
      },
      {
        initials: "FN",
        name: "Fajar Nugroho",
        device: "Edge - Windows",
        location: "Armada Timur",
        status: "Kemarin"
      }
    ],
    formTitle: "Tambah atau ubah akses",
    formSubtitle: "Formulir Pengguna",
    formSubmitLabel: "Simpan Pengguna",
    formSuccessMessage: "Data pengguna berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "name",
        label: "Nama Pengguna",
        type: "text",
        value: ""
      },
      {
        id: "email",
        label: "Email",
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
    accountEnabledLabel: "Aktifkan akun",
    accountEnabledValue: "Ya"
  }
}


if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    syncStateHmr('usersState', module, 'usersState')
  })
}

