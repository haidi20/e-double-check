import { syncStateHmr } from '@/core/vm/registerStateHmr'
import type { RoutesState } from '@/features/distribution/routes/type/routesTypes'

export const routesState: RoutesState = {
  title: "Rute Pengiriman",
  subtitle: "Rute Distribusi",
  description: "Modul untuk mengatur jalur dan wilayah pengiriman.",
  usage: "Dipakai untuk membantu pembagian pengiriman berdasarkan wilayah, pelanggan, dan kendaraan.",
  status: "Status: siap dikembangkan.",
  actions: [
    {
      title: "Atur wilayah",
      description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
    },
    {
      title: "Susun jalur",
      description: "Menentukan urutan kunjungan pengiriman."
    },
    {
      title: "Optimalkan armada",
      description: "Membantu penggunaan kendaraan secara lebih efisien."
    }
  ],
  dummyData: [
    {
      id: 1,
      code: "RUT-001",
      name: "Rute Pengiriman 1",
      category: "Rute Distribusi",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
    },
    {
      id: 2,
      code: "RUT-002",
      name: "Rute Pengiriman 2",
      category: "Rute Distribusi",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menentukan urutan kunjungan pengiriman."
    },
    {
      id: 3,
      code: "RUT-003",
      name: "Rute Pengiriman 3",
      category: "Rute Distribusi",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu penggunaan kendaraan secara lebih efisien."
    },
    {
      id: 4,
      code: "RUT-004",
      name: "Rute Pengiriman 4",
      category: "Rute Distribusi",
      owner: "Supervisor",
      status: "Aktif",
      description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
    },
    {
      id: 5,
      code: "RUT-005",
      name: "Rute Pengiriman 5",
      category: "Rute Distribusi",
      owner: "Admin Operasional",
      status: "Diproses",
      description: "Menentukan urutan kunjungan pengiriman."
    },
    {
      id: 6,
      code: "RUT-006",
      name: "Rute Pengiriman 6",
      category: "Rute Distribusi",
      owner: "Supervisor",
      status: "Perlu ditinjau",
      description: "Membantu penggunaan kendaraan secara lebih efisien."
    },
    {
      id: 7,
      code: "RUT-007",
      name: "Rute Pengiriman 7",
      category: "Rute Distribusi",
      owner: "Admin Operasional",
      status: "Aktif",
      description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
    },
    {
      id: 8,
      code: "RUT-008",
      name: "Rute Pengiriman 8",
      category: "Rute Distribusi",
      owner: "Supervisor",
      status: "Diproses",
      description: "Menentukan urutan kunjungan pengiriman."
    },
    {
      id: 9,
      code: "RUT-009",
      name: "Rute Pengiriman 9",
      category: "Rute Distribusi",
      owner: "Admin Operasional",
      status: "Perlu ditinjau",
      description: "Membantu penggunaan kendaraan secara lebih efisien."
    },
    {
      id: 10,
      code: "RUT-010",
      name: "Rute Pengiriman 10",
      category: "Rute Distribusi",
      owner: "Supervisor",
      status: "Aktif",
      description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
    }
  ],
  view: {
    title: "Rute Pengiriman",
    subtitle: "Rute Distribusi",
    description: "Modul untuk mengatur jalur dan wilayah pengiriman.",
    usage: "Dipakai untuk membantu pembagian pengiriman berdasarkan wilayah, pelanggan, dan kendaraan.",
    status: "Status: siap dikembangkan.",
    actions: [
      {
        title: "Atur wilayah",
        description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
      },
      {
        title: "Susun jalur",
        description: "Menentukan urutan kunjungan pengiriman."
      },
      {
        title: "Optimalkan armada",
        description: "Membantu penggunaan kendaraan secara lebih efisien."
      }
    ],
    mode: "operations",
    headingTitle: "Rute Pengiriman",
    primaryActionLabel: "Buat Data Baru",
    dummyData: [
      {
        id: 1,
        code: "RUT-001",
        name: "Rute Pengiriman 1",
        category: "Rute Distribusi",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
      },
      {
        id: 2,
        code: "RUT-002",
        name: "Rute Pengiriman 2",
        category: "Rute Distribusi",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menentukan urutan kunjungan pengiriman."
      },
      {
        id: 3,
        code: "RUT-003",
        name: "Rute Pengiriman 3",
        category: "Rute Distribusi",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu penggunaan kendaraan secara lebih efisien."
      },
      {
        id: 4,
        code: "RUT-004",
        name: "Rute Pengiriman 4",
        category: "Rute Distribusi",
        owner: "Supervisor",
        status: "Aktif",
        description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
      },
      {
        id: 5,
        code: "RUT-005",
        name: "Rute Pengiriman 5",
        category: "Rute Distribusi",
        owner: "Admin Operasional",
        status: "Diproses",
        description: "Menentukan urutan kunjungan pengiriman."
      },
      {
        id: 6,
        code: "RUT-006",
        name: "Rute Pengiriman 6",
        category: "Rute Distribusi",
        owner: "Supervisor",
        status: "Perlu ditinjau",
        description: "Membantu penggunaan kendaraan secara lebih efisien."
      },
      {
        id: 7,
        code: "RUT-007",
        name: "Rute Pengiriman 7",
        category: "Rute Distribusi",
        owner: "Admin Operasional",
        status: "Aktif",
        description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
      },
      {
        id: 8,
        code: "RUT-008",
        name: "Rute Pengiriman 8",
        category: "Rute Distribusi",
        owner: "Supervisor",
        status: "Diproses",
        description: "Menentukan urutan kunjungan pengiriman."
      },
      {
        id: 9,
        code: "RUT-009",
        name: "Rute Pengiriman 9",
        category: "Rute Distribusi",
        owner: "Admin Operasional",
        status: "Perlu ditinjau",
        description: "Membantu penggunaan kendaraan secara lebih efisien."
      },
      {
        id: 10,
        code: "RUT-010",
        name: "Rute Pengiriman 10",
        category: "Rute Distribusi",
        owner: "Supervisor",
        status: "Aktif",
        description: "Mengelompokkan pelanggan berdasarkan wilayah pengiriman."
      }
    ],
    operationMetrics: [
      {
        label: "Pesanan Aktif",
        value: "78",
        trend: "+12%",
        icon: "PA",
        progress: 76,
        progressWidth: "76%"
      },
      {
        label: "Selesai Hari Ini",
        value: "40",
        trend: "+8%",
        icon: "SH",
        progress: 68,
        progressWidth: "68%"
      },
      {
        label: "Perlu Tindak Lanjut",
        value: "5",
        trend: "-3%",
        icon: "TL",
        progress: 34,
        progressWidth: "34%"
      }
    ],
    searchPlaceholder: "Cari data rute pengiriman",
    operationRows: [
      {
        code: "TRX-98234-JKT",
        primary: "PT Sinar Abadi",
        secondary: "Jakarta Timur - Bekasi",
        owner: "Budi Santoso",
        status: "Diproses",
        amount: "24 koli"
      },
      {
        code: "TRX-98235-MKS",
        primary: "CV Maju Bersama",
        secondary: "Prioritas",
        owner: "Siti Wahyuni",
        status: "Dalam perjalanan",
        amount: "12 koli"
      },
      {
        code: "TRX-98236-BPN",
        primary: "Toko Lautan Jaya",
        secondary: "Terjadwal",
        owner: "Andi Pratama",
        status: "Menunggu jadwal",
        amount: "8 koli"
      },
      {
        code: "TRX-98237-SBY",
        primary: "PT Delta Niaga",
        secondary: "Ekonomi",
        owner: "Rina Melati",
        status: "Selesai",
        amount: "18 koli"
      },
      {
        code: "TRX-98238-BDG",
        primary: "UD Cipta Mandiri",
        secondary: "Bandung Kota - Cimahi",
        owner: "Dewi Kartika",
        status: "Diproses",
        amount: "31 koli"
      },
      {
        code: "TRX-98239-DPS",
        primary: "Bali Retail Group",
        secondary: "Prioritas",
        owner: "Fajar Nugroho",
        status: "Dalam perjalanan",
        amount: "15 koli"
      },
      {
        code: "TRX-98240-MDN",
        primary: "PT Medan Logistik",
        secondary: "Butuh verifikasi dokumen",
        owner: "Nadia Putri",
        status: "Menunggu dokumen",
        amount: "20 koli"
      },
      {
        code: "TRX-98241-SMR",
        primary: "CV Borneo Jaya",
        secondary: "Samarinda - Tenggarong",
        owner: "Raka Saputra",
        status: "Diproses",
        amount: "11 koli"
      },
      {
        code: "TRX-98242-PLM",
        primary: "Toko Sriwijaya",
        secondary: "Perlu tindak lanjut",
        owner: "Maya Lestari",
        status: "Tertunda",
        amount: "9 koli"
      },
      {
        code: "TRX-98243-MDO",
        primary: "PT Celebes Utara",
        secondary: "Ekonomi",
        owner: "Agus Salim",
        status: "Selesai",
        amount: "27 koli"
      }
    ],
    formTitle: "Detail rute pengiriman",
    formSubtitle: "Susun Rute",
    formSubmitLabel: "Simpan Rute",
    formSuccessMessage: "Rute berhasil disimpan sebagai draft.",
    isFormModalOpen: false,
    isFormSubmitted: false,
    formFields: [
      {
        id: "routeNumber",
        label: "Nomor rute",
        type: "text",
        value: "RTE-20260526",
        readonly: true
      },
      {
        id: "fleet",
        label: "Armada",
        type: "select",
        value: "Unit 04 Outbound",
        options: ["Unit 04 Outbound", "Unit 08 Timur"]
      },
      {
        id: "area",
        label: "Wilayah",
        type: "text",
        value: "Makassar - Maros"
      },
      {
        id: "note",
        label: "Catatan",
        type: "textarea",
        value: "Urutkan kunjungan berdasarkan prioritas dan kapasitas armada.",
        rows: 4,
        wide: true
      }
    ]
  }
}


if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    syncStateHmr('routesState', module, 'routesState')
  })
}

