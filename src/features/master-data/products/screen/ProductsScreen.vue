<script setup lang="ts">
import ProductFormModal from '@/features/master-data/products/screen/ProductFormModal.vue'
import { useProductsVm } from '@/features/master-data/products/vm/useProductsVm'

const vm = useProductsVm()
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
      <article v-for="item in vm.view.goodsSummary" :key="item.label" class="panel">
        <p class="eyebrow">{{ item.label }}</p>
        <strong class="big-number">{{ item.value }}</strong>
        <p>{{ item.description }}</p>
      </article>
    </section>

    <section class="goods-layout goods-layout--single">
      <article class="panel panel--wide">
        <div class="toolbar">
          <label>
            <span>Cari</span>
            <input type="search" placeholder="Cari kode atau nama barang" />
          </label>
          <select aria-label="Kategori">
            <option>Semua kategori</option>
            <option>Bahan Bangunan</option>
            <option>Finishing</option>
          </select>
          <button type="button" class="ghost-button">Manajemen Satuan</button>
        </div>
        <div class="data-table data-table--goods" role="table" aria-label="Daftar barang">
          <div class="data-table__row data-table__row--head" role="row">
            <span>Kode Barang</span>
            <span>Nama Barang</span>
            <span>Kategori</span>
            <span>Satuan</span>
            <span>Status</span>
          </div>
          <div v-for="row in vm.view.goodsRows" :key="row.code" class="data-table__row" role="row">
            <strong>{{ row.code }}</strong>
            <span>{{ row.name }}<small>Stok: {{ row.stock }}</small></span>
            <span>{{ row.category }}</span>
            <span>{{ row.unit }}</span>
            <mark>{{ row.status }}</mark>
          </div>
        </div>
      </article>
    </section>

    <ProductFormModal />
  </main>
</template>
