import type { RouteComponent } from 'vue-router'
import type { AppState, NavigationComponent } from '@/core/type/appTypes'

const lazyView = (loader: () => Promise<{ default: RouteComponent }>): NavigationComponent => {
  return () => loader().then((module) => module.default)
}

export const appState: AppState = {
  activeScreenId: 'dashboard',
  shell: {
    brandInitials: 'CA',
    brandTitle: 'Checklist Anti-Ketinggalan',
    brandSubtitle: 'Operasional Harian',
    topbarLabel: 'Pusat Operasional',
    notificationLabel: 'Notifikasi',
    notificationIcon: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4',
    userInitials: 'AD',
    userName: 'Admin',
    userLocation: 'Gudang Pusat'
  },
  navigationItems: [
    {
      id: 'dashboard',
      label: 'Halaman Utama',
      section: 'Utama',
      routePath: '/dashboard',
      icon: 'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z',
      component: lazyView(() => import('@/features/dashboard/screen/DashboardScreen.vue'))
    },
    {
      id: 'checklist',
      label: 'Daftar Pertanyaan',
      shortLabel: 'Pertanyaan',
      section: 'Operasional',
      routePath: '/checklist',
      icon: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',
      component: lazyView(() => import('@/features/checklist/screen/ChecklistQuestionsScreen.vue'))
    },
    {
      id: 'orders',
      label: 'Order Pesanan',
      section: 'Operasional',
      routePath: '/orders',
      icon: 'M8 4h8M9 3h6l1 3H8l1-3ZM6 6h12v15H6V6Zm3 5h6M9 15h4',
      component: lazyView(() => import('@/features/orders/screen/OrdersScreen.vue'))
    },
    {
      id: 'delivery-orders',
      label: 'Surat Jalan',
      section: 'Operasional',
      routePath: '/delivery-orders',
      icon: 'M8 4h8M9 3h6l1 3H8l1-3ZM6 6h12v15H6V6Zm3 5h6M9 15h4',
      component: lazyView(() => import('@/features/distribution/delivery-orders/screen/DeliveryOrdersScreen.vue'))
    },
    {
      id: 'kpi',
      label: 'Metrik KPI',
      section: 'Operasional',
      routePath: '/matriks-kpi',
      icon: 'M4 19a8 8 0 1 1 16 0M12 19v-5M8 19v-2M16 19v-8M7 13l3-3 3 2 4-5',
      component: lazyView(() => import('@/features/matrix-kpi/screen/MatrixKpiScreen.vue'))
    },
    {
      id: 'reports',
      label: 'Laporan',
      section: 'Operasional',
      routePath: '/reports',
      icon: 'M4 19V5M4 19h17M8 16v-4M12 16V9M16 16v-7M20 16V6M8 12l4-3 4 2 4-5',
      component: lazyView(() => import('@/features/reports/screen/ReportsScreen.vue'))
    },
    {
      id: 'doc',
      label: 'Dokumentasi CFF',
      shortLabel: 'Alur Aplikasi',
      section: 'Operasional',
      routePath: '/doc',
      icon: 'M6 3h9l3 3v15H6V3Zm9 0v4h4M9 11h6M9 15h6M9 19h4',
      component: lazyView(() => import('@/features/doc/screen/DocScreen.vue'))
    },
    {
      id: 'products',
      label: 'Produk',
      section: 'Master',
      routePath: '/products',
      icon: 'M5 7h14l-1 4H6L5 7Zm1 4h12v9H6v-9Zm3 4h6',
      component: lazyView(() => import('@/features/master-data/products/screen/ProductsScreen.vue'))
    },
    {
      id: 'customers',
      label: 'Pelanggan',
      section: 'Master',
      routePath: '/customers',
      icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0',
      component: lazyView(() => import('@/features/master-data/customers/screen/CustomersScreen.vue'))
    },
    {
      id: 'inventory',
      label: 'Inventaris',
      section: 'Master',
      routePath: '/inventory',
      icon: 'M5 7h14l-1 4H6L5 7Zm1 4h12v9H6v-9Zm3 4h6',
      component: lazyView(() => import('@/features/inventory/screen/InventoryScreen.vue'))
    },
    // {
    //   id: 'suppliers',
    //   label: 'Pemasok',
    //   section: 'Master',
    //   routePath: '/suppliers',
    //   icon: 'M4 6h10v13H4V6Zm10 5h6v8h-6v-8ZM7 10h4M7 14h4M16 15h2',
    //   component: lazyView(() => import('@/features/master-data/suppliers/screen/SuppliersScreen.vue'))
    // },
    {
      id: 'warehouses',
      label: 'Gudang',
      section: 'Master',
      routePath: '/warehouses',
      icon: 'M3 10 12 4l9 6v10H3V10Zm5 10v-6h8v6M7 10h10',
      component: lazyView(() => import('@/features/master-data/warehouses/screen/WarehousesScreen.vue'))
    },
    {
      id: 'outlets',
      label: 'Warung',
      section: 'Master',
      routePath: '/outlets',
      icon: 'M4 20V8l8-5 8 5v12H4ZM8 20v-6h8v6M8 10h2M14 10h2',
      component: lazyView(() => import('@/features/master-data/outlets/screen/OutletsScreen.vue'))
    },
    {
      id: 'services',
      label: 'Layanan',
      section: 'Master',
      routePath: '/layanan',
      icon: 'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 21a7 7 0 0 1 14 0M4 12h4M16 12h4',
      component: lazyView(() => import('@/features/master-data/services/screen/ServicesScreen.vue'))
    },
    {
      id: 'vehicles',
      label: 'Kendaraan',
      section: 'Master',
      routePath: '/vehicles',
      icon: 'M3 13h2l2-6h8l3 4h3v6h-2M7 17h8M7 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 11h9',
      component: lazyView(() => import('@/features/master-data/vehicles/screen/VehiclesScreen.vue'))
    },
    {
      id: 'employees',
      label: 'Pegawai',
      section: 'Master',
      routePath: '/employees',
      icon: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 21a5 5 0 0 1 10 0M11 21a5 5 0 0 1 10 0',
      component: lazyView(() => import('@/features/master-data/employess/screen/EmployeesScreen.vue'))
    },
    {
      id: 'users',
      label: 'Pengguna',
      shortLabel: 'Pengaturan',
      section: 'Pengaturan',
      routePath: '/users',
      icon: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5ZM19.4 15a1.8 1.8 0 0 0 .36 2l.06.06-2.12 2.12-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.64V20.5h-3V20.4a1.8 1.8 0 0 0-1-1.64 1.8 1.8 0 0 0-2 .36l-.06.06-2.12-2.12.06-.06a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.64-1H5.5v-3H5.6a1.8 1.8 0 0 0 1.64-1 1.8 1.8 0 0 0-.36-2l-.06-.06 2.12-2.12.06.06a1.8 1.8 0 0 0 2 .36 1.8 1.8 0 0 0 1-1.64V3.5h3v.1a1.8 1.8 0 0 0 1 1.64 1.8 1.8 0 0 0 2-.36l.06-.06 2.12 2.12-.06.06a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.64 1H20.5v3H20.4a1.8 1.8 0 0 0-1 .64Z',
      component: lazyView(() => import('@/features/settings/users/screen/UsersScreen.vue'))
    },
    {
      id: 'roles',
      label: 'Peran',
      section: 'Pengaturan',
      routePath: '/roles',
      icon: 'M12 3 20 7v5c0 5-3.4 8.1-8 10-4.6-1.9-8-5-8-10V7l8-4Zm-3 9 2 2 4-5',
      component: lazyView(() => import('@/features/settings/roles/screen/RolesScreen.vue'))
    },
    {
      id: 'shortcuts',
      label: 'Keyboard Shortcuts',
      shortLabel: 'Shortcuts',
      section: 'Pengaturan',
      routePath: '/shortcuts',
      icon: 'M4 6h16v12H4V6Zm4 3h2M14 9h2M4 12h2M14 12h2M4 15h2M14 15h2',
      component: lazyView(() => import('@/features/settings/shortcuts/screen/ShortcutCheatSheetScreen.vue'))
    },
    {
      id: 'shortcut-settings',
      label: 'Pengaturan Shortcut',
      shortLabel: 'Atur Shortcut',
      section: 'Pengaturan',
      routePath: '/settings/shortcuts',
      icon: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5ZM19.4 15a1.8 1.8 0 0 0 .36 2l.06.06-2.12 2.12-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.64V20.5h-3V20.4a1.8 1.8 0 0 0-1-1.64 1.8 1.8 0 0 0-2 .36l-.06.06-2.12-2.12.06-.06a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.64-1H5.5v-3H5.6a1.8 1.8 0 0 0 1.64-1 1.8 1.8 0 0 0-.36-2l-.06-.06 2.12-2.12.06.06a1.8 1.8 0 0 0 2 .36 1.8 1.8 0 0 0 1-1.64V3.5h3v.1a1.8 1.8 0 0 0 1 1.64 1.8 1.8 0 0 0 2-.36l.06-.06 2.12 2.12-.06.06a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.64 1H20.5v3H20.4a1.8 1.8 0 0 0-1 .64Z',
      component: lazyView(() => import('@/features/settings/shortcuts/screen/ShortcutSettingsScreen.vue'))
    }
  ]
}

