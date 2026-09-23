import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { appShellState } from '@/core/vm/appShellState'
import { useAppVm } from '@/core/vm/useAppVm'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'
import { useDashboardVm } from '@/features/dashboard/vm/useDashboardVm'
import type { AuthRole } from '@/features/auth/type/authTypes'
import type { ShellNavigationSection } from '@/core/type/appTypes'

export const useAppShellVm = defineStore('appShellVm', () => {
  const route = useRoute()
  const router = useRouter()
  const appVm = useAppVm()
  const authVm = useAuthVm()
  const dashboardVm = useDashboardVm()
  const view = reactive({ ...appShellState })

  const isLoginRoute = computed(() => route.path === '/login')
  const isCompactSidebarRoute = computed(() =>
    view.compactSidebarRouteNames.includes(String(route.name))
  )
  const isMobileDashboardRoute = computed(
    () => route.name === 'dashboard' && authVm.selectedRole === 'employee'
  )

  const desktopNavigationSections = computed<ShellNavigationSection[]>(() => {
    if (!isCompactSidebarRoute.value) {
      return appVm.navigationSections
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
          icon: view.compactSidebarIcons[item.id] ?? view.compactSidebarDefaultIcon
        }))
      }
    ]
  })

  watch(
    () => route.query.role,
    (role) => {
      const normalizedRole: AuthRole | null =
        role === 'admin' || role === 'employee' ? role : null

      if (normalizedRole && authVm.selectedRole !== normalizedRole) {
        authVm.selectRole(normalizedRole)
      }
    },
    { immediate: true }
  )

  const isNavigationActive = (screenId: string) => appVm.isNavigationActive(screenId)
  const closeMobileMenu = () => appVm.closeMobileMenu()
  const toggleMobileMenu = () => appVm.toggleMobileMenu()

  const toggleProfileMenu = () => {
    view.isProfileMenuOpen = !view.isProfileMenuOpen
  }

  const closeProfileMenu = () => {
    view.isProfileMenuOpen = false
  }

  const toggleQuickAction = () => {
    view.isQuickActionOpen = !view.isQuickActionOpen
  }

  const closeQuickAction = () => {
    view.isQuickActionOpen = false
  }

  const logout = async () => {
    closeProfileMenu()
    await authVm.logout()
  }

  const openQuickAction = async (routePath: string) => {
    closeQuickAction()
    await router.push(routePath)
  }

  return {
    view,
    isLoginRoute,
    isCompactSidebarRoute,
    isMobileDashboardRoute,
    desktopNavigationSections,
    isNavigationActive,
    closeMobileMenu,
    toggleMobileMenu,
    toggleProfileMenu,
    closeProfileMenu,
    toggleQuickAction,
    closeQuickAction,
    logout,
    openQuickAction,
    shell: computed(() => appVm.shell),
    activeScreen: computed(() => appVm.activeScreen),
    isMobileMenuOpen: computed(() => appVm.isMobileMenuOpen)
  }
})
