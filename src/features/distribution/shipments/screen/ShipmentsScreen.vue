<script setup lang="ts">
import ShipmentFormModal from '@/features/distribution/shipments/screen/ShipmentFormModal.vue'
import { useShipmentsVm } from '@/features/distribution/shipments/vm/useShipmentsVm'

const vm = useShipmentsVm()
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
        <section class="metric-grid metric-grid--three" aria-label="Ringkasan pengiriman">
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
              <option>Diproses</option>
              <option>Dalam perjalanan</option>
              <option>Selesai</option>
            </select>
            <button type="button" class="ghost-button">Saring</button>
          </div>
          <div class="data-table data-table--shipments" role="table" aria-label="Daftar pengiriman">
            <div class="data-table__row data-table__row--head" role="row">
              <span>No Pengiriman</span>
              <span>Faktur</span>
              <span>Driver / Kendaraan</span>
              <span>Status</span>
              <span>Muatan</span>
            </div>
            <div v-for="row in vm.view.shipmentRows" :key="row.code" class="data-table__row" role="row">
              <strong>{{ row.code }}</strong>
              <span>{{ row.invoiceSummary }}<small>{{ row.customerSummary }}</small></span>
              <span>{{ row.driverLabel }}<small>{{ row.vehicleLabel }}</small></span>
              <mark>{{ row.status }}</mark>
              <span>{{ row.loadSummary }}</span>
            </div>
          </div>
        </section>
      </div>
    </section>

    <ShipmentFormModal />
  </main>
</template>
