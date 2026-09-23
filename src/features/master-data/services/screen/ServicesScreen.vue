<script setup lang="ts">
import ServiceFormModal from '@/features/master-data/services/screen/ServiceFormModal.vue'
import { useServicesVm } from '@/features/master-data/services/vm/useServicesVm'

const vm = useServicesVm()
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="page-heading">
      <div>
        <p class="eyebrow">{{ vm.view.subtitle }}</p>
        <h2>{{ vm.view.headingTitle }}</h2>
        <p>{{ vm.view.description }}</p>
      </div>
      <button type="button" class="primary-button" @click="vm.openCreateModal">
        {{ vm.view.primaryActionLabel }}
      </button>
    </section>

    <section class="panel">
      <div class="toolbar">
        <label>
          <span>Cari</span>
          <input v-model="vm.searchQuery" type="search" :placeholder="vm.view.searchPlaceholder" />
        </label>
      </div>

      <div class="data-table data-table--master" role="table" aria-label="Data layanan">
        <div class="data-table__row data-table__row--head" role="row">
          <span>Kode</span>
          <span>Nama</span>
          <span>Deskripsi</span>
          <span>Status</span>
          <span>Aksi</span>
        </div>
        <div v-for="row in vm.serviceRows" :key="row.id" class="data-table__row" role="row">
          <strong>{{ row.code }}</strong>
          <span>{{ row.name }}</span>
          <span>{{ row.description }}</span>
          <mark>{{ row.status }}</mark>
          <span class="table-actions">
            <button type="button" class="ghost-button" @click="vm.openEditModal(row.id)">Ubah</button>
            <button type="button" class="ghost-button" @click="vm.deleteService(row.id)">Hapus</button>
          </span>
        </div>
      </div>

      <p v-if="!vm.serviceRows.length" class="outlet-empty">Tidak ada layanan yang cocok.</p>
    </section>

    <ServiceFormModal />
  </main>
</template>