import type { CustomersState } from '@/features/master-data/customers/type/customersTypes'

export const customersState: CustomersState = {
  title: "Pelanggan",
  subtitle: "Data Pelanggan",
  description: "Modul untuk mengelola data pelanggan.",
  usage: "Dipakai sebagai referensi saat membuat pesanan, tagihan, dan pengiriman.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Data pelanggan",
      description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
    },
    {
      title: "Referensi transaksi",
      description: "Menghubungkan pelanggan dengan pesanan dan pembayaran."
    },
    {
      title: "Kelompok wilayah",
      description: "Membantu pembagian rute distribusi."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "PEL-001",
      name: "Pelanggan 1",
      category: "Data Pelanggan",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
    },
    {
      id: 2,
      code: "PEL-002",
      name: "Pelanggan 2",
      category: "Data Pelanggan",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menghubungkan pelanggan dengan pesanan dan pembayaran."
    },
    {
      id: 3,
      code: "PEL-003",
      name: "Pelanggan 3",
      category: "Data Pelanggan",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu pembagian rute distribusi."
    },
    {
      id: 4,
      code: "PEL-004",
      name: "Pelanggan 4",
      category: "Data Pelanggan",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
    },
    {
      id: 5,
      code: "PEL-005",
      name: "Pelanggan 5",
      category: "Data Pelanggan",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Menghubungkan pelanggan dengan pesanan dan pembayaran."
    },
    {
      id: 6,
      code: "PEL-006",
      name: "Pelanggan 6",
      category: "Data Pelanggan",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Membantu pembagian rute distribusi."
    },
    {
      id: 7,
      code: "PEL-007",
      name: "Pelanggan 7",
      category: "Data Pelanggan",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
    },
    {
      id: 8,
      code: "PEL-008",
      name: "Pelanggan 8",
      category: "Data Pelanggan",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menghubungkan pelanggan dengan pesanan dan pembayaran."
    },
    {
      id: 9,
      code: "PEL-009",
      name: "Pelanggan 9",
      category: "Data Pelanggan",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu pembagian rute distribusi."
    },
    {
      id: 10,
      code: "PEL-010",
      name: "Pelanggan 10",
      category: "Data Pelanggan",
      owner: "Supervisor",
      status: "Aktif",
      description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
    }
  ],
  view: {
    title: "Pelanggan",
    subtitle: "Data Pelanggan",
    description: "Modul untuk mengelola data pelanggan.",
    usage: "Dipakai sebagai referensi saat membuat pesanan, tagihan, dan pengiriman.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Data pelanggan",
        description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
      },
      {
        title: "Referensi transaksi",
        description: "Menghubungkan pelanggan dengan pesanan dan pembayaran."
      },
      {
        title: "Kelompok wilayah",
        description: "Membantu pembagian rute distribusi."
      }
    ],
    mode: "tracking",
    headingTitle: "Lacak Kiriman Pelanggan",
    primaryActionLabel: "Tambah Data",
    dummyData: [
      {
        id: 1,
        code: "PEL-001",
        name: "Pelanggan 1",
        category: "Data Pelanggan",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
      },
      {
        id: 2,
        code: "PEL-002",
        name: "Pelanggan 2",
        category: "Data Pelanggan",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menghubungkan pelanggan dengan pesanan dan pembayaran."
      },
      {
        id: 3,
        code: "PEL-003",
        name: "Pelanggan 3",
        category: "Data Pelanggan",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu pembagian rute distribusi."
      },
      {
        id: 4,
        code: "PEL-004",
        name: "Pelanggan 4",
        category: "Data Pelanggan",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
      },
      {
        id: 5,
        code: "PEL-005",
        name: "Pelanggan 5",
        category: "Data Pelanggan",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Menghubungkan pelanggan dengan pesanan dan pembayaran."
      },
      {
        id: 6,
        code: "PEL-006",
        name: "Pelanggan 6",
        category: "Data Pelanggan",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Membantu pembagian rute distribusi."
      },
      {
        id: 7,
        code: "PEL-007",
        name: "Pelanggan 7",
        category: "Data Pelanggan",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
      },
      {
        id: 8,
        code: "PEL-008",
        name: "Pelanggan 8",
        category: "Data Pelanggan",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menghubungkan pelanggan dengan pesanan dan pembayaran."
      },
      {
        id: 9,
        code: "PEL-009",
        name: "Pelanggan 9",
        category: "Data Pelanggan",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu pembagian rute distribusi."
      },
      {
        id: 10,
        code: "PEL-010",
        name: "Pelanggan 10",
        category: "Data Pelanggan",
        owner: "Supervisor",
        status: "Aktif",
        description: "Menyimpan nama, kontak, alamat, dan wilayah pelanggan."
      }
    ],
    trackingSteps: [
      {
        title: "Pesanan diterima",
        detail: "Nomor transaksi LP-92837456 sudah tercatat.",
        state: "done",
        className: "is-done"
      },
      {
        title: "Diproses di gudang",
        detail: "Barang selesai dikemas dan menunggu armada.",
        state: "done",
        className: "is-done"
      },
      {
        title: "Dalam perjalanan",
        detail: "Kurir sedang menuju alamat penerima.",
        state: "active",
        className: "is-active"
      },
      {
        title: "Sampai di tujuan",
        detail: "Menunggu konfirmasi penerima.",
        state: "next",
        className: "is-next"
      },
      {
        title: "Pemeriksaan dokumen",
        detail: "Surat jalan dan invoice sudah dipasangkan ke pengiriman.",
        state: "next",
        className: "is-next"
      },
      {
        title: "Pindai gudang transit",
        detail: "Barang akan dipindai ulang saat masuk titik transit.",
        state: "next",
        className: "is-next"
      },
      {
        title: "Konfirmasi armada",
        detail: "Pengemudi mengonfirmasi rute dan estimasi tiba.",
        state: "next",
        className: "is-next"
      },
      {
        title: "Menuju alamat penerima",
        detail: "Pengiriman masuk rute akhir menuju pelanggan.",
        state: "next",
        className: "is-next"
      },
      {
        title: "Menunggu tanda terima",
        detail: "Sistem menunggu bukti terima dari penerima.",
        state: "next",
        className: "is-next"
      },
      {
        title: "Arsip selesai",
        detail: "Dokumen pengiriman akan disimpan setelah bukti diterima.",
        state: "next",
        className: "is-next"
      }
    ],
    helpCards: [
      {
        title: "Bantuan Pelacakan",
        description: "Periksa arti status kiriman dan estimasi kedatangan."
      },
      {
        title: "Hubungi Bantuan",
        description: "Terhubung dengan tim layanan pelanggan."
      },
      {
        title: "Klaim Asuransi",
        description: "Ajukan perlindungan untuk barang rusak atau hilang."
      },
      {
        title: "Ubah Alamat",
        description: "Ajukan perubahan alamat sebelum barang masuk rute akhir."
      },
      {
        title: "Jadwal Ulang",
        description: "Atur ulang waktu penerimaan jika penerima belum tersedia."
      },
      {
        title: "Bukti Terima",
        description: "Lihat ringkasan dokumen setelah pengiriman selesai."
      },
      {
        title: "Cek Biaya",
        description: "Pantau biaya tambahan dan layanan prioritas."
      },
      {
        title: "Kontak Kurir",
        description: "Minta pembaruan posisi pengiriman dari petugas."
      },
      {
        title: "Riwayat Kiriman",
        description: "Lihat pengiriman pelanggan yang pernah diproses."
      },
      {
        title: "Panduan Layanan",
        description: "Baca ketentuan layanan distribusi dan pengiriman."
      }
    ],
    formTitle: "Tambah pelanggan",
    formSubtitle: "Formulir Pelanggan",
    formSubmitLabel: "Simpan Pelanggan",
    formSuccessMessage: "Data pelanggan berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "customerCode",
        label: "Kode pelanggan",
        type: "text",
        value: "PEL-011"
      },
      {
        id: "customerName",
        label: "Nama pelanggan",
        type: "text",
        value: ""
      },
      {
        id: "area",
        label: "Wilayah",
        type: "select",
        value: "Makassar",
        options: ["Makassar", "Maros", "Gowa", "Parepare"]
      },
      {
        id: "status",
        label: "Status",
        type: "select",
        value: "Aktif",
        options: ["Aktif", "Diproses", "Perlu ditinjau"]
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
