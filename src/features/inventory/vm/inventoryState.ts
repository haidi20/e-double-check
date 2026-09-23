import type { InventoryState } from '@/features/inventory/type/inventoryTypes'

export const inventoryState: InventoryState = {
  title: "Persediaan",
  subtitle: "Stok Barang",
  description: "Modul untuk mengatur persediaan barang di gudang.",
  usage: "Dipakai untuk memastikan jumlah stok selalu sesuai dengan pembelian, penjualan, dan pengiriman.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Pantau stok",
      description: "Menampilkan jumlah barang yang tersedia."
    },
    {
      title: "Catat perubahan",
      description: "Mencatat stok masuk, stok keluar, dan koreksi stok."
    },
    {
      title: "Cegah stok kosong",
      description: "Membantu pengguna mengetahui barang yang perlu dibeli kembali."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "PER-001",
      name: "Persediaan 1",
      category: "Stok Barang",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menampilkan jumlah barang yang tersedia."
    },
    {
      id: 2,
      code: "PER-002",
      name: "Persediaan 2",
      category: "Stok Barang",
      owner: "Supervisor",
      status: "Diproses",
      description: "Mencatat stok masuk, stok keluar, dan koreksi stok."
    },
    {
      id: 3,
      code: "PER-003",
      name: "Persediaan 3",
      category: "Stok Barang",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu pengguna mengetahui barang yang perlu dibeli kembali."
    },
    {
      id: 4,
      code: "PER-004",
      name: "Persediaan 4",
      category: "Stok Barang",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menampilkan jumlah barang yang tersedia."
    },
    {
      id: 5,
      code: "PER-005",
      name: "Persediaan 5",
      category: "Stok Barang",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Mencatat stok masuk, stok keluar, dan koreksi stok."
    },
    {
      id: 6,
      code: "PER-006",
      name: "Persediaan 6",
      category: "Stok Barang",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Membantu pengguna mengetahui barang yang perlu dibeli kembali."
    },
    {
      id: 7,
      code: "PER-007",
      name: "Persediaan 7",
      category: "Stok Barang",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menampilkan jumlah barang yang tersedia."
    },
    {
      id: 8,
      code: "PER-008",
      name: "Persediaan 8",
      category: "Stok Barang",
      owner: "Supervisor",
      status: "Diproses",
      description: "Mencatat stok masuk, stok keluar, dan koreksi stok."
    },
    {
      id: 9,
      code: "PER-009",
      name: "Persediaan 9",
      category: "Stok Barang",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu pengguna mengetahui barang yang perlu dibeli kembali."
    },
    {
      id: 10,
      code: "PER-010",
      name: "Persediaan 10",
      category: "Stok Barang",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menampilkan jumlah barang yang tersedia."
    }
  ],
  view: {
    title: "Persediaan",
    subtitle: "Stok Barang",
    description: "Modul untuk mengatur persediaan barang di gudang.",
    usage: "Dipakai untuk memastikan jumlah stok selalu sesuai dengan pembelian, penjualan, dan pengiriman.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Pantau stok",
        description: "Menampilkan jumlah barang yang tersedia."
      },
      {
        title: "Catat perubahan",
        description: "Mencatat stok masuk, stok keluar, dan koreksi stok."
      },
      {
        title: "Cegah stok kosong",
        description: "Membantu pengguna mengetahui barang yang perlu dibeli kembali."
      }
    ],
    mode: "goods",
    headingTitle: "Persediaan",
    primaryActionLabel: "Tambah Barang Baru",
    dummyData: [
      {
        id: 1,
        code: "PER-001",
        name: "Persediaan 1",
        category: "Stok Barang",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menampilkan jumlah barang yang tersedia."
      },
      {
        id: 2,
        code: "PER-002",
        name: "Persediaan 2",
        category: "Stok Barang",
        owner: "Supervisor",
        status: "Diproses",
        description: "Mencatat stok masuk, stok keluar, dan koreksi stok."
      },
      {
        id: 3,
        code: "PER-003",
        name: "Persediaan 3",
        category: "Stok Barang",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu pengguna mengetahui barang yang perlu dibeli kembali."
      },
      {
        id: 4,
        code: "PER-004",
        name: "Persediaan 4",
        category: "Stok Barang",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menampilkan jumlah barang yang tersedia."
      },
      {
        id: 5,
        code: "PER-005",
        name: "Persediaan 5",
        category: "Stok Barang",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Mencatat stok masuk, stok keluar, dan koreksi stok."
      },
      {
        id: 6,
        code: "PER-006",
        name: "Persediaan 6",
        category: "Stok Barang",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Membantu pengguna mengetahui barang yang perlu dibeli kembali."
      },
      {
        id: 7,
        code: "PER-007",
        name: "Persediaan 7",
        category: "Stok Barang",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menampilkan jumlah barang yang tersedia."
      },
      {
        id: 8,
        code: "PER-008",
        name: "Persediaan 8",
        category: "Stok Barang",
        owner: "Supervisor",
        status: "Diproses",
        description: "Mencatat stok masuk, stok keluar, dan koreksi stok."
      },
      {
        id: 9,
        code: "PER-009",
        name: "Persediaan 9",
        category: "Stok Barang",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu pengguna mengetahui barang yang perlu dibeli kembali."
      },
      {
        id: 10,
        code: "PER-010",
        name: "Persediaan 10",
        category: "Stok Barang",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menampilkan jumlah barang yang tersedia."
      }
    ],
    goodsSummary: [
      {
        label: "Total Barang",
        value: "10",
        description: "Jenis barang sembako aktif di gudang SBM."
      },
      {
        label: "Stok Rendah",
        value: "3",
        description: "Barang sembako yang perlu restock minggu ini."
      },
      {
        label: "Satuan",
        value: "6",
        description: "Kg, karung, dus, rak, liter, dan tray."
      }
    ],
    goodsRows: [
      {
        code: "SMB-001",
        name: "Beras Premium 5 kg",
        category: "Beras",
        unit: "Karung",
        stock: "240",
        status: "Tersedia"
      },
      {
        code: "SMB-002",
        name: "Minyak Goreng 1 liter",
        category: "Minyak",
        unit: "Dus",
        stock: "96",
        status: "Tersedia"
      },
      {
        code: "SMB-003",
        name: "Gula Pasir 1 kg",
        category: "Gula",
        unit: "Kg",
        stock: "45",
        status: "Stok rendah"
      },
      {
        code: "SMB-004",
        name: "Telur Ayam Ras",
        category: "Protein",
        unit: "Rak",
        stock: "72",
        status: "Tersedia"
      },
      {
        code: "SMB-005",
        name: "Mie Instan Goreng",
        category: "Makanan Instan",
        unit: "Dus",
        stock: "180",
        status: "Tersedia"
      },
      {
        code: "SMB-006",
        name: "Tepung Terigu 1 kg",
        category: "Tepung",
        unit: "Kg",
        stock: "38",
        status: "Stok rendah"
      },
      {
        code: "SMB-007",
        name: "Susu Kental Manis Kaleng",
        category: "Susu",
        unit: "Dus",
        stock: "64",
        status: "Tersedia"
      },
      {
        code: "SMB-008",
        name: "Garam Beryodium 500 gr",
        category: "Bumbu",
        unit: "Kg",
        stock: "22",
        status: "Perlu cek stok"
      },
      {
        code: "SMB-009",
        name: "Kecap Manis Botol",
        category: "Bumbu",
        unit: "Dus",
        stock: "56",
        status: "Tersedia"
      },
      {
        code: "SMB-010",
        name: "Air Mineral 600 ml",
        category: "Minuman",
        unit: "Dus",
        stock: "40",
        status: "Stok rendah"
      }
    ],
    formTitle: "Tambah atau ubah barang",
    formSubtitle: "Formulir Barang",
    formSubmitLabel: "Simpan Barang",
    formSuccessMessage: "Data barang berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "productCode",
        label: "Kode Barang",
        type: "text",
        value: "SMB-011"
      },
      {
        id: "productName",
        label: "Nama Barang",
        type: "text",
        value: ""
      },
      {
        id: "unit",
        label: "Satuan",
        type: "select",
        value: "Dus",
        options: ["Kg", "Karung", "Dus", "Rak", "Liter", "Tray"]
      }
    ]
  }
}
