import { createRouter, createWebHistory } from 'vue-router'
import { appState } from '@/core/vm/appState'

const defaultNavigationItem =
  appState.navigationItems.find((item) => item.id === appState.activeScreenId) ?? appState.navigationItems[0]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/features/auth/screen/LoginScreen.vue')
    },
    {
      path: '/',
      redirect: defaultNavigationItem.routePath
    },
    ...appState.navigationItems.map((item) => ({
      path: item.routePath,
      name: item.id,
      component: item.component
    }))
  ]
})