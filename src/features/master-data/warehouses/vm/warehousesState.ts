import type { WarehousesState } from '@/features/master-data/warehouses/type/warehousesTypes'

export const warehousesState: WarehousesState = {
  title: "Gudang",
  subtitle: "Data Gudang",
  description: "Modul untuk mengelola lokasi penyimpanan barang.",
  usage: "Dipakai untuk memisahkan stok berdasarkan gudang atau lokasi penyimpanan.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Data gudang",
      description: "Menyimpan data gudang utama SBM."
    },
    {
      title: "Referensi stok",
      description: "Menghubungkan semua persediaan barang ke gudang SBM."
    },
    {
      title: "Mutasi barang",
      description: "Menjadi dasar barang keluar untuk pengiriman outlet."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "GDG-SBM-001",
      name: "SBM",
      category: "Data Gudang",
      owner: "Sukses Berkat Madina",
      status: "Aktif",
      description: "Gudang utama Sukses Berkat Madina untuk stok dan distribusi outlet."
    }
  ],
  view: {
    title: "Gudang",
    subtitle: "Data Gudang",
    description: "Modul untuk mengelola lokasi penyimpanan barang.",
    usage: "Dipakai untuk memisahkan stok berdasarkan gudang atau lokasi penyimpanan.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Data gudang",
        description: "Menyimpan data gudang utama SBM."
      },
      {
        title: "Referensi stok",
        description: "Menghubungkan semua persediaan barang ke gudang SBM."
      },
      {
        title: "Mutasi barang",
        description: "Menjadi dasar barang keluar untuk pengiriman outlet."
      }
    ],
    mode: "master",
    headingTitle: "Master Gudang",
    primaryActionLabel: "Tambah Data",
    dummyData: [
      {
        id: 1,
        code: "GDG-SBM-001",
        name: "SBM",
        category: "Data Gudang",
        owner: "Sukses Berkat Madina",
        status: "Aktif",
        description: "Gudang utama Sukses Berkat Madina untuk stok dan distribusi outlet."
      }
    ],
    masterCards: [
      {
        label: "GD",
        title: "Gudang Utama",
        description: "SBM menjadi gudang pusat untuk pengelolaan stok barang.",
        icon: "GD"
      },
      {
        label: "SB",
        title: "Sukses Berkat Madina",
        description: "Nama resmi gudang/perusahaan pada master data.",
        icon: "SB"
      },
      {
        label: "MU",
        title: "Distribusi Outlet",
        description: "Barang keluar dari gudang menjadi dasar pengiriman outlet.",
        icon: "MU"
      }
    ],
    searchPlaceholder: "Cari data gudang",
    masterRows: [
      {
        code: "GDG-SBM-001",
        name: "SBM",
        description: "Sukses Berkat Madina",
        owner: "Admin Gudang",
        status: "Aktif"
      }
    ],
    formTitle: "Tambah gudang",
    formSubtitle: "Formulir Gudang",
    formSubmitLabel: "Simpan Gudang",
    formSuccessMessage: "Data gudang berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "warehouseCode",
        label: "Kode gudang",
        type: "text",
        value: "GDG-SBM-001",
        readonly: true
      },
      {
        id: "warehouseName",
        label: "Nama gudang",
        type: "text",
        value: "SBM"
      },
      {
        id: "companyName",
        label: "Nama perusahaan",
        type: "text",
        value: "Sukses Berkat Madina"
      },
      {
        id: "owner",
        label: "Penanggung jawab",
        type: "text",
        value: "Admin Gudang"
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
        value: "Gudang utama Sukses Berkat Madina.",
        rows: 4,
        wide: true
      }
    ]
  }
}
