import type { RouteComponent } from 'vue-router'

export type NavigationComponent = () => Promise<RouteComponent>

export interface AppShellState {
  brandInitials: string
  brandTitle: string
  brandSubtitle: string
  topbarLabel: string
  notificationLabel: string
  notificationIcon: string
  userInitials: string
  userName: string
  userLocation: string
}

export interface NavigationItem {
  id: string
  label: string
  shortLabel?: string
  section: string
  routePath: string
  icon: string
  component: NavigationComponent
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
  placement: 'main' | 'bottom'
}

export interface ShellNavItem {
  id: string
  label: string
  shortLabel?: string
  routePath: string
  icon: string
}

export interface ShellNavigationSection {
  title: string
  items: ShellNavItem[]
  placement: 'main' | 'bottom'
}

export interface AppShellUiState {
  isProfileMenuOpen: boolean
  isQuickActionOpen: boolean
  compactSidebarRouteNames: string[]
  compactSidebarIcons: Record<string, string>
  compactSidebarDefaultIcon: string
  bottomNavigationItems: ShellNavItem[]
  quickActionItems: ShellNavItem[]
}

export interface AppState {
  activeScreenId: string
  shell: AppShellState
  navigationItems: NavigationItem[]
}
