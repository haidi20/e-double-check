import type { RolesState } from '@/features/settings/roles/type/rolesTypes'

export const rolesState: RolesState = {
  title: "Peran",
  subtitle: "Hak Akses",
  description: "Modul untuk mengatur peran dan hak akses pengguna.",
  usage: "Dipakai agar setiap pengguna hanya dapat mengakses fitur sesuai tanggung jawabnya.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Kelola peran",
      description: "Membuat dan mengubah peran pengguna."
    },
    {
      title: "Atur izin",
      description: "Menentukan fitur yang boleh dibuka oleh peran tertentu."
    },
    {
      title: "Kontrol akses",
      description: "Membantu menjaga keamanan aplikasi."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "PER-001",
      name: "Peran 1",
      category: "Hak Akses",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Membuat dan mengubah peran pengguna."
    },
    {
      id: 2,
      code: "PER-002",
      name: "Peran 2",
      category: "Hak Akses",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menentukan fitur yang boleh dibuka oleh peran tertentu."
    },
    {
      id: 3,
      code: "PER-003",
      name: "Peran 3",
      category: "Hak Akses",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu menjaga keamanan aplikasi."
    },
    {
      id: 4,
      code: "PER-004",
      name: "Peran 4",
      category: "Hak Akses",
      owner: "Supervisor",
      status: "Aktif",
      description: "Membuat dan mengubah peran pengguna."
    },
    {
      id: 5,
      code: "PER-005",
      name: "Peran 5",
      category: "Hak Akses",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Menentukan fitur yang boleh dibuka oleh peran tertentu."
    },
    {
      id: 6,
      code: "PER-006",
      name: "Peran 6",
      category: "Hak Akses",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Membantu menjaga keamanan aplikasi."
    },
    {
      id: 7,
      code: "PER-007",
      name: "Peran 7",
      category: "Hak Akses",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Membuat dan mengubah peran pengguna."
    },
    {
      id: 8,
      code: "PER-008",
      name: "Peran 8",
      category: "Hak Akses",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menentukan fitur yang boleh dibuka oleh peran tertentu."
    },
    {
      id: 9,
      code: "PER-009",
      name: "Peran 9",
      category: "Hak Akses",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu menjaga keamanan aplikasi."
    },
    {
      id: 10,
      code: "PER-010",
      name: "Peran 10",
      category: "Hak Akses",
      owner: "Supervisor",
      status: "Aktif",
      description: "Membuat dan mengubah peran pengguna."
    }
  ],
  view: {
    title: "Peran",
    subtitle: "Hak Akses",
    description: "Modul untuk mengatur peran dan hak akses pengguna.",
    usage: "Dipakai agar setiap pengguna hanya dapat mengakses fitur sesuai tanggung jawabnya.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Kelola peran",
        description: "Membuat dan mengubah peran pengguna."
      },
      {
        title: "Atur izin",
        description: "Menentukan fitur yang boleh dibuka oleh peran tertentu."
      },
      {
        title: "Kontrol akses",
        description: "Membantu menjaga keamanan aplikasi."
      }
    ],
    mode: "roles",
    headingTitle: "Peran & Hak Akses",
    primaryActionLabel: "Tambah Peran Baru",
    dummyData: [
      {
        id: 1,
        code: "PER-001",
        name: "Peran 1",
        category: "Hak Akses",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Membuat dan mengubah peran pengguna."
      },
      {
        id: 2,
        code: "PER-002",
        name: "Peran 2",
        category: "Hak Akses",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menentukan fitur yang boleh dibuka oleh peran tertentu."
      },
      {
        id: 3,
        code: "PER-003",
        name: "Peran 3",
        category: "Hak Akses",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu menjaga keamanan aplikasi."
      },
      {
        id: 4,
        code: "PER-004",
        name: "Peran 4",
        category: "Hak Akses",
        owner: "Supervisor",
        status: "Aktif",
        description: "Membuat dan mengubah peran pengguna."
      },
      {
        id: 5,
        code: "PER-005",
        name: "Peran 5",
        category: "Hak Akses",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Menentukan fitur yang boleh dibuka oleh peran tertentu."
      },
      {
        id: 6,
        code: "PER-006",
        name: "Peran 6",
        category: "Hak Akses",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Membantu menjaga keamanan aplikasi."
      },
      {
        id: 7,
        code: "PER-007",
        name: "Peran 7",
        category: "Hak Akses",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Membuat dan mengubah peran pengguna."
      },
      {
        id: 8,
        code: "PER-008",
        name: "Peran 8",
        category: "Hak Akses",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menentukan fitur yang boleh dibuka oleh peran tertentu."
      },
      {
        id: 9,
        code: "PER-009",
        name: "Peran 9",
        category: "Hak Akses",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu menjaga keamanan aplikasi."
      },
      {
        id: 10,
        code: "PER-010",
        name: "Peran 10",
        category: "Hak Akses",
        owner: "Supervisor",
        status: "Aktif",
        description: "Membuat dan mengubah peran pengguna."
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
        name: "Kurir",
        users: "26 pengguna",
        scope: "Rute dan status pengiriman"
      },
      {
        name: "Admin Distribusi",
        users: "9 pengguna",
        scope: "Distribusi, rute, dan pengiriman"
      },
      {
        name: "Keuangan",
        users: "4 pengguna",
        scope: "Pembayaran dan laporan transaksi"
      },
      {
        name: "Layanan Pelanggan",
        users: "7 pengguna",
        scope: "Pelanggan dan pelacakan kiriman"
      },
      {
        name: "Pengadaan",
        users: "6 pengguna",
        scope: "Pembelian dan pemasok"
      },
      {
        name: "Manajer Operasional",
        users: "3 pengguna",
        scope: "Semua laporan operasional"
      },
      {
        name: "Staf Gudang",
        users: "18 pengguna",
        scope: "Barang, persediaan, dan mutasi"
      },
      {
        name: "Auditor",
        users: "2 pengguna",
        scope: "Akses baca laporan dan riwayat"
      }
    ],
    permissionRows: [
      {
        feature: "Pesanan Pekerjaan",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Ya",
        removeClass: "check"
      },
      {
        feature: "Barang",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Ya",
        removeClass: "check"
      },
      {
        feature: "Pengiriman",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Ya",
        removeClass: "check"
      },
      {
        feature: "KPI",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Pelanggan",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Pemasok",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Ya",
        removeClass: "check"
      },
      {
        feature: "Gudang",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Kendaraan",
        view: "Ya",
        create: "Ya",
        update: "Ya",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Pembayaran",
        view: "Ya",
        create: "Tidak",
        update: "Ya",
        remove: "Tidak",
        removeClass: "muted-check"
      },
      {
        feature: "Pengaturan",
        view: "Ya",
        create: "Tidak",
        update: "Tidak",
        remove: "Tidak",
        removeClass: "muted-check"
      }
    ],
    formTitle: "Tambah peran",
    formSubtitle: "Formulir Peran",
    formSubmitLabel: "Simpan Peran",
    formSuccessMessage: "Data peran berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "roleName",
        label: "Nama peran",
        type: "text",
        value: "Admin Gudang"
      },
      {
        id: "scope",
        label: "Cakupan akses",
        type: "select",
        value: "Gudang Pusat",
        options: ["Gudang Pusat", "Distribusi", "Keuangan", "Semua cabang"]
      },
      {
        id: "note",
        label: "Catatan",
        type: "textarea",
        value: "Peran dibuat untuk mengatur akses pengguna sesuai tanggung jawab.",
        rows: 4,
        wide: true
      }
    ]
  }
}
