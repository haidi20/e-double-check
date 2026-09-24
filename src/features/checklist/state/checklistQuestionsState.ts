import type { ChecklistQuestionsState } from '@/features/checklist/type/checklistTypes'

export const checklistQuestionsState: ChecklistQuestionsState = {
  modal: {
    isQuestionModalOpen: false,
    questionModalCategoryId: null,
    questionFormError: ''
  },
  columnModal: {
    isColumnModalOpen: false,
    columnModalCategoryId: null,
    editingColumnId: null,
    columnFormError: ''
  },
  categories: [
    {
      id: 'persiapan-shift',
      name: 'Persiapan Shift',
      description: 'Kesiapan stasiun nasi, sambal, ayam, dan ganje sebelum outlet buka (30-60 menit sebelum buka).',
      questionCount: 15,
      isVisible: true,
      columns: [
        { id: 'col-no-1', label: 'No', type: 'number', mode: 'input', required: true },
        { id: 'col-service-1', label: 'Layanan', type: 'text', mode: 'input', required: true },
        { id: 'col-item-1', label: 'Item yang dicek', type: 'text', mode: 'input', required: true },
        { id: 'col-ya-1', label: 'Ya', type: 'boolean', mode: 'input', required: false },
        { id: 'col-tidak-1', label: 'Tidak', type: 'boolean', mode: 'input', required: false },
        { id: 'col-executor-1', label: 'Pelaksana', type: 'text', mode: 'input', required: true },
        { id: 'col-controller-1', label: 'Kontrol', type: 'text', mode: 'input', required: true }
      ]
    },
    {
      id: 'cek-ulang-pra-sibuk',
      name: 'Cek Ulang Pra-Sibuk',
      description: 'Verifikasi ulang stok dan kesiapan alur penyajian sebelum jam sibuk.',
      questionCount: 9,
      isVisible: true,
      columns: [
        { id: 'col-no-2', label: 'No', type: 'number', mode: 'input', required: true },
        { id: 'col-service-2', label: 'Layanan', type: 'text', mode: 'input', required: true },
        { id: 'col-item-2', label: 'Item yang dicek', type: 'text', mode: 'input', required: true },
        { id: 'col-ya-2', label: 'Ya', type: 'boolean', mode: 'input', required: false },
        { id: 'col-tidak-2', label: 'Tidak', type: 'boolean', mode: 'input', required: false },
        { id: 'col-time-2', label: 'Jam cek', type: 'time', mode: 'input', required: true }
      ]
    },
    {
      id: 'penerimaan-pesanan',
      name: 'Penerimaan Pesanan',
      description: 'Pemrosesan pesanan dari struk hingga penyajian atau pengemasan.',
      questionCount: 8,
      isVisible: true,
      columns: [
        { id: 'col-no-3', label: 'No', type: 'number', mode: 'input', required: true },
        { id: 'col-service-3', label: 'Layanan', type: 'text', mode: 'input', required: true },
        { id: 'col-step-3', label: 'Langkah', type: 'text', mode: 'input', required: true },
        { id: 'col-done-3', label: 'Selesai', type: 'boolean', mode: 'input', required: false }
      ]
    },
    {
      id: 'jam-sibuk',
      name: 'Jam Sibuk',
      description: 'Kontrol tambahan saat volume pesanan tinggi.',
      questionCount: 8,
      isVisible: true,
      columns: [
        { id: 'col-no-4', label: 'No', type: 'number', mode: 'input', required: true },
        { id: 'col-service-4', label: 'Layanan', type: 'text', mode: 'input', required: true },
        { id: 'col-item-4', label: 'Item', type: 'text', mode: 'input', required: true },
        { id: 'col-ya-4', label: 'Ya', type: 'boolean', mode: 'input', required: false },
        { id: 'col-tidak-4', label: 'Tidak', type: 'boolean', mode: 'input', required: false }
      ]
    },
    {
      id: 'insiden-pesanan',
      name: 'Insiden Pesanan',
      description: 'Penanganan pesanan hilang, tidak lengkap, atau salah.',
      questionCount: 3,
      isVisible: true,
      columns: [
        { id: 'col-no-5', label: 'No', type: 'number', mode: 'input', required: true },
        { id: 'col-service-5', label: 'Layanan', type: 'text', mode: 'input', required: true },
        { id: 'col-action-5', label: 'Tindakan', type: 'text', mode: 'input', required: true },
        { id: 'col-done-5', label: 'Selesai', type: 'boolean', mode: 'input', required: false }
      ]
    },
    {
      id: 'penutupan-shift',
      name: 'Penutupan Shift',
      description: 'Rekap kontrol, komplain, dan pelaporan akhir shift.',
      questionCount: 5,
      isVisible: true,
      columns: [
        { id: 'col-no-6', label: 'No', type: 'number', mode: 'input', required: true },
        { id: 'col-service-6', label: 'Layanan', type: 'text', mode: 'input', required: true },
        { id: 'col-item-6', label: 'Item', type: 'text', mode: 'input', required: true },
        { id: 'col-ya-6', label: 'Ya', type: 'boolean', mode: 'input', required: false },
        { id: 'col-tidak-6', label: 'Tidak', type: 'boolean', mode: 'input', required: false }
      ]
    }
  ],
  questions: [
    { id: 'q-01', categoryId: 'persiapan-shift', name: 'Nasi sudah siap sesuai standar porsi dan estimasi penjualan.', service: 'Semua', executor: 'Crew stasiun nasi', controller: 'Kapten' },
    { id: 'q-02', categoryId: 'persiapan-shift', name: 'Semua varian sambal tersedia dan jumlahnya cukup.', service: 'Semua', executor: 'Crew stasiun sambal', controller: 'Kapten' },
    { id: 'q-03', categoryId: 'persiapan-shift', name: 'Ayam dan Bebek sudah dimarinasi/diungkep dan jumlahnya cukup sesuai estimasi penjualan.', service: 'Semua', executor: 'Crew stasiun ayam', controller: 'Kapten' },
    { id: 'q-04', categoryId: 'persiapan-shift', name: 'Ayam dipisah per potongan (dada, paha, sayap, dll.) sesuai menu.', service: 'Semua', executor: 'Crew stasiun ayam', controller: 'Kapten' },
    { id: 'q-05', categoryId: 'persiapan-shift', name: 'Ikan lele, nila, mas sudah marinasi.', service: 'Semua', executor: 'Crew stasiun ayam', controller: 'Kapten' },
    { id: 'q-06', categoryId: 'persiapan-shift', name: 'Kangkung untuk ganje sudah dicuci, dipotong, ditiriskan, dan jumlahnya cukup sesuai estimasi penjualan.', service: 'Semua', executor: 'Crew stasiun ayam', controller: 'Kapten' },
    { id: 'q-07', categoryId: 'persiapan-shift', name: 'Bumbu ganje (bawang, cabai, dll.) sudah siap dalam wadah dan mudah dijangkau.', service: 'Semua', executor: 'Crew stasiun ganje', controller: 'Kapten' },
    { id: 'q-08', categoryId: 'persiapan-shift', name: 'Alat goreng/bakar siap dan minyak/arang dalam kondisi layak.', service: 'Semua', executor: 'Crew stasiun ganje', controller: 'Kapten' },
    { id: 'q-09', categoryId: 'persiapan-shift', name: 'Nasi siap di area saji untuk diambil per porsi saat pesanan masuk.', service: 'DI', executor: 'Crew stasiun ayam dan ganje', controller: 'Kapten' },
    { id: 'q-10', categoryId: 'persiapan-shift', name: 'Wadah sambal saji terisi di area saji/meja.', service: 'DI', executor: 'Crew dine in', controller: 'Kapten' },
    { id: 'q-11', categoryId: 'persiapan-shift', name: 'Kangkung Take away sudah dibungkus, 1 baki.', service: 'TA', executor: 'Crew dine in', controller: 'Kapten' },
    { id: 'q-12', categoryId: 'persiapan-shift', name: 'Nasi sudah dipre-portion dalam box dan disusun di rak dekat pengemasan jika perlu sudah dibungkus.', service: 'TA', executor: 'Crew pengemasan', controller: 'Kapten' },
    { id: 'q-13', categoryId: 'persiapan-shift', name: 'Sambal sudah dipre-portion di wadah kecil bertutup, sudah dibungkus, 1 baki per varian.', service: 'TA', executor: 'Crew stasiun sambal', controller: 'Kapten' },
    { id: 'q-14', categoryId: 'persiapan-shift', name: 'Box, wadah ganje, kantong, sendok/garpu, tisu, stiker segel, dan checklist pesanan tersedia.', service: 'TA', executor: 'Crew pengemasan', controller: 'Kapten' },
    { id: 'q-15', categoryId: 'persiapan-shift', name: 'Area kerja rapi, nasi, sambal, ayam, dan ganje dalam jangkauan.', service: 'Semua', executor: 'Crew shift', controller: 'Kapten' },
    { id: 'q-16', categoryId: 'cek-ulang-pra-sibuk', name: 'Stok nasi di stasiun masih di atas 1/3.', service: 'Semua', requiresCheckTime: true },
    { id: 'q-17', categoryId: 'cek-ulang-pra-sibuk', name: 'Stok sambal di stasiun masih di atas 1/3.', service: 'Semua', requiresCheckTime: true },
    { id: 'q-18', categoryId: 'cek-ulang-pra-sibuk', name: 'Stok ayam mentah/siap goreng cukup untuk jam ramai, semua potongan tersedia.', service: 'Semua', requiresCheckTime: true },
    { id: 'q-19', categoryId: 'cek-ulang-pra-sibuk', name: 'Ayam matang di tempat saji masih layak (hangat, tidak terlalu lama tertahan).', service: 'Semua', requiresCheckTime: true },
    { id: 'q-20', categoryId: 'cek-ulang-pra-sibuk', name: 'Stok kangkung siap masak dan bumbu ganje cukup untuk jam ramai.', service: 'Semua', requiresCheckTime: true },
    { id: 'q-21', categoryId: 'cek-ulang-pra-sibuk', name: 'Ikan masih ada stoknya.', service: 'Semua', requiresCheckTime: true },
    { id: 'q-22', categoryId: 'cek-ulang-pra-sibuk', name: 'Pelengkap makan ada.', service: 'DI', requiresCheckTime: true },
    { id: 'q-23', categoryId: 'cek-ulang-pra-sibuk', name: 'Kemasan take away cukup.', service: 'TA', requiresCheckTime: true },
    { id: 'q-24', categoryId: 'cek-ulang-pra-sibuk', name: 'Crew sudah pada posisi, dan Kapten berada di titik pengemasan.', service: 'Semua', requiresCheckTime: true },
    { id: 'q-25', categoryId: 'penerimaan-pesanan', name: 'Struk/pesanan mencantumkan nasi, ayam (potongan), ganje, dan sambal (varian) secara jelas.', service: 'Semua' },
    { id: 'q-26', categoryId: 'penerimaan-pesanan', name: 'Ganje dimasak sesuai pesanan, lalu segera disajikan/dikemas agar tidak layu atau berair.', service: 'Semua' },
    { id: 'q-27', categoryId: 'penerimaan-pesanan', name: 'Nasi, ayam, ganje, dan sambal diambil sesuai pesanan dan diantar bersama.', service: 'DI' },
    { id: 'q-28', categoryId: 'penerimaan-pesanan', name: 'Cek tunggal: pelayan mengonfirmasi nasi, ayam (potongan sesuai pesanan), ganje, dan sambal sudah ada di meja.', service: 'DI' },
    { id: 'q-29', categoryId: 'penerimaan-pesanan', name: 'Nasi, ayam, ganje, dan sambal diambil sesuai struk.', service: 'TA' },
    { id: 'q-30', categoryId: 'penerimaan-pesanan', name: 'Cek 1 (crew pengemasan): isi dicocokkan dengan struk (nasi, jumlah dan potongan ayam, ganje, sambal), lalu dicentang.', service: 'TA', requiresDoubleCheck: true },
    { id: 'q-31', categoryId: 'penerimaan-pesanan', name: 'Cek 2 (orang berbeda): isi diperiksa ulang dan disebutkan ke pelanggan/driver.', service: 'TA', requiresDoubleCheck: true },
    { id: 'q-32', categoryId: 'penerimaan-pesanan', name: 'Ganje dikemas di wadah terpisah/tidak menempel pada nasi agar tidak basah, lalu kemasan ditutup dan diberi stiker segel.', service: 'TA' },
    { id: 'q-33', categoryId: 'jam-sibuk', name: 'Nasi, ayam, ganje, dan sambal disiapkan sesuai total pesanan sebelum pengemasan dimulai.', service: 'TA' },
    { id: 'q-34', categoryId: 'jam-sibuk', name: 'Ayam/ikan untuk pesanan banyak mulai digoreng/dibakar lebih awal dan dipantau agar tidak habis di tengah jam ramai.', service: 'Semua' },
    { id: 'q-35', categoryId: 'jam-sibuk', name: 'Ganje dimasak per batch sesuai jumlah pesanan yang antre, bukan sekaligus terlalu banyak.', service: 'Semua' },
    { id: 'q-36', categoryId: 'jam-sibuk', name: 'Pesanan disusun per nomor/nama pelanggan.', service: 'TA' },
    { id: 'q-37', categoryId: 'jam-sibuk', name: 'Satu pesanan selesai penuh sebelum pindah ke pesanan berikutnya.', service: 'TA' },
    { id: 'q-38', categoryId: 'jam-sibuk', name: 'Checker akhir ditugaskan untuk pesanan besar (lebih dari 20 bks).', service: 'TA', requiresFinalChecker: true },
    { id: 'q-39', categoryId: 'jam-sibuk', name: 'Pesanan meja besar diantar sekaligus dan kelengkapannya dicek di meja.', service: 'DI' },
    { id: 'q-40', categoryId: 'jam-sibuk', name: 'Kapten berada di titik pengemasan/saji, bukan di kasir.', service: 'Semua' },
    { id: 'q-41', categoryId: 'insiden-pesanan', name: 'Susulan (nasi/sambal/ayam/ganje) langsung diantar tanpa menunggu pelanggan bertanya.', service: 'DI' },
    { id: 'q-42', categoryId: 'insiden-pesanan', name: 'Pelanggan/driver dihubungi, lalu susulan atau kompensasi diberikan sesuai kebijakan.', service: 'TA' },
    { id: 'q-43', categoryId: 'insiden-pesanan', name: 'Kasus dicatat di laporan komplain.', service: 'Semua' },
    { id: 'q-44', categoryId: 'penutupan-shift', name: 'Jumlah komplain shift ini: nasi, sambal, ayam, ganje kasus.', service: 'Semua' },
    { id: 'q-45', categoryId: 'penutupan-shift', name: 'Sampel pesanan take away dicek Kapten (minimal sesuai target).', service: 'TA' },
    { id: 'q-46', categoryId: 'penutupan-shift', name: 'Sampel pengantaran dine in dicek Kapten (minimal sesuai target).', service: 'DI' },
    { id: 'q-47', categoryId: 'penutupan-shift', name: 'Sisa ayam dan sisa kangkung/ganje dicatat dan ditangani sesuai standar warung.', service: 'Semua' },
    { id: 'q-48', categoryId: 'penutupan-shift', name: 'Temuan dilaporkan ke Manajer Area/Admin Operasional.', service: 'Semua' }
  ]
}
