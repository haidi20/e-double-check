import type { AppShellUiState } from '@/core/type/appTypes'

export const appShellState: AppShellUiState = {
  isProfileMenuOpen: false,
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
      id: 'history',
      label: 'Riwayat',
      routePath: '/history',
      icon: 'M12 8v4l3 2M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z'
    }
  ],
}
