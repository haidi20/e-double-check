import type { DocConnectionInfo, DocMenuItem, DocRoleInfo, DocRuleInfo, DocStepInfo } from '@/features/doc/type/docTypes'

export const docRoles: Record<string, DocRoleInfo> = {
  OUTLET: {
    id: 'OUTLET',
    title: 'Outlet',
    subtitle: 'Cabang Retail',
    color: '#ffd24a',
    borderColor: '#f2b71f',
    bgColor: 'rgba(255, 248, 220, 0.9)',
    accentColor: '#f59e0b',
    textColor: '#4a3600',
    darkBg: '#ffd24a20',
    description: 'Unit retail / kedai cabang yang menginisiasi pesanan kebutuhan operasional harian dan menerima hasil kiriman.'
  },
  ADMIN: {
    id: 'ADMIN',
    title: 'Admin',
    subtitle: 'Pusat Validasi',
    color: '#4fc083',
    borderColor: '#2ea267',
    bgColor: 'rgba(236, 255, 244, 0.9)',
    accentColor: '#10b981',
    textColor: '#064e3b',
    darkBg: '#10b98120',
    description: 'Pusat administrasi yang menyaring, memvalidasi stok, menyusun berkas tagihan Accurate, dan menyelaraskan data distribusi.'
  },
  GUDANG: {
    id: 'GUDANG',
    title: 'Gudang',
    subtitle: 'Inventaris',
    color: '#f25252',
    borderColor: '#d53b3b',
    bgColor: 'rgba(255, 240, 240, 0.9)',
    accentColor: '#ef4444',
    textColor: '#7f1d1d',
    darkBg: '#ef444420',
    description: 'Pusat penyimpanan logistik bahan baku. Bertanggung jawab mempersiapkan barang pesanan dan memproses pencatatan retur balik.'
  },
  LOGISTIK: {
    id: 'LOGISTIK',
    title: 'Logistik',
    subtitle: 'Distribusi',
    color: '#a25bd2',
    borderColor: '#8341b8',
    bgColor: 'rgba(247, 239, 255, 0.9)',
    accentColor: '#8b5cf6',
    textColor: '#4c1d95',
    darkBg: '#8b5cf620',
    description: 'Tim ekspedisi / kurir yang menjamin barang sampai ke outlet tujuan secara selamat dengan rute pengantaran optimal.'
  }
}

export const docSteps: DocStepInfo[] = [
  {
    id: 1,
    title: 'Pesanan Outlet',
    copy: 'Outlet memesan kebutuhan',
    roleId: 'OUTLET',
    icon: 'shoppingBag',
    col: 1,
    line: 1
  },
  {
    id: 2,
    title: 'Terima Pesanan',
    copy: 'Admin input dan validasi',
    roleId: 'ADMIN',
    icon: 'inbox',
    col: 2,
    line: 2
  },
  {
    id: 3,
    title: 'Cek Barang',
    copy: 'Stok wajib tersedia',
    roleId: 'ADMIN',
    icon: 'layers',
    col: 2,
    line: 3
  },
  {
    id: 4,
    title: 'Buat Faktur',
    copy: 'Dokumen transaksi di Accurate',
    roleId: 'ADMIN',
    icon: 'fileSpreadsheet',
    col: 2,
    line: 4
  },
  {
    id: 5,
    title: 'Import Faktur ke Aplikasi',
    copy: 'Excel Accurate import ke e-distribusi SBM',
    roleId: 'ADMIN',
    icon: 'uploadCloud',
    col: 2,
    line: 5
  },
  {
    id: 6,
    title: 'Siapkan Barang',
    copy: 'Barang keluar dari gudang',
    roleId: 'GUDANG',
    icon: 'package',
    col: 3,
    line: 6
  },
  {
    id: 7,
    title: 'Buat Surat Jalan',
    copy: 'Surat jalan dibuat untuk pengiriman ke outlet',
    roleId: 'LOGISTIK',
    icon: 'truck',
    col: 4,
    line: 7
  },
  {
    id: 8,
    title: 'Tanda Terima',
    copy: 'Outlet tanda tangan terima',
    roleId: 'OUTLET',
    icon: 'signature',
    col: 1,
    line: 8
  },
  {
    id: 9,
    title: 'Update Gudang',
    copy: 'Faktur diterima, retur dicatat',
    roleId: 'GUDANG',
    icon: 'database',
    col: 3,
    line: 9
  },
  {
    id: 10,
    title: 'Retur Opsional',
    copy: 'Jika ada ketidaksesuaian',
    roleId: 'OUTLET',
    icon: 'refresh',
    col: 1,
    line: 9,
    isRetur: true
  }
]

export const docRules: DocRuleInfo[] = [
  {
    id: 1,
    title: 'Sinkron Stok Accurate',
    copy: 'Di aplikasi E-Distribusi, stok barang harus selalu ter-update dan sama seperti stok di Accurate.',
    color: docRoles.ADMIN.accentColor
  },
  {
    id: 2,
    title: 'Faktur Tidak Bisa Diubah',
    copy: 'Faktur yang sudah masuk aplikasi tidak bisa diubah datanya. Jika ada kesalahan, admin harus membuat faktur baru.',
    color: docRoles.ADMIN.accentColor
  },
  {
    id: 3,
    title: 'Aturan Faktur Pengiriman',
    copy: 'Satu kali pengiriman bisa membawa banyak faktur, tetapi satu faktur hanya berlaku untuk satu outlet.',
    color: docRoles.LOGISTIK.accentColor
  },
  {
    id: 4,
    title: 'Retur Berdasarkan Faktur',
    copy: 'Pada fitur retur, pilih nomor faktur, pilih barang yang diretur, isi jumlah stok retur, lalu berikan catatan.',
    color: '#ef4444'
  }
]

export const docConnections: DocConnectionInfo[] = [
  { from: 1, to: 2, fromSide: 'right', toSide: 'left', color: docRoles.ADMIN.accentColor },
  { from: 2, to: 3, fromSide: 'bottom', toSide: 'top', color: docRoles.ADMIN.accentColor },
  { from: 3, to: 4, fromSide: 'bottom', toSide: 'top', color: docRoles.ADMIN.accentColor },
  { from: 4, to: 5, fromSide: 'bottom', toSide: 'top', color: docRoles.ADMIN.accentColor },
  { from: 5, to: 6, fromSide: 'right', toSide: 'left', color: docRoles.GUDANG.accentColor },
  { from: 6, to: 7, fromSide: 'right', toSide: 'left', color: docRoles.LOGISTIK.accentColor },
  { from: 7, to: 8, fromSide: 'left', toSide: 'right', color: docRoles.OUTLET.accentColor },
  { from: 8, to: 9, fromSide: 'right', toSide: 'top', color: docRoles.GUDANG.accentColor },
  { from: 8, to: 10, fromSide: 'bottom', toSide: 'top', color: '#ef4444', dashed: true, label: 'opsional' },
  { from: 10, to: 9, fromSide: 'right', toSide: 'left', color: '#ef4444', dashed: true }
]

export const docMenuItems: DocMenuItem[] = [
  { id: 'item-1', name: 'SBM Espresso Blend Premium', category: 'Kopi', price: 125000, unit: 'kg', stock: 450 },
  { id: 'item-2', name: 'SBM Powder Premium Chocolate', category: 'Bubuk Minuman', price: 95000, unit: 'kg', stock: 240 },
  { id: 'item-3', name: 'Gelas Plastik SBM Custom 16oz', category: 'Kemasan', price: 450, unit: 'pcs', stock: 15000 },
  { id: 'item-4', name: 'Susu UHT Creamy Barista 1L', category: 'Bahan Cair', price: 18500, unit: 'karton (12L)', stock: 180 },
  { id: 'item-5', name: 'Sirup Karamel SBM Golden Botol', category: 'Sirup', price: 85000, unit: 'botol', stock: 110 },
  { id: 'item-6', name: 'Sedotan Kertas Steril Cokelat', category: 'Kemasan', price: 120, unit: 'pcs', stock: 8000 }
]

export const sbmOutlets = [
  'SBM Sudirman (JKT-01)',
  'SBM Dago Bandung (BDG-03)',
  'SBM Malioboro Yogyakarta (YOG-02)',
  'SBM Tunjungan Surabaya (SUB-05)',
  'SBM Kuta Bali (DPS-01)'
]
