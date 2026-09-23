<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAppVm } from '@/core/vm/useAppVm'

const vm = useAppVm()
</script>

<template>
  <div class="app-layout min-vh-100">
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
        <section v-for="section in vm.navigationSections" :key="section.title" class="app-sidebar__section"
          :class="{ 'app-sidebar__section--bottom': section.placement === 'bottom' }">
          <p>{{ section.title }}</p>
          <RouterLink
            v-for="item in section.items"
            :key="item.id"
            :to="item.routePath"
            :class="{ 'is-active': vm.isNavigationActive(item.id) }"
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
          <div class="app-topbar__profile">
            <span>{{ vm.shell.userInitials }}</span>
            <div>
              <strong>{{ vm.shell.userName }}</strong>
              <small>{{ vm.shell.userLocation }}</small>
            </div>
          </div>
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>
