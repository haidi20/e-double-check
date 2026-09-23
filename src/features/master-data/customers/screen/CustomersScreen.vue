<script setup lang="ts">
import CustomerFormModal from '@/features/master-data/customers/screen/CustomerFormModal.vue'
import { useCustomersVm } from '@/features/master-data/customers/vm/useCustomersVm'

const vm = useCustomersVm()
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="page-heading">
      <div>
        <p class="eyebrow">{{ vm.view.subtitle }}</p>
        <h2>Master Pelanggan</h2>
        <p>{{ vm.view.description }}</p>
      </div>
      <button type="button" class="primary-button" @click="vm.openFormModal">{{ vm.view.primaryActionLabel }}</button>
    </section>

    <section class="master-grid">
      <article class="panel">
        <span class="tile-icon">PL</span>
        <h3>Total pelanggan</h3>
        <p>10 data pelanggan outlet aktif dan perlu ditinjau.</p>
      </article>
      <article class="panel">
        <span class="tile-icon">AR</span>
        <h3>Wilayah distribusi</h3>
        <p>Makassar, Maros, Gowa, dan Parepare.</p>
      </article>
      <article class="panel">
        <span class="tile-icon">AK</span>
        <h3>Status akun</h3>
        <p>Data pelanggan digunakan untuk order pesanan, faktur, dan pengiriman.</p>
      </article>
    </section>

    <section class="panel">
      <div class="toolbar">
        <label>
          <span>Cari</span>
          <input type="search" placeholder="Cari kode, nama, wilayah, atau status pelanggan" />
        </label>
        <select aria-label="Status pelanggan">
          <option>Semua status</option>
          <option>Aktif</option>
          <option>Diproses</option>
          <option>Perlu ditinjau</option>
        </select>
        <button type="button" class="ghost-button">Saring</button>
      </div>

      <div class="data-table data-table--customers" role="table" aria-label="Data pelanggan">
        <div class="data-table__row data-table__row--head" role="row">
          <span>Kode</span>
          <span>Nama pelanggan</span>
          <span>Wilayah</span>
          <span>Status</span>
          <span>Aksi</span>
        </div>
        <div v-for="row in vm.view.dummyData" :key="row.code" class="data-table__row" role="row">
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

    <CustomerFormModal />
  </main>
</template>
