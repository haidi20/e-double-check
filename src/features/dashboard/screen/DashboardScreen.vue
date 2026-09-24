<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useDashboardVm } from '@/features/dashboard/vm/useDashboardVm'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'

const vm = useDashboardVm()
const authVm = useAuthVm()
</script>

<template>
  <main class="dashboard-page">
    <div class="dashboard-content">
      <header class="dashboard-profile">
        <div class="dashboard-profile__identity">
          <span class="dashboard-profile__avatar">{{ vm.view.profileInitials }}</span>
          <div>
            <strong>{{ vm.view.profileName }}</strong>
            <!-- <button type="button" class="dashboard-profile__points">
              {{ vm.view.profilePoints }} <span aria-hidden="true">›</span>
            </button> -->
          </div>
        </div>
        <div class="dashboard-profile__actions">
          <button type="button" aria-label="Notifikasi" class="dashboard-icon-button dashboard-icon-button--notification">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5a8 8 0 0 1 16 0v5l2 2H2l2-2v-5ZM9 20h6" /></svg>
            <i></i>
          </button>
          <button type="button" aria-label="Pengaturan" class="dashboard-icon-button">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19 12h3M2 12h3M12 2v3M12 19v3M17 7l2-2M5 19l2-2M17 17l2 2M5 5l2 2" /></svg>
          </button>
          <button type="button" aria-label="Keluar" class="dashboard-icon-button" @click="authVm.logout">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M14 16l4-4-4-4M9 12h9" /></svg>
          </button>
        </div>
      </header>
      <!-- <section class="dashboard-card favorite-card" aria-labelledby="favorite-title">
        <header class="dashboard-card__heading">
          <h2 id="favorite-title">Menu checklist</h2>
          <RouterLink to="/roles" class="dashboard-text-button">Atur <span class="sliders-icon">=</span></RouterLink>
        </header>

        <div class="favorite-grid">
          <RouterLink v-for="item in vm.view.favoriteItems" :key="item.id" :to="item.routePath" class="favorite-item">
            <span class="favorite-item__icon">
              <small v-if="item.badge">{{ item.badge }}</small>
              {{ item.icon }}
            </span>
            <span>{{ item.label }}</span>
          </RouterLink>
        </div>

        <div class="dashboard-promo"><span>QRIS</span><strong>{{ vm.view.promoLabel }}</strong></div>
      </section> -->
    </div>
  </main>
</template>

<style scoped src=./DashboardScreen.css></style>


