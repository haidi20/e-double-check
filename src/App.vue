<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAppShellVm } from '@/core/vm/useAppShellVm'

const vm = useAppShellVm()
</script>

<template>
  <RouterView v-if="vm.isLoginRoute" />

  <div v-else-if="vm.isMobileDashboardRoute" class="app-shell">
    <div class="app-container">
      <Transition name="slide-up-page" mode="out-in">
        <RouterView />
      </Transition>
    </div>

    <nav v-if="!vm.isQuestionRoute" class="bottom-nav" aria-label="Navigasi utama">
      <RouterLink
        v-for="item in vm.view.bottomNavigationItems"
        :key="item.id"
        :to="item.routePath"
        class="bottom-nav__item"
      >
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path :d="item.icon" />
        </svg>
        <span>{{ item.label }}</span>
      </RouterLink>

      <button
        type="button"
        class="bottom-nav__plus"
        aria-label="Buka halaman pertanyaan"
        @click="vm.openQuestionPage"
      >
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </nav>

  </div>

  <div v-else class="app-layout min-vh-100">
    <button
      type="button"
      class="app-sidebar-backdrop"
      :class="{ 'is-open': vm.isMobileMenuOpen }"
      aria-label="Tutup menu navigasi"
      @click="vm.closeMobileMenu"
    ></button>

    <aside
      class="app-sidebar d-flex flex-column"
      :class="{ 'is-open': vm.isMobileMenuOpen }"
      aria-label="Navigasi utama"
    >
      <div class="app-sidebar__brand">
        <div class="app-sidebar__logo">{{ vm.shell.brandInitials }}</div>
        <div>
          <strong>{{ vm.shell.brandTitle }}</strong>
          <span>{{ vm.shell.brandSubtitle }}</span>
        </div>
      </div>

      <nav class="app-sidebar__nav">
        <section
          v-for="section in vm.desktopNavigationSections"
          :key="section.title"
          class="app-sidebar__section"
          :class="{ 'app-sidebar__section--bottom': section.placement === 'bottom' }"
        >
          <p>{{ section.title }}</p>
          <RouterLink
            v-for="item in section.items"
            :key="item.id"
            :to="item.routePath"
            :class="['dashboard-sidebar-link--' + item.id, { 'is-active': vm.isNavigationActive(item.id) }]"
            @click="vm.closeMobileMenu"
          >
            <span class="app-sidebar__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
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
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
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
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path :d="vm.shell.notificationIcon" />
            </svg>
          </button>
          <div class="app-topbar__profile-wrap">
            <button
              type="button"
              class="app-topbar__profile"
              :aria-expanded="vm.view.isProfileMenuOpen"
              @click="vm.toggleProfileMenu"
            >
              <span>{{ vm.shell.userInitials }}</span>
              <div>
                <strong>{{ vm.shell.userName }}</strong>
                <small>{{ vm.shell.userLocation }}</small>
              </div>
            </button>
            <transition name="lv-dropdown">
              <div v-if="vm.view.isProfileMenuOpen" class="app-topbar__dropdown">
                <div class="app-topbar__dropdown-header">
                  <strong>{{ vm.shell.userName }}</strong>
                  <small>{{ vm.shell.userLocation }}</small>
                </div>
                <button
                  type="button"
                  class="app-topbar__dropdown-item app-topbar__dropdown-item--danger"
                  @click="vm.logout"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <path d="M16 17l5-5-5-5" />
                    <path d="M21 12H9" />
                  </svg>
                  Keluar
                </button>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>
