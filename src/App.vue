<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAppVm } from '@/core/vm/useAppVm'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'
import { useDashboardVm } from '@/features/dashboard/vm/useDashboardVm'

const router = useRouter()


const vm = useAppVm()
const authVm = useAuthVm()
const dashboardVm = useDashboardVm()
const route = useRoute()
const isLoginRoute = computed(() => route.path === '/login')

watch(
  () => route.query.role,
  (role) => {
    if ((role === 'admin' || role === 'employee') && authVm.selectedRole !== role) {
      authVm.selectRole(role)
    }
  },
  { immediate: true }
)

const isDashboardRoute = computed(() => route.name === 'dashboard')
const isEmployeesRoute = computed(() => route.name === 'employees')
const isCompactSidebarRoute = computed(() => isDashboardRoute.value || isEmployeesRoute.value)
const isMobileDashboardRoute = computed(() => isDashboardRoute.value && authVm.selectedRole === 'employee')
const desktopNavigationSections = computed(() => {
  if (!isCompactSidebarRoute.value) {
    return vm.navigationSections
  }

  return [
    {
      title: 'Menu Daftar Pertanyaan',
      placement: 'main',
      items: dashboardVm.view.favoriteItems.map((item) => ({
        id: item.id,
        label: item.label,
        shortLabel: item.label,
        routePath: item.routePath,
        icon: item.id === 'checklist'
          ? 'M6 3h12v18H6zM9 7h6M9 11h4M9 15h6'
          : item.id === 'categories'
            ? 'M4 6h16v4H4zM4 12h16v4H4zM4 18h16v2H4z'
            : item.id === 'questions'
              ? 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5'
              : item.id === 'answer-types'
                ? 'M4 6h16M4 12h16M4 18h16M8 4v4M16 10v4M11 16v4'
                : item.id === 'services'
                  ? 'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 21a7 7 0 0 1 14 0M4 12h4M16 12h4'
                  : item.id === 'outlets'
                    ? 'M4 20V8l8-5 8 5v12H4ZM8 20v-6h8v6M8 10h2M14 10h2'
                    : 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6M3 21a5 5 0 0 1 10 0M13 21a5 5 0 0 1 8 0',
        colorClass: `dashboard-sidebar-link--${item.id}`
      }))
    }
  ]
})
const bottomNavigationItems = [
  { id: 'dashboard', label: 'Beranda', routePath: '/dashboard', icon: 'M3 10 12 3l9 7v10H3V10Zm6 10v-6h6v6' },
  { id: 'products', label: 'Produk Anda', routePath: '/products', icon: 'M4 8h16v12H4zM7 8V6a5 5 0 0 1 10 0v2M8 13h8' },
  { id: 'favorite', label: 'Sukha', routePath: '/roles', icon: 'M12 21s-7-4.4-9-9.2C1.5 8.2 3.7 5 7 5c2 0 3.4 1.1 5 2.8C13.6 6.1 15 5 17 5c3.3 0 5.5 3.2 4 6.8C19 16.6 12 21 12 21Z' },
  { id: 'loyalty', label: 'Loyalty', routePath: '/reports', icon: 'M4 17a8 8 0 1 1 16 0M7 17a5 5 0 1 1 10 0M10 17a2 2 0 1 1 4 0' }
]
const quickActionItems = [
  { id: 'reports', label: 'Laporan', routePath: '/reports', icon: 'M4 20V10M10 20V4M16 20v-6M22 20H2' },
  { id: 'warehouses', label: 'Warung', routePath: '/warehouses', icon: 'M3 10 12 4l9 6v10H3V10Zm5 10v-6h8v6M7 10h10' },
  { id: 'employees', label: 'Pegawai', routePath: '/employees', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0' },
  { id: 'users', label: 'Pengguna', routePath: '/users', icon: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5 21a7 7 0 0 1 14 0' },
  { id: 'doc', label: 'Dokumentasi', routePath: '/doc', icon: 'M6 3h9l3 3v15H6V3Zm9 0v4h4M9 11h6M9 15h6M9 19h4' },
  { id: 'roles', label: 'Pengaturan', routePath: '/roles', icon: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.8 1.8 0 0 0 .36 2l.06.06-2.12 2.12-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.64V20.5h-3V20.4a1.8 1.8 0 0 0-1-1.64 1.8 1.8 0 0 0-2 .36l-.06.06-2.12-2.12.06-.06a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.64-1H5.5v-3H5.6a1.8 1.8 0 0 0 1.64-1 1.8 1.8 0 0 0-.36-2l-.06-.06 2.12-2.12.06.06a1.8 1.8 0 0 0 2 .36 1.8 1.8 0 0 0 1-1.64V3.5h3v.1a1.8 1.8 0 0 0 1 1.64 1.8 1.8 0 0 0 2-.36l.06-.06 2.12 2.12-.06.06a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.64 1H20.5v3H20.4a1.8 1.8 0 0 0-1 .64Z' }
]
const isProfileMenuOpen = ref(false)
const isQuickActionOpen = ref(false)
const logout = async () => {
  isProfileMenuOpen.value = false
  await authVm.logout()
}
const openQuickAction = (routePath: string) => {
  isQuickActionOpen.value = false
  router.push(routePath)
}
</script>

<template>
  <RouterView v-if="isLoginRoute" />

  <div v-else-if="isMobileDashboardRoute" class="app-shell">
    <div class="app-container">
      <RouterView />
    </div>

    <button
      v-if="isQuickActionOpen"
      type="button"
      class="quick-action-backdrop"
      aria-label="Tutup menu aksi"
      @click="isQuickActionOpen = false"
    ></button>

    <nav class="bottom-nav" aria-label="Navigasi utama">
      <RouterLink
        v-for="item in bottomNavigationItems"
        :key="item.id"
        :to="item.routePath"
        class="bottom-nav__item"
      >
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path :d="item.icon" />
        </svg>
        <span>{{ item.label }}</span>
      </RouterLink>

      <button
        type="button"
        class="bottom-nav__plus"
        :aria-expanded="isQuickActionOpen"
        aria-label="Buka menu aksi"
        @click="isQuickActionOpen = !isQuickActionOpen"
      >
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </nav>

    <section v-if="isQuickActionOpen" class="quick-action-sheet" aria-label="Menu aksi cepat">
      <div class="quick-action-sheet__handle"></div>
      <header class="quick-action-sheet__header">
        <div>
          <h2>Menu Utama</h2>
          <p>Pilih aksi yang ingin kamu buka</p>
        </div>
        <button type="button" aria-label="Tutup menu" @click="isQuickActionOpen = false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </header>
      <div class="quick-action-sheet__grid">
        <button
          v-for="item in quickActionItems"
          :key="item.id"
          type="button"
          class="quick-action-item"
          @click="openQuickAction(item.routePath)"
        >
          <span class="quick-action-item__icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="item.icon" />
            </svg>
          </span>
          <span>{{ item.label }}</span>
        </button>
      </div>
    </section>
  </div>

  <div v-else class="app-layout min-vh-100">
    <button
      type="button"
      class="app-sidebar-backdrop"
      :class="{ 'is-open': vm.isMobileMenuOpen }"
      aria-label="Tutup menu navigasi"
      @click="vm.closeMobileMenu"
    ></button>

    <aside class="app-sidebar d-flex flex-column" :class="{ 'is-open': vm.isMobileMenuOpen }" aria-label="Navigasi utama">
      <div class="app-sidebar__brand">
        <div class="app-sidebar__logo">{{ vm.shell.brandInitials }}</div>
        <div>
          <strong>{{ vm.shell.brandTitle }}</strong>
          <span>{{ vm.shell.brandSubtitle }}</span>
        </div>
      </div>

      <nav class="app-sidebar__nav">
        <section v-for="section in desktopNavigationSections" :key="section.title" class="app-sidebar__section"
          :class="{ 'app-sidebar__section--bottom': section.placement === 'bottom' }">
          <p>{{ section.title }}</p>
          <RouterLink
            v-for="item in section.items"
            :key="item.id"
            :to="item.routePath"
            :class="['dashboard-sidebar-link--' + item.id, { 'is-active': vm.isNavigationActive(item.id) }]"
            @click="vm.closeMobileMenu"
          >
            <span class="app-sidebar__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <path :d="item.icon" />
              </svg>
            </span>
            {{ item.shortLabel ?? item.label }}
          </RouterLink>
        </section>
      </nav>
    </aside>

    <div class="app-main">
      <header class="app-topbar d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center">
        <div class="app-topbar__title">
          <button
            type="button"
            class="app-topbar__menu"
            :aria-expanded="vm.isMobileMenuOpen"
            aria-label="Buka menu navigasi"
            @click="vm.toggleMobileMenu"
          >
            <svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <div>
            <p>{{ vm.shell.topbarLabel }}</p>
            <h1>{{ vm.activeScreen.label }}</h1>
          </div>
        </div>
        <div class="app-topbar__actions" aria-label="Aksi pengguna">
          <button type="button" :aria-label="vm.shell.notificationLabel">
            <svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path :d="vm.shell.notificationIcon" />
            </svg>
          </button>
          <div class="app-topbar__profile-wrap">
            <button type="button" class="app-topbar__profile" :aria-expanded="isProfileMenuOpen" @click="isProfileMenuOpen = !isProfileMenuOpen">
              <span>{{ vm.shell.userInitials }}</span>
              <div>
                <strong>{{ vm.shell.userName }}</strong>
                <small>{{ vm.shell.userLocation }}</small>
              </div>
            </button>
            <transition name="lv-dropdown">
              <div v-if="isProfileMenuOpen" class="app-topbar__dropdown">
                <div class="app-topbar__dropdown-header">
                  <strong>{{ vm.shell.userName }}</strong>
                  <small>{{ vm.shell.userLocation }}</small>
                </div>
                <button type="button" class="app-topbar__dropdown-item app-topbar__dropdown-item--danger" @click="logout">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <path d="M16 17l5-5-5-5"/>
                    <path d="M21 12H9"/>
                  </svg>
                  Keluar
                </button>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>








