import type { DashboardMobileState } from '@/features/dashboard/type/dashboardMobileTypes'

export const dashboardMobileState: DashboardMobileState = {
  view: {
    profileName: 'Nama Pegawai',
    outletName: 'Warung Pusat',
    eyebrow: 'Shift Operasional',
    title: 'Checklist Anti-Ketinggalan',
    subtitle: 'Ikuti urutan checklist agar tidak ada nasi, sambal, ayam, atau ganje yang terlewat.',
    progressLabel: 'Checklist belum dimulai',
    primaryActionLabel: 'Mulai Checklist',
    primaryActionPath: '/checklist',
    secondaryActionLabel: 'Lihat Semua',
    secondaryActionPath: '/checklist',
    priorityDescription: 'Aturan penting yang paling sering mencegah kelalaian.',
  },
  priorityItems: [
    {
      id: 'double-check',
      title: 'Cek Ganda TA',
      description: 'Cek 1 dan Cek 2 harus dilakukan oleh orang berbeda.',
      icon: 'M20 6 9 17l-5-5'
    },
    {
      id: 'bulk-order',
      title: 'Pesanan Besar',
      description: 'Lebih dari 20 kotak memerlukan pemeriksa akhir.',
      icon: 'M3 8h18v12H3zM8 8V5h8v3'
    },
    {
      id: 'captain-position',
      title: 'Posisi Kapten',
      description: 'Saat jam sibuk tetap di titik pengemasan atau penyajian.',
      icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0'
    },
    {
      id: 'stock-threshold',
      title: 'Ambang Stok',
      description: 'Nasi dan sambal harus tetap di atas sepertiga.',
      icon: 'M5 3h14v18H5zM9 7h6M9 11h6M9 15h3'
    }
  ]
}
