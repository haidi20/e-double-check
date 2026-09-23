<script setup lang="ts">
import WarehouseFormModal from '@/features/master-data/warehouses/screen/WarehouseFormModal.vue'
import { useWarehousesVm } from '@/features/master-data/warehouses/vm/useWarehousesVm'

const vm = useWarehousesVm()
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

    <section class="master-grid">
      <article v-for="card in vm.view.masterCards" :key="card.title" class="panel">
        <span class="tile-icon">{{ card.icon }}</span>
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
      </article>
    </section>

    <section class="panel">
      <div class="toolbar">
        <label>
          <span>Cari</span>
          <input type="search" :placeholder="vm.view.searchPlaceholder" />
        </label>
        <button type="button" class="ghost-button">Saring</button>
        <button type="button" class="ghost-button">Ekspor CSV</button>
      </div>
      <div class="data-table data-table--master" role="table" aria-label="Data gudang">
        <div class="data-table__row data-table__row--head" role="row">
          <span>Kode</span>
          <span>Nama</span>
          <span>Penanggung jawab</span>
          <span>Status</span>
          <span>Aksi</span>
        </div>
        <div v-for="row in vm.view.masterRows" :key="row.code" class="data-table__row" role="row">
          <strong>{{ row.code }}</strong>
          <span>{{ row.name }}<small>{{ row.description }}</small></span>
          <span>{{ row.owner }}</span>
          <mark>{{ row.status }}</mark>
          <span class="table-actions">
            <button type="button" class="ghost-button" @click="vm.openFormModal">Ubah</button>
            <button type="button" class="ghost-button">Hapus</button>
          </span>
        </div>
      </div>
    </section>

    <WarehouseFormModal />
  </main>
</template>
