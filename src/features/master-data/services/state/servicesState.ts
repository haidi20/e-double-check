import type { ServicesState } from '@/features/master-data/services/type/servicesTypes'

export const servicesState: ServicesState = {
  view: {
    title: 'Layanan',
    subtitle: 'Data Layanan',
    description: 'Kelola daftar layanan yang digunakan pada kategori dan pertanyaan checklist.',
    headingTitle: 'Master Layanan',
    primaryActionLabel: 'Tambah Layanan',
    searchPlaceholder: 'Cari kode atau nama layanan',
    services: [
      {
        id: 'service-1',
        code: 'ALL',
        name: 'Semua',
        description: 'Berlaku untuk semua jenis layanan (Dine In dan Take Away).',
        status: 'Aktif'
      },
      {
        id: 'service-2',
        code: 'DI',
        name: 'Dine In',
        description: 'Layanan makan di tempat.',
        status: 'Aktif'
      },
      {
        id: 'service-3',
        code: 'TA',
        name: 'Take Away',
        description: 'Layanan bawa pulang atau pesanan online.',
        status: 'Aktif'
      }
    ],
    formTitle: 'Tambah layanan',
    formSubtitle: 'Formulir Layanan',
    formSubmitLabel: 'Simpan Layanan',
    formSuccessMessage: 'Data layanan berhasil disimpan.',
    formError: '',
    isFormModalOpen: false,
    isFormSubmitted: false,
    editingServiceId: null,
    formFields: [
      {
        id: 'code',
        label: 'Kode',
        type: 'text',
        value: ''
      },
      {
        id: 'name',
        label: 'Nama layanan',
        type: 'text',
        value: ''
      },
      {
        id: 'description',
        label: 'Deskripsi',
        type: 'textarea',
        value: ''
      },
      {
        id: 'status',
        label: 'Status',
        type: 'select',
        value: 'Aktif',
        options: ['Aktif', 'Tidak aktif']
      }
    ]
  }
}