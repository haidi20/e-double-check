import type { AppShellUiState } from '@/core/type/appTypes'

export const appShellState: AppShellUiState = {
  isProfileMenuOpen: false,
  isQuickActionOpen: false,
  compactSidebarRouteNames: ['dashboard', 'checklist', 'orders', 'delivery-orders', 'kpi', 'reports', 'doc', 'products', 'customers', 'inventory', 'warehouses', 'outlets', 'services', 'vehicles', 'employees', 'users', 'roles'],
  compactSidebarIcons: {
    checklist: 'M6 3h12v18H6zM9 7h6M9 11h4M9 15h6',
    categories: 'M4 6h16v4H4zM4 12h16v4H4zM4 18h16v2H4z',
    questions: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',
    'answer-types': 'M4 6h16M4 12h16M4 18h16M8 4v4M16 10v4M11 16v4',
    services: 'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 21a7 7 0 0 1 14 0M4 12h4M16 12h4',
    outlets: 'M4 20V8l8-5 8 5v12H4ZM8 20v-6h8v6M8 10h2M14 10h2',
    employees: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 21a5 5 0 0 1 10 0M13 21a5 5 0 0 1 8 0'
  },
  compactSidebarDefaultIcon: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 21a5 5 0 0 1 10 0M13 21a5 5 0 0 1 8 0',
  bottomNavigationItems: [
    {
      id: 'dashboard',
      label: 'Beranda',
      routePath: '/dashboard',
      icon: 'M3 10 12 3l9 7v10H3V10Zm6 10v-6h6v6'
    },
    {
      id: 'products',
      label: 'Produk Anda',
      routePath: '/products',
      icon: 'M4 8h16v12H4zM7 8V6a5 5 0 0 1 10 0v2M8 13h8'
    },
    {
      id: 'favorite',
      label: 'Sukha',
      routePath: '/roles',
      icon: 'M12 21s-7-4.4-9-9.2C1.5 8.2 3.7 5 7 5c2 0 3.4 1.1 5 2.8C13.6 6.1 15 5 17 5c3.3 0 5.5 3.2 4 6.8C19 16.6 12 21 12 21Z'
    },
    {
      id: 'loyalty',
      label: 'Loyalty',
      routePath: '/reports',
      icon: 'M4 17a8 8 0 1 1 16 0M7 17a5 5 0 1 1 10 0M10 17a2 2 0 1 1 4 0'
    }
  ],
  quickActionItems: [
    {
      id: 'reports',
      label: 'Laporan',
      routePath: '/reports',
      icon: 'M4 20V10M10 20V4M16 20v-6M22 20H2'
    },
    {
      id: 'outlets',
      label: 'Warung',
      routePath: '/outlets',
      icon: 'M4 20V8l8-5 8 5v12H4ZM8 20v-6h8v6M8 10h2M14 10h2'
    },
    {
      id: 'employees',
      label: 'Pegawai',
      routePath: '/employees',
      icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0'
    },
    {
      id: 'users',
      label: 'Pengguna',
      routePath: '/users',
      icon: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5 21a7 7 0 0 1 14 0'
    },
    {
      id: 'doc',
      label: 'Dokumentasi',
      routePath: '/doc',
      icon: 'M6 3h9l3 3v15H6V3Zm9 0v4h4M9 11h6M9 15h6M9 19h4'
    },
    {
      id: 'roles',
      label: 'Pengaturan',
      routePath: '/roles',
      icon: 'M12 3 20 7v5c0 5-3.4 8.1-8 10-4.6-1.9-8-5-8-10V7l8-4Zm-3 9 2 2 4-5'
    }
  ]
}
