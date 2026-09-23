import type { OutletsState } from '@/features/master-data/outlets/type/outletsTypes'

export const outletsState: OutletsState = {
  view: {
    title: 'Warung',
    subtitle: 'Data Warung',
    description: 'Kelola daftar warung yang digunakan pada operasional checklist.',
    headingTitle: 'Master Warung',
    primaryActionLabel: 'Tambah Warung',
    searchPlaceholder: 'Cari nama warung atau penanggung jawab',
    outlets: [
      {
        id: 'outlet-1',
        code: 'WRG-001',
        name: 'Warung Pusat',
        owner: 'Admin Operasional',
        status: 'Aktif'
      },
      {
        id: 'outlet-2',
        code: 'WRG-002',
        name: 'Warung Panakkukang',
        owner: 'Rina Melati',
        status: 'Aktif'
      },
      {
        id: 'outlet-3',
        code: 'WRG-003',
        name: 'Warung Somba Opu',
        owner: 'Fajar Nugroho',
        status: 'Perlu ditinjau'
      }
    ],
    formTitle: 'Tambah warung',
    formSubtitle: 'Formulir Warung',
    formSubmitLabel: 'Simpan Warung',
    formSuccessMessage: 'Data warung berhasil disimpan.',
    formError: '',
    isFormModalOpen: false,
    isFormSubmitted: false,
    editingOutletId: null,
    formFields: [
      {
        id: 'name',
        label: 'Nama warung',
        type: 'text',
        value: ''
      },
      {
        id: 'owner',
        label: 'Penanggung jawab',
        type: 'select',
        value: '',
        options: [
          'Budi Santoso',
          'Siti Wahyuni',
          'Andi Pratama',
          'Rina Melati',
          'Dewi Kartika',
          'Fajar Nugroho',
          'Nadia Putri',
          'Raka Saputra',
          'Maya Lestari',
          'Agus Salim'
        ]
      },
      {
        id: 'status',
        label: 'Status',
        type: 'select',
        value: 'Aktif',
        options: ['Aktif', 'Perlu ditinjau', 'Tidak aktif']
      }
    ]
  }
}
