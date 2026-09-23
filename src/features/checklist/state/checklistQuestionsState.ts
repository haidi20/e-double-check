import type { ChecklistQuestionsState } from '@/features/checklist/type/checklistTypes'

export const checklistQuestionsState: ChecklistQuestionsState = {
  selectedCategoryId: null,
  categories: [
    {
      id: 'persiapan-shift',
      name: 'Persiapan Shift',
      description: 'Kesiapan stasiun nasi, sambal, ayam, dan ganje sebelum outlet buka.',
      questionCount: 4
    },
    {
      id: 'cek-ulang-pra-sibuk',
      name: 'Cek Ulang Pra-Sibuk',
      description: 'Verifikasi ulang stok dan kesiapan alur penyajian sebelum jam sibuk.',
      questionCount: 4
    },
    {
      id: 'penerimaan-pesanan',
      name: 'Penerimaan Pesanan',
      description: 'Pemrosesan pesanan dari struk hingga penyajian atau pengemasan.',
      questionCount: 4
    },
    {
      id: 'jam-sibuk',
      name: 'Jam Sibuk',
      description: 'Kontrol tambahan saat volume pesanan tinggi.',
      questionCount: 4
    },
    {
      id: 'insiden-pesanan',
      name: 'Insiden Pesanan',
      description: 'Penanganan pesanan hilang, tidak lengkap, atau salah.',
      questionCount: 4
    },
    {
      id: 'penutupan-shift',
      name: 'Penutupan Shift',
      description: 'Rekap kontrol, komplain, dan pelaporan akhir shift.',
      questionCount: 4
    }
  ],
  questions: [
    {
      id: 'q-prep-01',
      categoryId: 'persiapan-shift',
      name: 'Pastikan porsi nasi siap saji sesuai estimasi penjualan.',
      service: 'Semua',
      executor: 'Kru stasiun nasi',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-prep-02',
      categoryId: 'persiapan-shift',
      name: 'Pastikan varian sambal tersedia dan wadah tertutup.',
      service: 'Semua',
      executor: 'Kru stasiun sambal',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-prep-03',
      categoryId: 'persiapan-shift',
      name: 'Pastikan ayam, bebek, dan ikan sudah dipilah serta dimarinasi.',
      service: 'Semua',
      executor: 'Kru stasiun ayam',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-prep-04',
      categoryId: 'persiapan-shift',
      name: 'Pastikan bumbu ganje, minyak, dan arang siap digunakan.',
      service: 'Semua',
      executor: 'Kru stasiun ganje',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-prepeak-01',
      categoryId: 'cek-ulang-pra-sibuk',
      name: 'Cek ulang stok nasi berada di atas sepertiga target.',
      service: 'Semua',
      executor: 'Kru stasiun nasi',
      controller: 'Kapten outlet',
      requiresCheckTime: true
    },
    {
      id: 'q-prepeak-02',
      categoryId: 'cek-ulang-pra-sibuk',
      name: 'Cek ulang stok sambal berada di atas sepertiga target.',
      service: 'Semua',
      executor: 'Kru stasiun sambal',
      controller: 'Kapten outlet',
      requiresCheckTime: true
    },
    {
      id: 'q-prepeak-03',
      categoryId: 'cek-ulang-pra-sibuk',
      name: 'Cek ulang kemasan take-away dan stiker segel.',
      service: 'Take Away',
      executor: 'Kru pengemasan',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-prepeak-04',
      categoryId: 'cek-ulang-pra-sibuk',
      name: 'Pastikan kapten berada di titik penyajian atau pengemasan.',
      service: 'Semua',
      executor: 'Kapten outlet',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-order-01',
      categoryId: 'penerimaan-pesanan',
      name: 'Bacakan ulang pesanan take-away kepada pelanggan atau driver.',
      service: 'Take Away',
      executor: 'Kru pengemasan',
      controller: 'Kapten outlet',
      requiresDoubleCheck: true
    },
    {
      id: 'q-order-02',
      categoryId: 'penerimaan-pesanan',
      name: 'Kemas ganje terpisah dari nasi agar tidak lembek.',
      service: 'Take Away',
      executor: 'Kru pengemasan',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-order-03',
      categoryId: 'penerimaan-pesanan',
      name: 'Sajikan pesanan meja besar secara bersamaan.',
      service: 'Dine In',
      executor: 'Kru dine-in',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-order-04',
      categoryId: 'penerimaan-pesanan',
      name: 'Selesaikan satu pesanan take-away sebelum melanjutkan antrean berikutnya.',
      service: 'Take Away',
      executor: 'Kru pengemasan',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-peak-01',
      categoryId: 'jam-sibuk',
      name: 'Identifikasikan pemeriksa akhir untuk pesanan lebih dari 20 kotak.',
      service: 'Take Away',
      executor: 'Kapten outlet',
      controller: 'Kapten outlet',
      requiresFinalChecker: true
    },
    {
      id: 'q-peak-02',
      categoryId: 'jam-sibuk',
      name: 'Pastikan cek kedua take-away dilakukan oleh orang yang berbeda.',
      service: 'Take Away',
      executor: 'Kru pengemasan',
      controller: 'Kapten outlet',
      requiresDoubleCheck: true
    },
    {
      id: 'q-peak-03',
      categoryId: 'jam-sibuk',
      name: 'Masak ganje dalam batch sesuai antrean pesanan.',
      service: 'Semua',
      executor: 'Kru stasiun ganje',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-peak-04',
      categoryId: 'jam-sibuk',
      name: 'Jaga area kerja tetap tertata selama jam sibuk.',
      service: 'Semua',
      executor: 'Kru shift',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-incident-01',
      categoryId: 'insiden-pesanan',
      name: 'Catat pesanan hilang, tidak lengkap, atau salah beserta penyebabnya.',
      service: 'Semua',
      executor: 'Kru dine-in',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-incident-02',
      categoryId: 'insiden-pesanan',
      name: 'Kirim item yang kurang untuk komplain dine-in.',
      service: 'Dine In',
      executor: 'Kru dine-in',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-incident-03',
      categoryId: 'insiden-pesanan',
      name: 'Hubungi pelanggan atau driver take-away untuk resolusi.',
      service: 'Take Away',
      executor: 'Kapten outlet',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-incident-04',
      categoryId: 'insiden-pesanan',
      name: 'Simpan status resolusi komplain untuk rekap shift.',
      service: 'Semua',
      executor: 'Kapten outlet',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-close-01',
      categoryId: 'penutupan-shift',
      name: 'Rekap komplain per jenis item nasi, sambal, ayam, dan ganje.',
      service: 'Semua',
      executor: 'Kapten outlet',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-close-02',
      categoryId: 'penutupan-shift',
      name: 'Catat sampel pemeriksaan take-away dan dine-in oleh kapten.',
      service: 'Semua',
      executor: 'Kapten outlet',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-close-03',
      categoryId: 'penutupan-shift',
      name: 'Catat sisa ayam, kangkung, dan ganje.',
      service: 'Semua',
      executor: 'Kru shift',
      controller: 'Kapten outlet'
    },
    {
      id: 'q-close-04',
      categoryId: 'penutupan-shift',
      name: 'Laporkan hasil penutupan shift ke manajer area atau administrator.',
      service: 'Semua',
      executor: 'Kapten outlet',
      controller: 'Kapten outlet'
    }
  ]
}
