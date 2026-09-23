import type { ProductsState } from '@/features/master-data/products/type/productsTypes'

export const productsState: ProductsState = {
  title: "Produk",
  subtitle: "Data Produk",
  description: "Modul untuk mengelola data barang atau produk.",
  usage: "Dipakai sebagai referensi stok, pembelian, pesanan, pengiriman, dan laporan.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Data produk",
      description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
    },
    {
      title: "Referensi stok",
      description: "Menghubungkan produk dengan persediaan gudang."
    },
    {
      title: "Referensi transaksi",
      description: "Dipakai dalam pembelian, pesanan, dan pengiriman."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "PRO-001",
      name: "Produk 1",
      category: "Data Produk",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
    },
    {
      id: 2,
      code: "PRO-002",
      name: "Produk 2",
      category: "Data Produk",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menghubungkan produk dengan persediaan gudang."
    },
    {
      id: 3,
      code: "PRO-003",
      name: "Produk 3",
      category: "Data Produk",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Dipakai dalam pembelian, pesanan, dan pengiriman."
    },
    {
      id: 4,
      code: "PRO-004",
      name: "Produk 4",
      category: "Data Produk",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
    },
    {
      id: 5,
      code: "PRO-005",
      name: "Produk 5",
      category: "Data Produk",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Menghubungkan produk dengan persediaan gudang."
    },
    {
      id: 6,
      code: "PRO-006",
      name: "Produk 6",
      category: "Data Produk",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Dipakai dalam pembelian, pesanan, dan pengiriman."
    },
    {
      id: 7,
      code: "PRO-007",
      name: "Produk 7",
      category: "Data Produk",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
    },
    {
      id: 8,
      code: "PRO-008",
      name: "Produk 8",
      category: "Data Produk",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menghubungkan produk dengan persediaan gudang."
    },
    {
      id: 9,
      code: "PRO-009",
      name: "Produk 9",
      category: "Data Produk",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Dipakai dalam pembelian, pesanan, dan pengiriman."
    },
    {
      id: 10,
      code: "PRO-010",
      name: "Produk 10",
      category: "Data Produk",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
    }
  ],
  view: {
    title: "Produk",
    subtitle: "Data Produk",
    description: "Modul untuk mengelola data barang atau produk.",
    usage: "Dipakai sebagai referensi stok, pembelian, pesanan, pengiriman, dan laporan.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Data produk",
        description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
      },
      {
        title: "Referensi stok",
        description: "Menghubungkan produk dengan persediaan gudang."
      },
      {
        title: "Referensi transaksi",
        description: "Dipakai dalam pembelian, pesanan, dan pengiriman."
      }
    ],
    mode: "goods",
    headingTitle: "Master Barang",
    primaryActionLabel: "Tambah Barang Baru",
    dummyData: [
      {
        id: 1,
        code: "PRO-001",
        name: "Produk 1",
        category: "Data Produk",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
      },
      {
        id: 2,
        code: "PRO-002",
        name: "Produk 2",
        category: "Data Produk",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menghubungkan produk dengan persediaan gudang."
      },
      {
        id: 3,
        code: "PRO-003",
        name: "Produk 3",
        category: "Data Produk",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Dipakai dalam pembelian, pesanan, dan pengiriman."
      },
      {
        id: 4,
        code: "PRO-004",
        name: "Produk 4",
        category: "Data Produk",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
      },
      {
        id: 5,
        code: "PRO-005",
        name: "Produk 5",
        category: "Data Produk",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Menghubungkan produk dengan persediaan gudang."
      },
      {
        id: 6,
        code: "PRO-006",
        name: "Produk 6",
        category: "Data Produk",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Dipakai dalam pembelian, pesanan, dan pengiriman."
      },
      {
        id: 7,
        code: "PRO-007",
        name: "Produk 7",
        category: "Data Produk",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
      },
      {
        id: 8,
        code: "PRO-008",
        name: "Produk 8",
        category: "Data Produk",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menghubungkan produk dengan persediaan gudang."
      },
      {
        id: 9,
        code: "PRO-009",
        name: "Produk 9",
        category: "Data Produk",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Dipakai dalam pembelian, pesanan, dan pengiriman."
      },
      {
        id: 10,
        code: "PRO-010",
        name: "Produk 10",
        category: "Data Produk",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan nama, kode, satuan, kategori, dan harga produk."
      }
    ],
    goodsSummary: [
      {
        label: "Total Barang",
        value: "1.248",
        description: "Data barang aktif di seluruh gudang."
      },
      {
        label: "Stok Rendah",
        value: "18",
        description: "Perlu pemesanan ulang minggu ini."
      },
      {
        label: "Satuan",
        value: "12",
        description: "Sak, pail, dus, batang, dan unit lainnya."
      }
    ],
    goodsRows: [
      {
        code: "BRG-001",
        name: "Semen Portland 40 kg",
        category: "Bahan Bangunan",
        unit: "Sak",
        stock: "1.240",
        status: "Tersedia"
      },
      {
        code: "BRG-014",
        name: "Cat Tembok Putih",
        category: "Finishing",
        unit: "Pail",
        stock: "368",
        status: "Perlu cek stok"
      },
      {
        code: "BRG-027",
        name: "Pipa PVC 3 inci",
        category: "Material Pipa",
        unit: "Batang",
        stock: "92",
        status: "Stok rendah"
      },
      {
        code: "BRG-031",
        name: "Besi Beton 10 mm",
        category: "Bahan Bangunan",
        unit: "Batang",
        stock: "540",
        status: "Tersedia"
      },
      {
        code: "BRG-045",
        name: "Keramik Lantai 40x40",
        category: "Finishing",
        unit: "Dus",
        stock: "214",
        status: "Tersedia"
      },
      {
        code: "BRG-052",
        name: "Kabel NYM 2x1,5",
        category: "Elektrikal",
        unit: "Rol",
        stock: "76",
        status: "Stok rendah"
      },
      {
        code: "BRG-063",
        name: "Triplek 9 mm",
        category: "Kayu",
        unit: "Lembar",
        stock: "188",
        status: "Tersedia"
      },
      {
        code: "BRG-074",
        name: "Paku Beton 5 cm",
        category: "Aksesori",
        unit: "Kg",
        stock: "34",
        status: "Perlu cek stok"
      },
      {
        code: "BRG-088",
        name: "Cat Dasar Tembok",
        category: "Finishing",
        unit: "Pail",
        stock: "129",
        status: "Tersedia"
      },
      {
        code: "BRG-095",
        name: "Sealant Transparan",
        category: "Aksesori",
        unit: "Tube",
        stock: "58",
        status: "Stok rendah"
      }
    ],
    formTitle: "Tambah atau ubah barang",
    formSubtitle: "Formulir Barang",
    formSubmitLabel: "Simpan Barang",
    formSuccessMessage: "Data barang master berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "productCode",
        label: "Kode Barang",
        type: "text",
        value: "BRG-028"
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
        value: "Sak",
        options: ["Sak", "Pail", "Dus"]
      }
    ]
  }
}
