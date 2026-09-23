import type { ShipmentsState } from '@/features/distribution/shipments/type/shipmentsTypes'

const dummyData = [
  {
    id: 1,
    code: 'KRM-001',
    name: 'Pengiriman 1',
    category: 'Pengiriman Multi Faktur',
    owner: 'Admin Distribusi',
    status: 'Dijadwalkan',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  },
  {
    id: 2,
    code: 'KRM-002',
    name: 'Pengiriman 2',
    category: 'Pengiriman Multi Faktur',
    owner: 'Supervisor',
    status: 'Dalam perjalanan',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  },
  {
    id: 3,
    code: 'KRM-003',
    name: 'Pengiriman 3',
    category: 'Pengiriman Multi Faktur',
    owner: 'Admin Distribusi',
    status: 'Menunggu armada',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  },
  {
    id: 4,
    code: 'KRM-004',
    name: 'Pengiriman 4',
    category: 'Pengiriman Multi Faktur',
    owner: 'Supervisor',
    status: 'Selesai',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  },
  {
    id: 5,
    code: 'KRM-005',
    name: 'Pengiriman 5',
    category: 'Pengiriman Multi Faktur',
    owner: 'Admin Distribusi',
    status: 'Dijadwalkan',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  },
  {
    id: 6,
    code: 'KRM-006',
    name: 'Pengiriman 6',
    category: 'Pengiriman Multi Faktur',
    owner: 'Supervisor',
    status: 'Dalam perjalanan',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  },
  {
    id: 7,
    code: 'KRM-007',
    name: 'Pengiriman 7',
    category: 'Pengiriman Multi Faktur',
    owner: 'Admin Distribusi',
    status: 'Menunggu armada',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  },
  {
    id: 8,
    code: 'KRM-008',
    name: 'Pengiriman 8',
    category: 'Pengiriman Multi Faktur',
    owner: 'Supervisor',
    status: 'Selesai',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  },
  {
    id: 9,
    code: 'KRM-009',
    name: 'Pengiriman 9',
    category: 'Pengiriman Multi Faktur',
    owner: 'Admin Distribusi',
    status: 'Dijadwalkan',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  },
  {
    id: 10,
    code: 'KRM-010',
    name: 'Pengiriman 10',
    category: 'Pengiriman Multi Faktur',
    owner: 'Supervisor',
    status: 'Dalam perjalanan',
    description: 'Satu pengiriman dapat berisi banyak faktur dengan driver dan kendaraan opsional.'
  }
]

export const shipmentsState: ShipmentsState = {
  title: 'Pengiriman',
  subtitle: 'Pengiriman Multi Faktur',
  description: 'Modul untuk membuat dan memantau pengiriman yang dapat berisi banyak faktur.',
  usage: 'Dipakai setelah faktur diimport untuk memilih kumpulan faktur, driver opsional, dan kendaraan opsional.',
  status: 'Status: siap dikembangkan.',
  actions: [
    {
      title: 'Kelompokkan faktur',
      description: 'Menggabungkan beberapa faktur ke dalam satu pengiriman.'
    },
    {
      title: 'Pilih driver',
      description: 'Menentukan driver jika sudah tersedia, atau membiarkannya kosong sementara.'
    },
    {
      title: 'Pilih kendaraan',
      description: 'Menentukan kendaraan dari master kendaraan jika armada sudah siap.'
    }
  ],
  dummyData,
  view: {
    title: 'Pengiriman',
    subtitle: 'Pengiriman Multi Faktur',
    description: 'Modul untuk membuat dan memantau pengiriman yang dapat berisi banyak faktur.',
    usage: 'Dipakai setelah faktur diimport untuk memilih kumpulan faktur, driver opsional, dan kendaraan opsional.',
    status: 'Status: siap dikembangkan.',
    actions: [
      {
        title: 'Kelompokkan faktur',
        description: 'Menggabungkan beberapa faktur ke dalam satu pengiriman.'
      },
      {
        title: 'Pilih driver',
        description: 'Menentukan driver jika sudah tersedia, atau membiarkannya kosong sementara.'
      },
      {
        title: 'Pilih kendaraan',
        description: 'Menentukan kendaraan dari master kendaraan jika armada sudah siap.'
      }
    ],
    mode: 'operations',
    headingTitle: 'Pengiriman',
    primaryActionLabel: 'Buat Pengiriman',
    dummyData,
    operationMetrics: [
      {
        label: 'Pengiriman Aktif',
        value: '46',
        trend: '+11%',
        icon: 'PA',
        progress: 76,
        progressWidth: '76%'
      },
      {
        label: 'Faktur Terjadwal',
        value: '132',
        trend: '+15%',
        icon: 'FT',
        progress: 84,
        progressWidth: '84%'
      },
      {
        label: 'Menunggu Armada',
        value: '7',
        trend: '-2%',
        icon: 'MA',
        progress: 32,
        progressWidth: '32%'
      }
    ],
    searchPlaceholder: 'Cari pengiriman, faktur, pelanggan, driver, atau kendaraan',
    shipmentRows: [
      {
        code: 'KRM-260526-001',
        invoiceSummary: 'J260530743, J260530744, J260530745',
        customerSummary: 'ALI MIE BARONANG, TOKO SINAR PAGI, CV MAJU JAYA',
        driverLabel: 'Budi Santoso',
        vehicleLabel: 'DD 8123 SB',
        status: 'Dalam perjalanan',
        loadSummary: '105 dus'
      },
      {
        code: 'KRM-260526-002',
        invoiceSummary: 'INV-260526-003, INV-260526-005',
        customerSummary: 'Toko Lautan Jaya, UD Cipta Mandiri',
        driverLabel: 'Belum dipilih',
        vehicleLabel: 'Belum dipilih',
        status: 'Menunggu armada',
        loadSummary: '43 dus'
      },
      {
        code: 'KRM-260526-003',
        invoiceSummary: 'INV-260526-006, INV-260526-008',
        customerSummary: 'Bali Retail Group, CV Borneo Jaya',
        driverLabel: 'Raka Saputra',
        vehicleLabel: 'DD 7341 AB',
        status: 'Dijadwalkan',
        loadSummary: '53 dus'
      },
      {
        code: 'KRM-260526-004',
        invoiceSummary: 'INV-260526-007',
        customerSummary: 'PT Medan Logistik',
        driverLabel: 'Andi Pratama',
        vehicleLabel: 'DD 9021 MK',
        status: 'Selesai',
        loadSummary: '55 dus'
      },
      {
        code: 'KRM-260526-005',
        invoiceSummary: 'INV-260526-009, INV-260526-010',
        customerSummary: 'Toko Sriwijaya, PT Celebes Utara',
        driverLabel: 'Belum dipilih',
        vehicleLabel: 'DD 1188 PL',
        status: 'Dijadwalkan',
        loadSummary: '64 dus'
      },
      {
        code: 'KRM-260526-006',
        invoiceSummary: 'INV-260525-011, INV-260525-012',
        customerSummary: 'Makassar Retailindo, UD Sinar Laut',
        driverLabel: 'Fajar Nugroho',
        vehicleLabel: 'DD 6610 RD',
        status: 'Dalam perjalanan',
        loadSummary: '48 dus'
      },
      {
        code: 'KRM-260526-007',
        invoiceSummary: 'INV-260525-013',
        customerSummary: 'PT Timur Sejahtera',
        driverLabel: 'Belum dipilih',
        vehicleLabel: 'Belum dipilih',
        status: 'Menunggu armada',
        loadSummary: '26 dus'
      },
      {
        code: 'KRM-260526-008',
        invoiceSummary: 'INV-260525-014, INV-260525-015',
        customerSummary: 'CV Laut Biru, Toko Aneka Rasa',
        driverLabel: 'Agus Salim',
        vehicleLabel: 'DD 4509 LS',
        status: 'Selesai',
        loadSummary: '39 dus'
      },
      {
        code: 'KRM-260526-009',
        invoiceSummary: 'INV-260525-016, INV-260525-017, INV-260525-018',
        customerSummary: 'PT Gowa Mandiri, UD Maros Jaya, Toko Pangkep',
        driverLabel: 'Maya Lestari',
        vehicleLabel: 'DD 3201 GM',
        status: 'Dijadwalkan',
        loadSummary: '72 dus'
      },
      {
        code: 'KRM-260526-010',
        invoiceSummary: 'INV-260525-019',
        customerSummary: 'PT Parepare Niaga',
        driverLabel: 'Nadia Putri',
        vehicleLabel: 'DD 7712 PN',
        status: 'Dalam perjalanan',
        loadSummary: '34 dus'
      }
    ],
    invoiceOptions: [
      {
        invoiceNumber: 'J260530743',
        customerName: 'ALI MIE BARONANG',
        itemSummary: 'TEPUNG TERIGU BOLA SALJU @1KG, TEPUNG HIKARI HIJAU @25KG',
        totalQty: '25 item',
        status: 'Siap kirim',
        selected: true
      },
      {
        invoiceNumber: 'INV-260526-002',
        customerName: 'CV Maju Bersama',
        itemSummary: 'BRG-022, BRG-031',
        totalQty: '28 dus',
        status: 'Siap kirim',
        selected: true
      },
      {
        invoiceNumber: 'INV-260526-004',
        customerName: 'PT Delta Niaga',
        itemSummary: 'BRG-008, BRG-042',
        totalQty: '35 dus',
        status: 'Siap kirim',
        selected: true
      },
      {
        invoiceNumber: 'INV-260526-006',
        customerName: 'Bali Retail Group',
        itemSummary: 'BRG-019, BRG-025',
        totalQty: '31 dus',
        status: 'Siap kirim',
        selected: false
      }
    ],
    driverOptions: [
      {
        id: 'none',
        label: 'Belum dipilih',
        description: 'Driver bisa ditentukan setelah jadwal armada siap.'
      },
      {
        id: 'driver-budi',
        label: 'Budi Santoso',
        description: 'Driver reguler area Makassar dan Gowa.'
      },
      {
        id: 'driver-raka',
        label: 'Raka Saputra',
        description: 'Driver rute luar kota dan pengiriman prioritas.'
      }
    ],
    vehicleOptions: [
      {
        id: 'none',
        label: 'Belum dipilih',
        description: 'Kendaraan bisa dikosongkan saat pengiriman masih draft.'
      },
      {
        id: 'vehicle-dd8123',
        label: 'DD 8123 SB',
        description: 'Truk Box 4 ton, kondisi siap jalan.'
      },
      {
        id: 'vehicle-dd7341',
        label: 'DD 7341 AB',
        description: 'Pickup Box 1.5 ton, cocok rute dalam kota.'
      }
    ],
    selectedShipment: {
      code: 'KRM-260526-001',
      status: 'Dalam perjalanan',
      selectedInvoiceSummary: '3 faktur dipilih, total 105 dus',
      driverLabel: 'Budi Santoso',
      vehicleLabel: 'DD 8123 SB',
      note: 'Pengiriman dibuat dari hasil import faktur dan dapat diperbarui setelah driver atau kendaraan berubah.'
    },
    formTitle: 'Susun pengiriman',
    formSubtitle: 'Pengiriman Baru',
    formSubmitLabel: 'Simpan Pengiriman',
    formSuccessMessage: 'Pengiriman berhasil disimpan sebagai draft.',
    isFormModalOpen: false,
    isFormSubmitted: false
  }
}
