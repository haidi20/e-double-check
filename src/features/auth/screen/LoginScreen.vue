<script setup lang="ts">
import './login.css'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'

const vm = useAuthVm()
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="login-shell">
    <div class="login-container">
      <section class="login-hero">
        <span class="login-hero__glow login-hero__glow--one"></span>
        <span class="login-hero__glow login-hero__glow--two"></span>
        <div class="login-hero__logo">ED</div>
        <p class="login-hero__eyebrow">Selamat datang di</p>
        <h1>e-double-check</h1>
        <p>Checklist Anti Ketinggalan Harian</p>
      </section>

      <section class="login-body login-body--sheet">
        <div>
          <h2 class="login-body__title">Masuk ke aplikasi</h2>
          <p class="login-body__description">Pilih akses sesuai peran Anda untuk melanjutkan.</p>
          <p class="login-body__label">Pilih peran Anda</p>
          <div class="login-role-grid">
            <button
              v-for="role in vm.roleOptions"
              :key="role.value"
              type="button"
              class="login-role-card"
              :class="{ 'is-selected': vm.selectedRole === role.value }"
              @click="vm.selectRole(role.value)"
            >
              <span class="login-role-card__icon" v-html="role.icon"></span>
              <strong>{{ role.label }}</strong>
              <small>{{ role.description }}</small>
            </button>
          </div>
        </div>

        <button
          type="button"
          class="login-submit"
          :disabled="!vm.selectedRole || vm.isLoading"
          @click="vm.login"
        >
          <span v-if="vm.isLoading" class="login-submit__spinner"></span>
          <span v-else>Masuk</span>
        </button>
      </section>

      <footer class="login-footer">
        UTAMA WEB &copy; {{ currentYear }} &mdash; Digitalisasi Checklist Operasional Warung
      </footer>
    </div>
  </div>
</template>


