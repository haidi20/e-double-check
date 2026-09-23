import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { appState } from '@/core/vm/appState'
import type { NavigationSection } from '@/core/type/appTypes'

export const useAppVm = defineStore('appVm', () => {
  const route = useRoute()
  const router = useRouter()
  const navigationItems = appState.navigationItems
  const shell = appState.shell
  const isMobileMenuOpen = ref(false)

  const navigationSections = computed<NavigationSection[]>(() => {
    const sections = new Map<string, typeof navigationItems>()

    for (const item of navigationItems) {
      const sectionItems = sections.get(item.section) ?? []
      sectionItems.push(item)
      sections.set(item.section, sectionItems)
    }

    return Array.from(sections, ([title, items]) => ({
      title,
      items,
      placement: title === 'Pengaturan' ? 'bottom' : 'main'
    }))
  })

  const activeScreen = computed(() => {
    const routeName = typeof route.name === 'string' ? route.name : ''

    return (
      navigationItems.find((item) => item.id === routeName || item.routePath === route.path) ??
      navigationItems.find((item) => item.id === appState.activeScreenId) ??
      navigationItems[0]
    )
  })

  const activeScreenId = computed(() => activeScreen.value.id)

  const isNavigationActive = (screenId: string) => activeScreen.value.id === screenId

  const openMobileMenu = () => {
    isMobileMenuOpen.value = true
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const setActiveScreen = async (screenId: string) => {
    const target = navigationItems.find((item) => item.id === screenId)

    if (!target || target.routePath === route.path) {
      return
    }

    await router.push(target.routePath)
  }

  watch(
    () => route.fullPath,
    () => {
      closeMobileMenu()
    }
  )

  return {
    activeScreen,
    activeScreenId,
    closeMobileMenu,
    isMobileMenuOpen,
    isNavigationActive,
    navigationSections,
    openMobileMenu,
    setActiveScreen,
    shell,
    toggleMobileMenu
  }
})
