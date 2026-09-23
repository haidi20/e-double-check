<script setup lang="ts">
import AuthAccessFormModal from '@/features/auth/screen/AuthAccessFormModal.vue'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'

const vm = useAuthVm()
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="page-heading">
      <div>
        <p class="eyebrow">{{ vm.view.subtitle }}</p>
        <h2>{{ vm.view.headingTitle }}</h2>
        <p>{{ vm.view.description }}</p>
      </div>
      <button type="button" class="primary-button" @click="vm.openFormModal">{{ vm.view.primaryActionLabel }}</button>
    </section>

    <section class="access-layout access-layout--single">
      <article class="panel panel--wide">
        <div class="tabs" aria-label="Menu akses">
          <button type="button" class="is-active">Sesi Aktif</button>
          <button type="button">Peran & Izin</button>
          <button type="button">Audit Masuk</button>
        </div>
        <div class="access-list">
          <article v-for="row in vm.view.accessRows" :key="row.name" class="access-row">
            <span>{{ row.initials }}</span>
            <div>
              <strong>{{ row.name }}</strong>
              <small>{{ row.area }}</small>
            </div>
            <b>{{ row.role }}</b>
            <mark>{{ row.status }}</mark>
          </article>
        </div>
      </article>
    </section>

    <AuthAccessFormModal />
  </main>
</template>
