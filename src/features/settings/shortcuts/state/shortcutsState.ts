import type { ShortcutCommand } from '../type/shortcutTypes'

export const STORAGE_KEY = 'edc-shortcut-bindings'
export const STORAGE_VERSION = 1

export const shortcutCommands: ShortcutCommand[] = [
  // Navigation
  {
    id: 'nav.dashboard',
    label: 'Dashboard',
    description: 'Buka halaman utama',
    scope: 'navigation',
    routePath: '/dashboard',
    defaultBinding: 'Alt+1',
    handler: 'nav.dashboard',
    category: 'Navigasi'
  },
  {
    id: 'nav.questions',
    label: 'Daftar Pertanyaan',
    description: 'Buka halaman daftar pertanyaan',
    scope: 'navigation',
    routePath: '/checklist',
    defaultBinding: 'Alt+2',
    handler: 'nav.questions',
    category: 'Navigasi'
  },
  {
    id: 'nav.services',
    label: 'Layanan',
    description: 'Buka halaman layanan',
    scope: 'navigation',
    routePath: '/layanan',
    defaultBinding: 'Alt+3',
    handler: 'nav.services',
    category: 'Navigasi'
  },
  {
    id: 'nav.outlets',
    label: 'Warung',
    description: 'Buka halaman warung',
    scope: 'navigation',
    routePath: '/outlets',
    defaultBinding: 'Alt+4',
    handler: 'nav.outlets',
    category: 'Navigasi'
  },
  {
    id: 'nav.employees',
    label: 'Pegawai',
    description: 'Buka halaman pegawai',
    scope: 'navigation',
    routePath: '/employees',
    defaultBinding: 'Alt+5',
    handler: 'nav.employees',
    category: 'Navigasi'
  },

  // Global
  {
    id: 'global.open-cheatsheet',
    label: 'Buka Halaman Shortcut',
    description: 'Buka halaman daftar shortcut',
    scope: 'global',
    routePath: '/shortcuts',
    defaultBinding: 'Ctrl+K Ctrl+S',
    handler: 'global.open-cheatsheet',
    category: 'Global'
  },
  {
    id: 'global.toggle-sidebar',
    label: 'Buka / Tutup Sidebar',
    description: 'Toggle sidebar menu',
    scope: 'global',
    defaultBinding: 'Ctrl+B',
    handler: 'global.toggle-sidebar',
    category: 'Global'
  },
  {
    id: 'global.focus-search',
    label: 'Fokus ke Pencarian',
    description: 'Fokus ke input pencarian di halaman aktif',
    scope: 'global',
    defaultBinding: 'Ctrl+P',
    handler: 'global.focus-search',
    category: 'Global'
  },
  {
    id: 'global.logout',
    label: 'Keluar',
    description: 'Logout dari aplikasi',
    scope: 'global',
    defaultBinding: 'Ctrl+Shift+Q',
    handler: 'global.logout',
    category: 'Global'
  },

  // Page
  {
    id: 'page.checklist.new',
    label: 'Tambah Pertanyaan',
    description: 'Tambah pertanyaan baru di halaman checklist',
    scope: 'page',
    pageContext: 'checklist',
    routePath: '/checklist',
    defaultBinding: 'Ctrl+N',
    handler: 'page.checklist.new',
    category: 'Halaman'
  },
  {
    id: 'page.services.new',
    label: 'Tambah Layanan',
    description: 'Tambah layanan baru di halaman layanan',
    scope: 'page',
    pageContext: 'services',
    routePath: '/layanan',
    defaultBinding: 'Ctrl+N',
    handler: 'page.services.new',
    category: 'Halaman'
  },
  {
    id: 'page.outlets.new',
    label: 'Tambah Warung',
    description: 'Tambah warung baru di halaman warung',
    scope: 'page',
    pageContext: 'outlets',
    routePath: '/outlets',
    defaultBinding: 'Ctrl+N',
    handler: 'page.outlets.new',
    category: 'Halaman'
  },
  {
    id: 'page.employees.new',
    label: 'Tambah Pegawai',
    description: 'Tambah pegawai baru di halaman pegawai',
    scope: 'page',
    pageContext: 'employees',
    routePath: '/employees',
    defaultBinding: 'Ctrl+N',
    handler: 'page.employees.new',
    category: 'Halaman'
  },
  {
    id: 'page.form.save',
    label: 'Simpan Form Modal',
    description: 'Simpan form yang sedang terbuka',
    scope: 'page',
    defaultBinding: 'Ctrl+S',
    handler: 'page.form.save',
    category: 'Halaman'
  },
  {
    id: 'page.form.close',
    label: 'Tutup Form Modal',
    description: 'Tutup form modal yang sedang terbuka',
    scope: 'page',
    defaultBinding: 'Escape',
    handler: 'page.form.close',
    category: 'Halaman'
  }
]

export const cheatSheetState = {
  searchQuery: '',
  activeId: null as string | null
}
