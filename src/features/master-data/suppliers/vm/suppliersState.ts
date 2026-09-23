import type { SuppliersState } from '@/features/master-data/suppliers/type/suppliersTypes'

export const suppliersState: SuppliersState = {
  title: "Pemasok",
  subtitle: "Pemasok Barang",
  description: "Modul untuk mengelola data pemasok barang.",
  usage: "Dipakai sebagai referensi saat membuat pesanan pembelian dan mencatat barang masuk.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Data pemasok",
      description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
    },
    {
      title: "Referensi pembelian",
      description: "Menghubungkan pemasok dengan pengadaan."
    },
    {
      title: "Riwayat pasokan",
      description: "Membantu melihat asal barang dan kerja sama pemasok."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "PEM-001",
      name: "Pemasok 1",
      category: "Pemasok Barang",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
    },
    {
      id: 2,
      code: "PEM-002",
      name: "Pemasok 2",
      category: "Pemasok Barang",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menghubungkan pemasok dengan pengadaan."
    },
    {
      id: 3,
      code: "PEM-003",
      name: "Pemasok 3",
      category: "Pemasok Barang",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu melihat asal barang dan kerja sama pemasok."
    },
    {
      id: 4,
      code: "PEM-004",
      name: "Pemasok 4",
      category: "Pemasok Barang",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
    },
    {
      id: 5,
      code: "PEM-005",
      name: "Pemasok 5",
      category: "Pemasok Barang",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Menghubungkan pemasok dengan pengadaan."
    },
    {
      id: 6,
      code: "PEM-006",
      name: "Pemasok 6",
      category: "Pemasok Barang",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Membantu melihat asal barang dan kerja sama pemasok."
    },
    {
      id: 7,
      code: "PEM-007",
      name: "Pemasok 7",
      category: "Pemasok Barang",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
    },
    {
      id: 8,
      code: "PEM-008",
      name: "Pemasok 8",
      category: "Pemasok Barang",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menghubungkan pemasok dengan pengadaan."
    },
    {
      id: 9,
      code: "PEM-009",
      name: "Pemasok 9",
      category: "Pemasok Barang",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu melihat asal barang dan kerja sama pemasok."
    },
    {
      id: 10,
      code: "PEM-010",
      name: "Pemasok 10",
      category: "Pemasok Barang",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
    }
  ],
  view: {
    title: "Pemasok",
    subtitle: "Pemasok Barang",
    description: "Modul untuk mengelola data pemasok barang.",
    usage: "Dipakai sebagai referensi saat membuat pesanan pembelian dan mencatat barang masuk.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Data pemasok",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
      },
      {
        title: "Referensi pembelian",
        description: "Menghubungkan pemasok dengan pengadaan."
      },
      {
        title: "Riwayat pasokan",
        description: "Membantu melihat asal barang dan kerja sama pemasok."
      }
    ],
    mode: "master",
    headingTitle: "Pemasok",
    primaryActionLabel: "Tambah Data",
    dummyData: [
      {
        id: 1,
        code: "PEM-001",
        name: "Pemasok 1",
        category: "Pemasok Barang",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
      },
      {
        id: 2,
        code: "PEM-002",
        name: "Pemasok 2",
        category: "Pemasok Barang",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menghubungkan pemasok dengan pengadaan."
      },
      {
        id: 3,
        code: "PEM-003",
        name: "Pemasok 3",
        category: "Pemasok Barang",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu melihat asal barang dan kerja sama pemasok."
      },
      {
        id: 4,
        code: "PEM-004",
        name: "Pemasok 4",
        category: "Pemasok Barang",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
      },
      {
        id: 5,
        code: "PEM-005",
        name: "Pemasok 5",
        category: "Pemasok Barang",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Menghubungkan pemasok dengan pengadaan."
      },
      {
        id: 6,
        code: "PEM-006",
        name: "Pemasok 6",
        category: "Pemasok Barang",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Membantu melihat asal barang dan kerja sama pemasok."
      },
      {
        id: 7,
        code: "PEM-007",
        name: "Pemasok 7",
        category: "Pemasok Barang",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
      },
      {
        id: 8,
        code: "PEM-008",
        name: "Pemasok 8",
        category: "Pemasok Barang",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menghubungkan pemasok dengan pengadaan."
      },
      {
        id: 9,
        code: "PEM-009",
        name: "Pemasok 9",
        category: "Pemasok Barang",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu melihat asal barang dan kerja sama pemasok."
      },
      {
        id: 10,
        code: "PEM-010",
        name: "Pemasok 10",
        category: "Pemasok Barang",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok."
      }
    ],
    masterCards: [
      {
        label: "DA",
        title: "Data pemasok 1",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok.",
        icon: "DA"
      },
      {
        label: "RE",
        title: "Referensi pembelian 2",
        description: "Menghubungkan pemasok dengan pengadaan.",
        icon: "RE"
      },
      {
        label: "RI",
        title: "Riwayat pasokan 3",
        description: "Membantu melihat asal barang dan kerja sama pemasok.",
        icon: "RI"
      },
      {
        label: "DA",
        title: "Data pemasok 4",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok.",
        icon: "DA"
      },
      {
        label: "RE",
        title: "Referensi pembelian 5",
        description: "Menghubungkan pemasok dengan pengadaan.",
        icon: "RE"
      },
      {
        label: "RI",
        title: "Riwayat pasokan 6",
        description: "Membantu melihat asal barang dan kerja sama pemasok.",
        icon: "RI"
      },
      {
        label: "DA",
        title: "Data pemasok 7",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok.",
        icon: "DA"
      },
      {
        label: "RE",
        title: "Referensi pembelian 8",
        description: "Menghubungkan pemasok dengan pengadaan.",
        icon: "RE"
      },
      {
        label: "RI",
        title: "Riwayat pasokan 9",
        description: "Membantu melihat asal barang dan kerja sama pemasok.",
        icon: "RI"
      },
      {
        label: "DA",
        title: "Data pemasok 10",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok.",
        icon: "DA"
      }
    ],
    searchPlaceholder: "Cari data pemasok",
    masterRows: [
      {
        code: "PEM-001",
        name: "Data pemasok",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok.",
        owner: "Pengelola Data",
        status: "Aktif"
      },
      {
        code: "PEM-002",
        name: "Referensi pembelian",
        description: "Menghubungkan pemasok dengan pengadaan.",
        owner: "Admin Operasional",
        status: "Terverifikasi"
      },
      {
        code: "PEM-003",
        name: "Riwayat pasokan",
        description: "Membantu melihat asal barang dan kerja sama pemasok.",
        owner: "Supervisor",
        status: "Perlu ditinjau"
      },
      {
        code: "PEM-004",
        name: "Data pemasok",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok.",
        owner: "Supervisor",
        status: "Siap dipakai"
      },
      {
        code: "PEM-005",
        name: "Referensi pembelian",
        description: "Menghubungkan pemasok dengan pengadaan.",
        owner: "Supervisor",
        status: "Aktif"
      },
      {
        code: "PEM-006",
        name: "Riwayat pasokan",
        description: "Membantu melihat asal barang dan kerja sama pemasok.",
        owner: "Supervisor",
        status: "Terverifikasi"
      },
      {
        code: "PEM-007",
        name: "Data pemasok",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok.",
        owner: "Supervisor",
        status: "Perlu ditinjau"
      },
      {
        code: "PEM-008",
        name: "Referensi pembelian",
        description: "Menghubungkan pemasok dengan pengadaan.",
        owner: "Supervisor",
        status: "Siap dipakai"
      },
      {
        code: "PEM-009",
        name: "Riwayat pasokan",
        description: "Membantu melihat asal barang dan kerja sama pemasok.",
        owner: "Supervisor",
        status: "Aktif"
      },
      {
        code: "PEM-010",
        name: "Data pemasok",
        description: "Menyimpan nama, kontak, alamat, dan informasi pemasok.",
        owner: "Supervisor",
        status: "Terverifikasi"
      }
    ],
    formTitle: "Tambah pemasok",
    formSubtitle: "Formulir Pemasok",
    formSubmitLabel: "Simpan Pemasok",
    formSuccessMessage: "Data pemasok berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "supplierCode",
        label: "Kode pemasok",
        type: "text",
        value: "PEM-011"
      },
      {
        id: "supplierName",
        label: "Nama pemasok",
        type: "text",
        value: ""
      },
      {
        id: "contactPerson",
        label: "Penanggung jawab",
        type: "text",
        value: "Admin Operasional"
      },
      {
        id: "status",
        label: "Status",
        type: "select",
        value: "Aktif",
        options: ["Aktif", "Terverifikasi", "Perlu ditinjau"]
      },
      {
        id: "address",
        label: "Alamat",
        type: "textarea",
        value: "",
        rows: 4,
        wide: true
      }
    ]
  }
}
