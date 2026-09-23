import type { DeliveryOrdersState } from '@/features/distribution/delivery-orders/type/deliveryOrdersTypes'

export const deliveryOrdersState: DeliveryOrdersState = {
  title: "Surat Jalan",
  subtitle: "Dokumen Pengiriman",
  description: "Modul untuk membuat dan mengelola dokumen pengiriman barang.",
  usage: "Dipakai sebagai acuan barang yang harus dikirim ke pelanggan berdasarkan pesanan.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Buat surat jalan",
      description: "Mencatat satu surat jalan yang dapat berisi banyak faktur."
    },
    {
      title: "Cetak dokumen",
      description: "Menyiapkan dokumen yang dibawa saat pengiriman."
    },
    {
      title: "Hubungkan pesanan",
      description: "Mengaitkan surat jalan dengan beberapa faktur, dengan aturan satu faktur untuk satu pelanggan."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "SUR-001",
      name: "Surat Jalan 1",
      category: "Dokumen Pengiriman",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Mencatat detail barang, pelanggan, dan alamat tujuan."
    },
    {
      id: 2,
      code: "SUR-002",
      name: "Surat Jalan 2",
      category: "Dokumen Pengiriman",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menyiapkan dokumen yang dibawa saat pengiriman."
    },
    {
      id: 3,
      code: "SUR-003",
      name: "Surat Jalan 3",
      category: "Dokumen Pengiriman",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Mengaitkan surat jalan dengan pesanan pelanggan."
    },
    {
      id: 4,
      code: "SUR-004",
      name: "Surat Jalan 4",
      category: "Dokumen Pengiriman",
      owner: "Supervisor",
      status: "Aktif",
      description: "Mencatat detail barang, pelanggan, dan alamat tujuan."
    },
    {
      id: 5,
      code: "SUR-005",
      name: "Surat Jalan 5",
      category: "Dokumen Pengiriman",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Menyiapkan dokumen yang dibawa saat pengiriman."
    },
    {
      id: 6,
      code: "SUR-006",
      name: "Surat Jalan 6",
      category: "Dokumen Pengiriman",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Mengaitkan surat jalan dengan pesanan pelanggan."
    },
    {
      id: 7,
      code: "SUR-007",
      name: "Surat Jalan 7",
      category: "Dokumen Pengiriman",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Mencatat detail barang, pelanggan, dan alamat tujuan."
    },
    {
      id: 8,
      code: "SUR-008",
      name: "Surat Jalan 8",
      category: "Dokumen Pengiriman",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menyiapkan dokumen yang dibawa saat pengiriman."
    },
    {
      id: 9,
      code: "SUR-009",
      name: "Surat Jalan 9",
      category: "Dokumen Pengiriman",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Mengaitkan surat jalan dengan pesanan pelanggan."
    },
    {
      id: 10,
      code: "SUR-010",
      name: "Surat Jalan 10",
      category: "Dokumen Pengiriman",
      owner: "Supervisor",
      status: "Aktif",
      description: "Mencatat detail barang, pelanggan, dan alamat tujuan."
    }
  ],
  view: {
    title: "Surat Jalan",
    subtitle: "Dokumen Pengiriman",
    description: "Modul untuk membuat dan mengelola dokumen pengiriman barang.",
    usage: "Dipakai sebagai acuan pengiriman; satu surat jalan dapat membawa banyak faktur dan satu faktur hanya untuk satu pelanggan.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Buat surat jalan",
        description: "Mencatat satu surat jalan yang dapat berisi banyak faktur."
      },
      {
        title: "Cetak dokumen",
        description: "Menyiapkan dokumen yang dibawa saat pengiriman."
      },
      {
        title: "Hubungkan pesanan",
        description: "Mengaitkan surat jalan dengan beberapa faktur, dengan aturan satu faktur untuk satu pelanggan."
      }
    ],
    mode: "operations",
    headingTitle: "Surat Jalan",
    primaryActionLabel: "Buat Data Baru",
    dummyData: [
      {
        id: 1,
        code: "SUR-001",
        name: "Surat Jalan 1",
        category: "Dokumen Pengiriman",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Mencatat detail barang, pelanggan, dan alamat tujuan."
      },
      {
        id: 2,
        code: "SUR-002",
        name: "Surat Jalan 2",
        category: "Dokumen Pengiriman",
        owner: "Supervisor",
        status: "Draft",
        description: "Menyiapkan dokumen yang dibawa saat pengiriman."
      },
      {
        id: 3,
        code: "SUR-003",
        name: "Surat Jalan 3",
        category: "Dokumen Pengiriman",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Mengaitkan surat jalan dengan pesanan pelanggan."
      },
      {
        id: 4,
        code: "SUR-004",
        name: "Surat Jalan 4",
        category: "Dokumen Pengiriman",
        owner: "Supervisor",
        status: "Aktif",
        description: "Mencatat detail barang, pelanggan, dan alamat tujuan."
      },
      {
        id: 5,
        code: "SUR-005",
        name: "Surat Jalan 5",
        category: "Dokumen Pengiriman",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Menyiapkan dokumen yang dibawa saat pengiriman."
      },
      {
        id: 6,
        code: "SUR-006",
        name: "Surat Jalan 6",
        category: "Dokumen Pengiriman",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Mengaitkan surat jalan dengan pesanan pelanggan."
      },
      {
        id: 7,
        code: "SUR-007",
        name: "Surat Jalan 7",
        category: "Dokumen Pengiriman",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Mencatat detail barang, pelanggan, dan alamat tujuan."
      },
      {
        id: 8,
        code: "SUR-008",
        name: "Surat Jalan 8",
        category: "Dokumen Pengiriman",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menyiapkan dokumen yang dibawa saat pengiriman."
      },
      {
        id: 9,
        code: "SUR-009",
        name: "Surat Jalan 9",
        category: "Dokumen Pengiriman",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Mengaitkan surat jalan dengan pesanan pelanggan."
      },
      {
        id: 10,
        code: "SUR-010",
        name: "Surat Jalan 10",
        category: "Dokumen Pengiriman",
        owner: "Supervisor",
        status: "Aktif",
        description: "Mencatat detail barang, pelanggan, dan alamat tujuan."
      }
    ],
    operationMetrics: [
      {
        label: "Surat Jalan Aktif",
        value: "18",
        trend: "+12%",
        icon: "PA",
        progress: 76,
        progressWidth: "76%"
      },
      {
        label: "Total Faktur Dibawa",
        value: "57",
        trend: "+8%",
        icon: "SH",
        progress: 68,
        progressWidth: "68%"
      },
      {
        label: "Perlu Verifikasi",
        value: "6",
        trend: "-3%",
        icon: "TL",
        progress: 34,
        progressWidth: "34%"
      }
    ],
    searchPlaceholder: "Cari data surat jalan",
    operationRows: [
      {
        code: "SJ-250526-001",
        primary: "3 faktur / 3 pelanggan",
        secondary: "INV-001 Ali Mie Baronang, INV-002 Toko Sinar Pagi, INV-003 CV Maju Jaya",
        owner: "Armada 01 - Budi Santoso",
        status: "Draft",
        amount: "24 Barang"
      },
      {
        code: "SJ-250526-002",
        primary: "2 faktur / 2 pelanggan",
        secondary: "INV-004 UD Lautan Rasa, INV-005 Toko Kopi Timur",
        owner: "Armada 02 - Siti Wahyuni",
        status: "Siap cetak",
        amount: "12 Barang"
      },
      {
        code: "SJ-250526-003",
        primary: "4 faktur / 4 pelanggan",
        secondary: "INV-006 SBM Dago, INV-007 SBM Malioboro, INV-008 SBM Kuta, INV-009 SBM Tunjungan",
        owner: "Armada 03 - Andi Pratama",
        status: "Tercetak",
        amount: "8 Barang"
      },
      {
        code: "SJ-250526-004",
        primary: "1 faktur / 1 pelanggan",
        secondary: "INV-010 PT Delta Niaga",
        owner: "Armada 04 - Rina Melati",
        status: "Dipakai",
        amount: "18 Barang"
      },
      {
        code: "SJ-250526-005",
        primary: "5 faktur / 5 pelanggan",
        secondary: "INV-011 sampai INV-015, masing-masing faktur untuk satu pelanggan",
        owner: "Armada 05 - Dewi Kartika",
        status: "Draft",
        amount: "31 Barang"
      },
      {
        code: "SJ-250526-006",
        primary: "2 faktur / 2 pelanggan",
        secondary: "INV-016 Bali Retail Group, INV-017 CV Borneo Jaya",
        owner: "Armada 06 - Fajar Nugroho",
        status: "Siap cetak",
        amount: "15 Barang"
      },
      {
        code: "SJ-250526-007",
        primary: "3 faktur / 3 pelanggan",
        secondary: "Butuh verifikasi nomor faktur sebelum dicetak",
        owner: "Armada 07 - Nadia Putri",
        status: "Perlu dokumen",
        amount: "20 Barang"
      },
      {
        code: "SJ-250526-008",
        primary: "2 faktur / 2 pelanggan",
        secondary: "INV-021 CV Borneo Jaya, INV-022 Toko Sriwijaya",
        owner: "Armada 08 - Raka Saputra",
        status: "Tercetak",
        amount: "11 Barang"
      },
      {
        code: "SJ-250526-009",
        primary: "1 faktur / 1 pelanggan",
        secondary: "INV-023 Toko Sriwijaya dibatalkan sebelum berangkat",
        owner: "Armada 09 - Maya Lestari",
        status: "Dibatalkan",
        amount: "9 Barang"
      },
      {
        code: "SJ-250526-010",
        primary: "4 faktur / 4 pelanggan",
        secondary: "INV-024 sampai INV-027, masing-masing faktur untuk satu pelanggan",
        owner: "Armada 10 - Agus Salim",
        status: "Dipakai",
        amount: "27 Barang"
      }
    ],
    invoiceRows: [
      {
        invoiceNo: "INV-250526-001",
        customer: "ALI MIE BARONANG",
        itemSummary: "Susu UHT, Kopi Blend, Gelas 16oz",
        itemCount: "8 Barang"
      },
      {
        invoiceNo: "INV-250526-002",
        customer: "TOKO SINAR PAGI",
        itemSummary: "Sirup Karamel, Sedotan, Bubuk Chocolate",
        itemCount: "6 Barang"
      },
      {
        invoiceNo: "INV-250526-003",
        customer: "CV MAJU JAYA",
        itemSummary: "Kopi Blend dan Gelas Custom",
        itemCount: "10 Barang"
      }
    ],
    vehicleSearch: "",
    selectedVehicleId: "KEN-001",
    vehicleOptions: [
      {
        id: "KEN-001",
        label: "DD 8123 SB - Mitsubishi Fuso Box",
        detail: "Truk Box / 4 ton / Driver: Budi Santoso"
      },
      {
        id: "KEN-002",
        label: "DD 7341 AB - Suzuki Carry Box",
        detail: "Pickup Box / 1.5 ton / Driver: Raka Saputra"
      },
      {
        id: "KEN-004",
        label: "DD 1188 PL - Daihatsu Gran Max",
        detail: "Blind Van / 900 kg / Driver: Belum ditetapkan"
      },
      {
        id: "KEN-007",
        label: "DD 3201 GM - Mitsubishi Colt Diesel",
        detail: "Truk Box / 4 ton / Driver: Maya Lestari"
      },
      {
        id: "KEN-009",
        label: "DD 5902 BR - Toyota HiAce Cargo",
        detail: "Blind Van / 1.2 ton / Driver: Siti Wahyuni"
      }
    ],
    formTitle: "Detail surat jalan",
    formSubtitle: "Formulir Dokumen",
    formSubmitLabel: "Simpan Dokumen",
    formSuccessMessage: "Surat jalan berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "deliveryOrderNumber",
        label: "Nomor surat jalan",
        type: "text",
        value: "SJ-98238-MKS",
        readonly: true
      },
      {
        id: "deliveryDate",
        label: "Tanggal kirim",
        type: "text",
        value: "26 Mei 2026"
      },
      {
        id: "note",
        label: "Catatan",
        type: "textarea",
        value: "Satu surat jalan dapat membawa banyak faktur. Pastikan satu nomor faktur hanya berisi satu customer.",
        rows: 4,
        wide: true
      }
    ]
  }
}
