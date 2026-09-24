<script setup lang="ts">
import { computed } from 'vue'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'
import DashboardDesktopScreen from '@/features/dashboard/screen/DashboardDesktopScreen.vue'
import DashboardMobileScreen from '@/features/dashboard/screen/DashboardMobileScreen.vue'

const authVm = useAuthVm()
const dashboardComponent = computed(() =>
  authVm.selectedRole === 'employee' ? DashboardMobileScreen : DashboardDesktopScreen
)
</script>

<template>
  <component :is="dashboardComponent" />
</template>
