<script setup lang="ts">
import DeliveryOrderFormModal from '@/features/distribution/delivery-orders/screen/DeliveryOrderFormModal.vue'
import { useDeliveryOrdersVm } from '@/features/distribution/delivery-orders/vm/useDeliveryOrdersVm'

const vm = useDeliveryOrdersVm()
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

    <section class="operations-layout operations-layout--single">
      <div class="feature-stack">
        <section class="metric-grid metric-grid--three" aria-label="Ringkasan surat jalan">
          <article v-for="metric in vm.view.operationMetrics" :key="metric.label" class="metric-card">
            <div class="metric-card__top">
              <span>{{ metric.icon }}</span>
              <small>{{ metric.trend }}</small>
            </div>
            <strong>{{ metric.value }}</strong>
            <p>{{ metric.label }}</p>
            <div class="progress-track"><i :style="{ width: metric.progressWidth }"></i></div>
          </article>
        </section>

        <section class="panel">
          <div class="toolbar">
            <label>
              <span>Cari</span>
              <input type="search" :placeholder="vm.view.searchPlaceholder" />
            </label>
            <select aria-label="Status">
              <option>Semua status</option>
              <option>Draft</option>
              <option>Siap cetak</option>
              <option>Tercetak</option>
              <option>Dipakai</option>
              <option>Dibatalkan</option>
            </select>
            <button type="button" class="ghost-button">Saring</button>
          </div>
          <div class="data-table data-table--orders" role="table" aria-label="Daftar surat jalan">
            <div class="data-table__row data-table__row--head" role="row">
              <span>No. Surat Jalan</span>
              <span>Faktur / Customer</span>
              <span>Armada</span>
              <span>Status</span>
              <span>Muatan</span>
            </div>
            <div v-for="row in vm.view.operationRows" :key="row.code" class="data-table__row" role="row">
              <strong>{{ row.code }}</strong>
              <span>{{ row.primary }}<small>{{ row.secondary }}</small></span>
              <span>{{ row.owner }}</span>
              <mark>{{ row.status }}</mark>
              <span>{{ row.amount }}</span>
            </div>
          </div>
        </section>
      </div>
    </section>

    <DeliveryOrderFormModal />
  </main>
</template>
