<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'
import { useDashboardMobileVm } from '@/features/dashboard/vm/useDashboardMobileVm'

const vm = useDashboardMobileVm()
const authVm = useAuthVm()
</script>

<template>
  <main class="dashboard-page">
    <div class="dashboard-content">
      <header class="dashboard-profile">
        <div class="dashboard-profile__identity">
          <span class="dashboard-profile__avatar">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" /></svg>
          </span>
          <div>
            <strong>{{ vm.view.profileName }}</strong>
            <span class="dashboard-profile__context">
              <span class="dashboard-profile__outlet">{{ vm.view.outletName }}</span>
              <span class="dashboard-profile__shift">- {{ vm.shiftLabel }}</span>
            </span>
          </div>
        </div>
        <button type="button" aria-label="Keluar" class="dashboard-icon-button" @click="authVm.logout">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M14 16l4-4-4-4M9 12h9" /></svg>
        </button>
      </header>

      <section class="dashboard-hero" aria-labelledby="employee-dashboard-title">
        <p class="dashboard-hero__eyebrow">{{ vm.view.eyebrow }}</p>
        <h1 id="employee-dashboard-title">{{ vm.view.title }}</h1>
        <p class="dashboard-hero__subtitle">{{ vm.view.subtitle }}</p>

        <div class="dashboard-hero__meta">
          <span>{{ vm.shiftDateLabel }}</span>
          <span>{{ vm.categoryCount }} kategori</span>
          <span>{{ vm.totalQuestions }} pertanyaan</span>
        </div>

        <div class="dashboard-hero__actions">
          <RouterLink :to="vm.view.primaryActionPath" class="dashboard-hero__primary">
            {{ vm.view.primaryActionLabel }}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </RouterLink>
          <RouterLink :to="vm.view.secondaryActionPath" class="dashboard-hero__secondary">
            {{ vm.view.secondaryActionLabel }}
          </RouterLink>
        </div>
      </section>

      <section class="dashboard-section" aria-labelledby="employee-priority-title">
        <header class="dashboard-section__heading">
          <div>
            <h2 id="employee-priority-title">{{ vm.view.priorityDescription }}</h2>
          </div>
        </header>
        <div class="dashboard-priority-grid">
          <article v-for="item in vm.priorityItems" :key="item.id" class="dashboard-priority">
            <span class="dashboard-priority__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="item.icon" /></svg>
            </span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

    </div>
  </main>
</template>

<style scoped src="./DashboardMobileScreen.css"></style>
