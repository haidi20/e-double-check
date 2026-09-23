import { syncStateHmr } from '@/core/vm/registerStateHmr'
import type { VehiclesState } from '@/features/master-data/vehicles/type/vehiclesTypes'

const dummyData = [
  {
    id: 1,
    code: 'KEN-001',
    name: 'DD 8123 SB',
    category: 'Truk Box',
    owner: 'Budi Santoso',
    status: 'Tersedia',
    description: 'Kendaraan master untuk pengiriman area Makassar dan Gowa.'
  },
  {
    id: 2,
    code: 'KEN-002',
    name: 'DD 7341 AB',
    category: 'Pickup Box',
    owner: 'Raka Saputra',
    status: 'Tersedia',
    description: 'Kendaraan master untuk pengiriman area kota dan rute pendek.'
  },
  {
    id: 3,
    code: 'KEN-003',
    name: 'DD 9021 MK',
    category: 'Truk Box',
    owner: 'Andi Pratama',
    status: 'Dipakai',
    description: 'Kendaraan master untuk pengiriman luar kota.'
  },
  {
    id: 4,
    code: 'KEN-004',
    name: 'DD 1188 PL',
    category: 'Blind Van',
    owner: 'Belum ditetapkan',
    status: 'Tersedia',
    description: 'Kendaraan master untuk pengiriman ringan dan cepat.'
  },
  {
    id: 5,
    code: 'KEN-005',
    name: 'DD 6610 RD',
    category: 'Truk Engkel',
    owner: 'Fajar Nugroho',
    status: 'Dipakai',
    description: 'Kendaraan master untuk muatan sedang.'
  },
  {
    id: 6,
    code: 'KEN-006',
    name: 'DD 4509 LS',
    category: 'Pickup Bak',
    owner: 'Agus Salim',
    status: 'Perawatan',
    description: 'Kendaraan master untuk pengiriman lokal.'
  },
  {
    id: 7,
    code: 'KEN-007',
    name: 'DD 3201 GM',
    category: 'Truk Box',
    owner: 'Maya Lestari',
    status: 'Tersedia',
    description: 'Kendaraan master untuk rute Gowa dan Maros.'
  },
  {
    id: 8,
    code: 'KEN-008',
    name: 'DD 7712 PN',
    category: 'Truk Engkel',
    owner: 'Nadia Putri',
    status: 'Dipakai',
    description: 'Kendaraan master untuk rute Parepare.'
  },
  {
    id: 9,
    code: 'KEN-009',
    name: 'DD 5902 BR',
    category: 'Blind Van',
    owner: 'Siti Wahyuni',
    status: 'Tersedia',
    description: 'Kendaraan master untuk pengiriman retail.'
  },
  {
    id: 10,
    code: 'KEN-010',
    name: 'DD 8706 MA',
    category: 'Truk Box',
    owner: 'Dewi Kartika',
    status: 'Dokumen cek',
    description: 'Kendaraan master untuk pengiriman cabang.'
  }
]

export const vehiclesState: VehiclesState = {
  title: 'Kendaraan',
  subtitle: 'Master Kendaraan',
  description: 'Modul master untuk mengelola data kendaraan yang dipakai pada proses pengiriman.',
  usage: 'Dipakai sebagai referensi pilihan kendaraan saat membuat pengiriman, rute, atau surat jalan.',
  status: 'Status: siap dikembangkan.',
  actions: [
    {
      title: 'Data kendaraan',
      description: 'Menyimpan nomor polisi, tipe kendaraan, kapasitas, depo, dan status dokumen.'
    },
    {
      title: 'Driver default',
      description: 'Menghubungkan kendaraan dengan driver bawaan jika sudah ada penugasan tetap.'
    },
    {
      title: 'Kesiapan armada',
      description: 'Membantu admin memilih kendaraan yang tersedia saat membuat pengiriman.'
    }
  ],
  dummyData,
  view: {
    title: 'Kendaraan',
    subtitle: 'Master Kendaraan',
    description: 'Modul master untuk mengelola data kendaraan yang dipakai pada proses pengiriman.',
    usage: 'Dipakai sebagai referensi pilihan kendaraan saat membuat pengiriman, rute, atau surat jalan.',
    status: 'Status: siap dikembangkan.',
    actions: [
      {
        title: 'Data kendaraan',
        description: 'Menyimpan nomor polisi, tipe kendaraan, kapasitas, depo, dan status dokumen.'
      },
      {
        title: 'Driver default',
        description: 'Menghubungkan kendaraan dengan driver bawaan jika sudah ada penugasan tetap.'
      },
      {
        title: 'Kesiapan armada',
        description: 'Membantu admin memilih kendaraan yang tersedia saat membuat pengiriman.'
      }
    ],
    mode: 'master',
    headingTitle: 'Master Kendaraan',
    primaryActionLabel: 'Tambah Kendaraan',
    dummyData,
    masterCards: [
      {
        label: 'AR',
        title: 'Armada aktif',
        description: '8 kendaraan siap dipilih untuk pengiriman.',
        icon: 'AR'
      },
      {
        label: 'DR',
        title: 'Driver default',
        description: '7 kendaraan sudah punya driver bawaan.',
        icon: 'DR'
      },
      {
        label: 'DK',
        title: 'Dokumen kendaraan',
        description: '2 kendaraan perlu pengecekan dokumen bulan ini.',
        icon: 'DK'
      }
    ],
    searchPlaceholder: 'Cari nomor polisi, tipe kendaraan, driver, atau depo',
    vehicleRows: [
      {
        code: 'KEN-001',
        plateNumber: 'DD 8123 SB',
        vehicleName: 'Mitsubishi Fuso Box',
        vehicleType: 'Truk Box',
        capacity: '4 ton / 120 dus',
        defaultDriver: 'Budi Santoso',
        depot: 'Gudang Pusat Makassar',
        documentStatus: 'STNK dan KIR aktif',
        availability: 'Tersedia'
      },
      {
        code: 'KEN-002',
        plateNumber: 'DD 7341 AB',
        vehicleName: 'Suzuki Carry Box',
        vehicleType: 'Pickup Box',
        capacity: '1.5 ton / 45 dus',
        defaultDriver: 'Raka Saputra',
        depot: 'Gudang Pusat Makassar',
        documentStatus: 'STNK aktif',
        availability: 'Tersedia'
      },
      {
        code: 'KEN-003',
        plateNumber: 'DD 9021 MK',
        vehicleName: 'Isuzu Elf Box',
        vehicleType: 'Truk Box',
        capacity: '3 ton / 90 dus',
        defaultDriver: 'Andi Pratama',
        depot: 'Depo Maros',
        documentStatus: 'KIR aktif',
        availability: 'Dipakai'
      },
      {
        code: 'KEN-004',
        plateNumber: 'DD 1188 PL',
        vehicleName: 'Daihatsu Gran Max',
        vehicleType: 'Blind Van',
        capacity: '900 kg / 28 dus',
        defaultDriver: 'Belum ditetapkan',
        depot: 'Gudang Pusat Makassar',
        documentStatus: 'STNK aktif',
        availability: 'Tersedia'
      },
      {
        code: 'KEN-005',
        plateNumber: 'DD 6610 RD',
        vehicleName: 'Hino Dutro',
        vehicleType: 'Truk Engkel',
        capacity: '5 ton / 150 dus',
        defaultDriver: 'Fajar Nugroho',
        depot: 'Depo Gowa',
        documentStatus: 'STNK dan KIR aktif',
        availability: 'Dipakai'
      },
      {
        code: 'KEN-006',
        plateNumber: 'DD 4509 LS',
        vehicleName: 'Toyota Hilux Bak',
        vehicleType: 'Pickup Bak',
        capacity: '1 ton / 30 dus',
        defaultDriver: 'Agus Salim',
        depot: 'Depo Takalar',
        documentStatus: 'Jadwal servis',
        availability: 'Perawatan'
      },
      {
        code: 'KEN-007',
        plateNumber: 'DD 3201 GM',
        vehicleName: 'Mitsubishi Colt Diesel',
        vehicleType: 'Truk Box',
        capacity: '4 ton / 110 dus',
        defaultDriver: 'Maya Lestari',
        depot: 'Depo Gowa',
        documentStatus: 'STNK dan KIR aktif',
        availability: 'Tersedia'
      },
      {
        code: 'KEN-008',
        plateNumber: 'DD 7712 PN',
        vehicleName: 'Isuzu Traga Box',
        vehicleType: 'Truk Engkel',
        capacity: '2.5 ton / 75 dus',
        defaultDriver: 'Nadia Putri',
        depot: 'Depo Parepare',
        documentStatus: 'STNK aktif',
        availability: 'Dipakai'
      },
      {
        code: 'KEN-009',
        plateNumber: 'DD 5902 BR',
        vehicleName: 'Toyota HiAce Cargo',
        vehicleType: 'Blind Van',
        capacity: '1.2 ton / 35 dus',
        defaultDriver: 'Siti Wahyuni',
        depot: 'Gudang Pusat Makassar',
        documentStatus: 'STNK aktif',
        availability: 'Tersedia'
      },
      {
        code: 'KEN-010',
        plateNumber: 'DD 8706 MA',
        vehicleName: 'Fuso Fighter Box',
        vehicleType: 'Truk Box',
        capacity: '8 ton / 240 dus',
        defaultDriver: 'Dewi Kartika',
        depot: 'Depo Maros',
        documentStatus: 'Perlu cek KIR',
        availability: 'Dokumen cek'
      }
    ],
    formTitle: 'Form kendaraan',
    formSubtitle: 'Data Kendaraan',
    formSubmitLabel: 'Simpan Kendaraan',
    formSuccessMessage: 'Data kendaraan berhasil disimpan sebagai draft.',
    isFormModalOpen: false,
    isFormSubmitted: false,
    formDraft: {
      plateNumber: 'DD 0000 SB',
      vehicleType: 'Truk Box',
      capacity: '4 ton / 120 dus',
      defaultDriver: 'Belum ditetapkan',
      depot: 'Gudang Pusat Makassar',
      documentStatus: 'STNK dan KIR aktif'
    }
  }
}


if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    syncStateHmr('vehiclesState', module, 'vehiclesState')
  })
}

