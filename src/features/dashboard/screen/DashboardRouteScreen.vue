<script setup lang="ts">
import { computed } from 'vue'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'
import DashboardDesktopScreen from '@/features/dashboard/screen/DashboardDesktopScreen.vue'
import DashboardScreen from '@/features/dashboard/screen/DashboardScreen.vue'

const authVm = useAuthVm()
const dashboardComponent = computed(() => authVm.selectedRole === 'employee' ? DashboardScreen : DashboardDesktopScreen)
</script>

<template>
  <component :is="dashboardComponent" />
</template>
