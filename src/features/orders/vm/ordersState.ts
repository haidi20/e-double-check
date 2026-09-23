import { syncStateHmr } from '@/core/vm/registerStateHmr'
import type { OrdersState } from '@/features/orders/type/ordersTypes'

const dummyData = [
  {
    id: 1,
    code: 'PSN-001',
    name: 'Pesanan Kerja 1',
    category: 'Impor Faktur',
    owner: 'Admin Pesanan Kerja',
    status: 'Siap kirim',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  },
  {
    id: 2,
    code: 'PSN-002',
    name: 'Pesanan Kerja 2',
    category: 'Impor Faktur',
    owner: 'Admin Pesanan Kerja',
    status: 'Terverifikasi',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  },
  {
    id: 3,
    code: 'PSN-003',
    name: 'Pesanan Kerja 3',
    category: 'Impor Faktur',
    owner: 'Supervisor',
    status: 'Menunggu cek',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  },
  {
    id: 4,
    code: 'PSN-004',
    name: 'Pesanan Kerja 4',
    category: 'Impor Faktur',
    owner: 'Admin Pesanan Kerja',
    status: 'Siap kirim',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  },
  {
    id: 5,
    code: 'PSN-005',
    name: 'Pesanan Kerja 5',
    category: 'Impor Faktur',
    owner: 'Admin Pesanan Kerja',
    status: 'Terverifikasi',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  },
  {
    id: 6,
    code: 'PSN-006',
    name: 'Pesanan Kerja 6',
    category: 'Impor Faktur',
    owner: 'Supervisor',
    status: 'Menunggu cek',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  },
  {
    id: 7,
    code: 'PSN-007',
    name: 'Pesanan Kerja 7',
    category: 'Impor Faktur',
    owner: 'Admin Pesanan Kerja',
    status: 'Siap kirim',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  },
  {
    id: 8,
    code: 'PSN-008',
    name: 'Pesanan Kerja 8',
    category: 'Impor Faktur',
    owner: 'Admin Pesanan Kerja',
    status: 'Terverifikasi',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  },
  {
    id: 9,
    code: 'PSN-009',
    name: 'Pesanan Kerja 9',
    category: 'Impor Faktur',
    owner: 'Supervisor',
    status: 'Perlu koreksi',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  },
  {
    id: 10,
    code: 'PSN-010',
    name: 'Pesanan Kerja 10',
    category: 'Impor Faktur',
    owner: 'Admin Pesanan Kerja',
    status: 'Siap kirim',
    description: 'Pesanan kerja dibuat dari hasil impor faktur cetak pelanggan.'
  }
]

export const ordersState: OrdersState = {
  title: 'Pesanan Kerja',
  subtitle: 'Impor Faktur',
  description: 'Menu untuk membuat pesanan kerja dari hasil impor faktur cetak pelanggan.',
  usage: 'Dipakai sebagai sumber data sebelum pengiriman dibuat berisi satu atau banyak faktur.',
  status: 'Status: siap dikembangkan.',
  actions: [
    {
      title: 'Impor faktur',
      description: 'Memasukkan file faktur hasil cetak ke dalam data pesanan kerja.'
    },
    {
      title: 'Baca barang',
      description: 'Menampilkan kode barang, nama barang, satuan, qty, harga, dan jumlah.'
    },
    {
      title: 'Siapkan pengiriman',
      description: 'Menandai faktur yang sudah siap masuk ke pengiriman.'
    }
  ],
  dummyData,
  view: {
    title: 'Pesanan Kerja',
    subtitle: 'Impor Faktur',
    description: 'Menu untuk membuat pesanan kerja dari hasil impor faktur cetak pelanggan.',
    usage: 'Dipakai sebagai sumber data sebelum pengiriman dibuat berisi satu atau banyak faktur.',
    status: 'Status: siap dikembangkan.',
    actions: [
      {
        title: 'Impor faktur',
        description: 'Memasukkan file faktur hasil cetak ke dalam data pesanan kerja.'
      },
      {
        title: 'Baca barang',
        description: 'Menampilkan kode barang, nama barang, satuan, qty, harga, dan jumlah.'
      },
      {
        title: 'Siapkan pengiriman',
        description: 'Menandai faktur yang sudah siap masuk ke pengiriman.'
      }
    ],
    mode: 'operations',
    headingTitle: 'Pesanan Kerja',
    primaryActionLabel: 'Masukkan Faktur',
    reviewTitle: 'Meninjau Faktur',
    isImportModalOpen: false,
    isImportReviewOpen: false,
    isImportSubmitted: false,
    importFileLabel: 'faktur.jpeg',
    importFileHint: 'Format yang diterima: PDF, JPG, JPEG, atau PNG.',
    importEyebrow: 'Masukkan Faktur',
    importUploadTitle: 'Masukkan File Faktur',
    importUploadDescription: 'Pilih file faktur, lalu proses untuk melihat hasil tinjauan.',
    importReviewDescription: 'Periksa hasil baca faktur sebelum dikirim ke pesanan kerja.',
    importDropzoneBadge: 'PDF',
    importDropzoneTitle: 'Letakkan file faktur di sini',
    importSelectLabel: 'Pilih File',
    importChangeLabel: 'Ganti File',
    importActiveFileLabel: 'File yang diproses',
    importSelectedFilePrefix: 'File dipilih:',
    importProcessLabel: 'Proses',
    importSendLabel: 'Kirim',
    importCloseLabel: 'Tutup',
    importCancelLabel: 'Batal',
    importSuccessMessage: 'Faktur berhasil dikirim ke daftar pesanan kerja.',
    importChecklist: [
      'Nomor faktur terbaca',
      'Barang dan qty siap ditinjau',
      'Pelanggan masuk ke pesanan kerja'
    ],
    selectedImportFileName: '',
    selectedImportFileType: '',
    selectedImportFileSize: '',
    selectedImportFileUrl: '',
    dummyData,
    orderMetrics: [
      {
        label: 'Faktur Diimpor',
        value: '1',
        trend: 'baru',
        icon: 'IF',
        progress: 100,
        progressWidth: '100%'
      },
      {
        label: 'Barang Terbaca',
        value: '2',
        trend: 'valid',
        icon: 'BT',
        progress: 100,
        progressWidth: '100%'
      },
      {
        label: 'Total Faktur',
        value: '3.746.781',
        trend: 'Rp',
        icon: 'TF',
        progress: 78,
        progressWidth: '78%'
      }
    ],
    searchPlaceholder: 'Cari nomor pesanan, nomor faktur, pelanggan, barang, atau petugas penjualan',
    orderRows: [
      {
        orderNumber: 'PSN-250526-001',
        invoiceNumber: 'J260530743',
        customerName: 'ALI MIE BARONANG',
        printDate: '25 Mei 2026',
        salesman: 'DIDI PURNOMO',
        itemSummary: 'TEPUNG TERIGU BOLA SALJU @1KG, TEPUNG HIKARI HIJAU @25KG',
        totalQty: '25',
        totalAmount: 'Rp3.746.781',
        status: 'Siap kirim'
      },
      {
        orderNumber: 'PSN-250526-002',
        invoiceNumber: 'J260530744',
        customerName: 'TOKO SINAR PAGI',
        printDate: '25 Mei 2026',
        salesman: 'DIDI PURNOMO',
        itemSummary: 'Gula pasir, minyak goreng',
        totalQty: '32',
        totalAmount: 'Rp4.125.000',
        status: 'Terverifikasi'
      },
      {
        orderNumber: 'PSN-250526-003',
        invoiceNumber: 'J260530745',
        customerName: 'CV MAJU JAYA',
        printDate: '25 Mei 2026',
        salesman: 'ANDI PRATAMA',
        itemSummary: 'Beras premium, tepung segitiga',
        totalQty: '41',
        totalAmount: 'Rp6.820.000',
        status: 'Menunggu cek'
      },
      {
        orderNumber: 'PSN-250526-004',
        invoiceNumber: 'J260530746',
        customerName: 'UD LAUTAN RASA',
        printDate: '24 Mei 2026',
        salesman: 'RINA MELATI',
        itemSummary: 'Mie kering, saus sambal',
        totalQty: '54',
        totalAmount: 'Rp5.390.000',
        status: 'Siap kirim'
      },
      {
        orderNumber: 'PSN-250526-005',
        invoiceNumber: 'J260530747',
        customerName: 'TOKO BARONANG DUA',
        printDate: '24 Mei 2026',
        salesman: 'DIDI PURNOMO',
        itemSummary: 'Tepung terigu, margarin',
        totalQty: '18',
        totalAmount: 'Rp2.980.000',
        status: 'Terverifikasi'
      },
      {
        orderNumber: 'PSN-250526-006',
        invoiceNumber: 'J260530748',
        customerName: 'ALI MIE CABANG LOA',
        printDate: '24 Mei 2026',
        salesman: 'BUDI SANTOSO',
        itemSummary: 'Tepung roti, minyak goreng',
        totalQty: '27',
        totalAmount: 'Rp3.460.000',
        status: 'Siap kirim'
      },
      {
        orderNumber: 'PSN-250526-007',
        invoiceNumber: 'J260530749',
        customerName: 'TOKO SUMBER MAKMUR',
        printDate: '23 Mei 2026',
        salesman: 'SITI WAHYUNI',
        itemSummary: 'Kecap, saus tomat',
        totalQty: '36',
        totalAmount: 'Rp2.745.000',
        status: 'Menunggu cek'
      },
      {
        orderNumber: 'PSN-250526-008',
        invoiceNumber: 'J260530750',
        customerName: 'CV BORNEO MANDIRI',
        printDate: '23 Mei 2026',
        salesman: 'RINA MELATI',
        itemSummary: 'Beras, tepung, gula',
        totalQty: '63',
        totalAmount: 'Rp8.510.000',
        status: 'Terverifikasi'
      },
      {
        orderNumber: 'PSN-250526-009',
        invoiceNumber: 'J260530751',
        customerName: 'TOKO SERBA ADA',
        printDate: '23 Mei 2026',
        salesman: 'ANDI PRATAMA',
        itemSummary: 'Minyak goreng, mie instan',
        totalQty: '44',
        totalAmount: 'Rp4.630.000',
        status: 'Perlu koreksi'
      },
      {
        orderNumber: 'PSN-250526-010',
        invoiceNumber: 'J260530752',
        customerName: 'PT MADINA RETAIL',
        printDate: '22 Mei 2026',
        salesman: 'DIDI PURNOMO',
        itemSummary: 'Tepung premium, gula halus',
        totalQty: '52',
        totalAmount: 'Rp7.225.000',
        status: 'Siap kirim'
      }
    ],
    selectedOrder: {
      orderNumber: 'PSN-250526-001',
      invoiceNumber: 'J260530743',
      supplierName: 'CV. SUKSES BERKAT MADINA',
      customerName: 'ALI MIE BARONANG',
      customerAddress: 'JL PEMUDA II BLOK',
      invoiceDate: '25 Mei 2026',
      dueDate: '8 Juni 2026',
      salesman: 'DIDI PURNOMO',
      sourceFileName: 'faktur.jpeg',
      sourceFileUrl: '/files/faktur.jpeg',
      sourceFileType: 'JPEG',
      subtotal: 'Rp3.375.478',
      tax: 'Rp371.303',
      totalAmount: 'Rp3.746.781',
      status: 'Siap kirim',
      products: [
        {
          code: 'BRG-TERIGU-001',
          name: 'TEPUNG TERIGU BOLA SALJU @1KG',
          unit: 'CRT',
          qty: 15,
          price: 'Rp95.903',
          amount: 'Rp1.438.541'
        },
        {
          code: 'BRG-HIKARI-025',
          name: 'TEPUNG HIKARI HIJAU @25KG',
          unit: 'SAK',
          qty: 10,
          price: 'Rp193.694',
          amount: 'Rp1.936.937'
        }
      ],
      employees: [
        {
          name: 'DIDI PURNOMO',
          role: 'Petugas penjualan'
        },
        {
          name: 'Admin Pesanan Kerja',
          role: 'Petugas impor'
        },
        {
          name: 'Petugas Gudang',
          role: 'Pemeriksa barang'
        }
      ]
    },
    reviewSummary: {
      amountInWords: 'Tiga juta tujuh ratus empat puluh enam ribu tujuh ratus delapan puluh satu rupiah',
      discount: 'Rp0',
      receiverLabel: 'Penerima',
      senderLabel: 'Hormat kami',
      paymentTitle: 'Pembayaran dapat ditransfer ke Rekening',
      paymentBankRows: ['CV. SUKSES BERKAT MADINA', 'BCA : 513-509-8989', 'OCBC : 280-80000-959-7']
    },
    formTitle: 'Tambah order pesanan',
    formSubtitle: 'Input Manual',
    formSubmitLabel: 'Simpan Pesanan Kerja',
    formSuccessMessage: 'Order pesanan manual berhasil disimpan sebagai draft.',
    isFormModalOpen: false,
    isFormSubmitted: false,
    formCustomers: [
      {
        code: 'CUST-ALI-BARONANG',
        name: 'ALI MIE BARONANG',
        address: 'JL PEMUDA II BLOK, Samarinda'
      },
      {
        code: 'CUST-SINAR-PAGI',
        name: 'TOKO SINAR PAGI',
        address: 'JL AWANG LONG NO. 18, Samarinda'
      },
      {
        code: 'CUST-CV-MAJU',
        name: 'CV MAJU JAYA',
        address: 'JL PANGERAN ANTASARI NO. 45, Samarinda'
      },
      {
        code: 'CUST-LAUTAN-RASA',
        name: 'UD LAUTAN RASA',
        address: 'JL IR. SUTAMI BLOK GUDANG A3, Samarinda'
      },
      {
        code: 'CUST-MADINA-RETAIL',
        name: 'PT MADINA RETAIL',
        address: 'JL AHMAD YANI NO. 72, Samarinda'
      }
    ],
    formProducts: [
      {
        code: 'BRG-TERIGU-001',
        name: 'TEPUNG TERIGU BOLA SALJU @1KG',
        unit: 'CRT'
      },
      {
        code: 'BRG-HIKARI-025',
        name: 'TEPUNG HIKARI HIJAU @25KG',
        unit: 'SAK'
      },
      {
        code: 'BRG-BERAS-001',
        name: 'Beras Premium 25KG',
        unit: 'Karung'
      },
      {
        code: 'BRG-GULA-001',
        name: 'Gula Pasir 1KG',
        unit: 'Dus'
      },
      {
        code: 'BRG-MINYAK-002',
        name: 'Minyak Goreng 2L',
        unit: 'Dus'
      }
    ],
    formManual: {
      invoiceNumber: 'J260530753',
      customerCode: 'CUST-ALI-BARONANG',
      items: [
        {
          id: 'manual-item-1',
          productCode: 'BRG-TERIGU-001',
          qty: '1'
        }
      ]
    },
    returnTitle: 'Retur Barang',
    returnSubtitle: 'Retur Faktur',
    returnSubmitLabel: 'Simpan Retur',
    returnSuccessMessage: 'Retur barang berhasil dicatat berdasarkan nomor faktur.',
    returnPolicy: [
      {
        title: 'Pilih nomor faktur',
        description: 'Retur wajib memakai nomor faktur yang sudah masuk ke aplikasi e-distribusi.'
      },
      {
        title: 'Pilih barang yang diretur',
        description: 'Barang retur dipilih dari isi faktur agar stok dan customer tetap sesuai data Accurate.'
      },
      {
        title: 'Isi jumlah item retur',
        description: 'Jumlah item yang dikembalikan dicatat sebagai dasar penyesuaian stok.'
      },
      {
        title: 'Berikan catatan',
        description: 'Catatan menjelaskan alasan retur, kondisi barang, atau keterangan lain untuk gudang.'
      }
    ],
    returnForm: {
      invoiceNumber: 'J260530743',
      note: 'Barang rusak saat diterima outlet.',
      items: [
        {
          id: 'return-BRG-TERIGU-001',
          code: 'BRG-TERIGU-001',
          name: 'TEPUNG TERIGU BOLA SALJU @1KG',
          unit: 'CRT',
          invoiceQty: 15,
          returnQty: '1',
          checked: true
        },
        {
          id: 'return-BRG-HIKARI-025',
          code: 'BRG-HIKARI-025',
          name: 'TEPUNG HIKARI HIJAU @25KG',
          unit: 'SAK',
          invoiceQty: 10,
          returnQty: '1',
          checked: false
        }
      ]
    },
    isReturnModalOpen: false,
    isReturnSubmitted: false,
    importNotes: [
      'File contoh dibaca dari public/files/faktur.jpeg.',
      'Faktur masuk ke pesanan kerja, lalu bisa dipilih saat membuat pengiriman.',
      'Barang wajib menyimpan kode barang, nama barang, satuan, dan qty.'
    ]
  }
}


if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    syncStateHmr('ordersState', module, 'ordersState')
  })
}

