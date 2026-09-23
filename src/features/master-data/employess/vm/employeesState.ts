import type { EmployeesState } from '@/features/master-data/employess/type/employeesTypes'

export const employeesState: EmployeesState = {
  title: "Pegawai",
  subtitle: "Data Pegawai",
  description: "Modul untuk mengelola data pegawai atau karyawan.",
  usage: "Dipakai sebagai referensi penanggung jawab untuk pengelola, tenaga penjualan, gudang, dan kurir.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Data pegawai",
      description: "Menyimpan identitas dan informasi kontak pegawai."
    },
    {
      title: "Penanggung jawab",
      description: "Menghubungkan pegawai dengan transaksi atau proses kerja."
    },
    {
      title: "Dukungan akses",
      description: "Menjadi dasar saat pegawai dibuatkan akun pengguna."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "PEG-001",
      name: "Pegawai 1",
      category: "Data Pegawai",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan identitas dan informasi kontak pegawai."
    },
    {
      id: 2,
      code: "PEG-002",
      name: "Pegawai 2",
      category: "Data Pegawai",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menghubungkan pegawai dengan transaksi atau proses kerja."
    },
    {
      id: 3,
      code: "PEG-003",
      name: "Pegawai 3",
      category: "Data Pegawai",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Menjadi dasar saat pegawai dibuatkan akun pengguna."
    },
    {
      id: 4,
      code: "PEG-004",
      name: "Pegawai 4",
      category: "Data Pegawai",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan identitas dan informasi kontak pegawai."
    },
    {
      id: 5,
      code: "PEG-005",
      name: "Pegawai 5",
      category: "Data Pegawai",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Menghubungkan pegawai dengan transaksi atau proses kerja."
    },
    {
      id: 6,
      code: "PEG-006",
      name: "Pegawai 6",
      category: "Data Pegawai",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Menjadi dasar saat pegawai dibuatkan akun pengguna."
    },
    {
      id: 7,
      code: "PEG-007",
      name: "Pegawai 7",
      category: "Data Pegawai",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan identitas dan informasi kontak pegawai."
    },
    {
      id: 8,
      code: "PEG-008",
      name: "Pegawai 8",
      category: "Data Pegawai",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menghubungkan pegawai dengan transaksi atau proses kerja."
    },
    {
      id: 9,
      code: "PEG-009",
      name: "Pegawai 9",
      category: "Data Pegawai",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Menjadi dasar saat pegawai dibuatkan akun pengguna."
    },
    {
      id: 10,
      code: "PEG-010",
      name: "Pegawai 10",
      category: "Data Pegawai",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan identitas dan informasi kontak pegawai."
    }
  ],
  view: {
    title: "Pegawai",
    subtitle: "Data Pegawai",
    description: "Modul untuk mengelola data pegawai atau karyawan.",
    usage: "Dipakai sebagai referensi penanggung jawab untuk pengelola, tenaga penjualan, gudang, dan kurir.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Data pegawai",
        description: "Menyimpan identitas dan informasi kontak pegawai."
      },
      {
        title: "Penanggung jawab",
        description: "Menghubungkan pegawai dengan transaksi atau proses kerja."
      },
      {
        title: "Dukungan akses",
        description: "Menjadi dasar saat pegawai dibuatkan akun pengguna."
      }
    ],
    mode: "employee",
    headingTitle: "Master Pegawai & Performa KPI",
    primaryActionLabel: "Tambah Pegawai Baru",
    dummyData: [
      {
        id: 1,
        code: "PEG-001",
        name: "Pegawai 1",
        category: "Data Pegawai",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan identitas dan informasi kontak pegawai."
      },
      {
        id: 2,
        code: "PEG-002",
        name: "Pegawai 2",
        category: "Data Pegawai",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menghubungkan pegawai dengan transaksi atau proses kerja."
      },
      {
        id: 3,
        code: "PEG-003",
        name: "Pegawai 3",
        category: "Data Pegawai",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Menjadi dasar saat pegawai dibuatkan akun pengguna."
      },
      {
        id: 4,
        code: "PEG-004",
        name: "Pegawai 4",
        category: "Data Pegawai",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan identitas dan informasi kontak pegawai."
      },
      {
        id: 5,
        code: "PEG-005",
        name: "Pegawai 5",
        category: "Data Pegawai",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Menghubungkan pegawai dengan transaksi atau proses kerja."
      },
      {
        id: 6,
        code: "PEG-006",
        name: "Pegawai 6",
        category: "Data Pegawai",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Menjadi dasar saat pegawai dibuatkan akun pengguna."
      },
      {
        id: 7,
        code: "PEG-007",
        name: "Pegawai 7",
        category: "Data Pegawai",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan identitas dan informasi kontak pegawai."
      },
      {
        id: 8,
        code: "PEG-008",
        name: "Pegawai 8",
        category: "Data Pegawai",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menghubungkan pegawai dengan transaksi atau proses kerja."
      },
      {
        id: 9,
        code: "PEG-009",
        name: "Pegawai 9",
        category: "Data Pegawai",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Menjadi dasar saat pegawai dibuatkan akun pengguna."
      },
      {
        id: 10,
        code: "PEG-010",
        name: "Pegawai 10",
        category: "Data Pegawai",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan identitas dan informasi kontak pegawai."
      }
    ],
    employeeSummary: [
      {
        label: "Total Pegawai",
        value: "43",
        description: "Aktif di operasional gudang dan distribusi."
      },
      {
        label: "Rata-rata KPI",
        value: "91%",
        description: "Pencapaian individu bulan ini."
      },
      {
        label: "Dalam Tugas",
        value: "18",
        description: "Terhubung dengan rute aktif."
      }
    ],
    employeeRows: [
      {
        initials: "BS",
        name: "Budi Santoso",
        role: "Koordinator Gudang",
        department: "Gudang",
        score: "96%",
        status: "Aktif"
      },
      {
        initials: "SW",
        name: "Siti Wahyuni",
        role: "Admin Distribusi",
        department: "Operasional",
        score: "91%",
        status: "Aktif"
      },
      {
        initials: "AP",
        name: "Andi Pratama",
        role: "Kurir Utama",
        department: "Pengiriman",
        score: "87%",
        status: "Dalam tugas"
      },
      {
        initials: "RM",
        name: "Rina Melati",
        role: "Staf Dokumen",
        department: "Administrasi",
        score: "89%",
        status: "Aktif"
      },
      {
        initials: "DK",
        name: "Dewi Kartika",
        role: "Analis Persediaan",
        department: "Gudang",
        score: "93%",
        status: "Aktif"
      },
      {
        initials: "FN",
        name: "Fajar Nugroho",
        role: "Pengawas Armada",
        department: "Pengiriman",
        score: "86%",
        status: "Dalam tugas"
      },
      {
        initials: "NP",
        name: "Nadia Putri",
        role: "Admin Pembayaran",
        department: "Keuangan",
        score: "90%",
        status: "Aktif"
      },
      {
        initials: "RS",
        name: "Raka Saputra",
        role: "Supervisor Distribusi",
        department: "Operasional",
        score: "95%",
        status: "Aktif"
      },
      {
        initials: "ML",
        name: "Maya Lestari",
        role: "Staf Layanan",
        department: "Pelanggan",
        score: "84%",
        status: "Dalam tugas"
      },
      {
        initials: "AS",
        name: "Agus Salim",
        role: "Kurir Prioritas",
        department: "Pengiriman",
        score: "88%",
        status: "Aktif"
      }
    ],
    formTitle: "Tambah pegawai",
    formSubtitle: "Formulir Pegawai",
    formSubmitLabel: "Simpan Pegawai",
    formSuccessMessage: "Data pegawai berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "employeeName",
        label: "Nama pegawai",
        type: "text",
        value: ""
      },
      {
        id: "role",
        label: "Jabatan",
        type: "text",
        value: "Admin Operasional"
      },
      {
        id: "department",
        label: "Departemen",
        type: "select",
        value: "Gudang",
        options: ["Gudang", "Pengiriman", "Keuangan", "Operasional"]
      },
      {
        id: "status",
        label: "Status",
        type: "select",
        value: "Aktif",
        options: ["Aktif", "Dalam tugas", "Nonaktif"]
      },
      {
        id: "note",
        label: "Catatan",
        type: "textarea",
        value: "",
        rows: 4,
        wide: true
      }
    ]
  }
}
