<script setup lang="ts">
import MatrixKpiFormModal from '@/features/matrix-kpi/screen/MatrixKpiFormModal.vue'
import { useMatrixKpiVm } from '@/features/matrix-kpi/vm/useMatrixKpiVm'

const vm = useMatrixKpiVm()
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

    <section class="metric-grid" aria-label="Ringkasan metrik KPI">
      <article v-for="metric in vm.view.metrics" :key="metric.label" class="metric-card">
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
      <div class="panel__heading">
        <div>
          <p class="eyebrow">{{ vm.view.tableEyebrow }}</p>
          <h3>{{ vm.view.tableTitle }}</h3>
        </div>
        <span class="status-pill">{{ vm.view.tableStatus }}</span>
      </div>

      <div class="tabs" aria-label="Status waktu faktur">
        <button
          v-for="tab in vm.view.invoiceTabs"
          :key="tab.id"
          type="button"
          :class="{ 'is-active': vm.view.activeInvoiceTabId === tab.id }"
          @click="vm.setActiveInvoiceTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
      <p class="report-tab-description">{{ vm.activeInvoiceTab.description }} Batas saat ini: {{ vm.slaLabel }}.</p>

      <div class="data-table data-table--kpi-invoices" role="table" aria-label="Daftar faktur KPI">
        <div class="data-table__row data-table__row--head" role="row">
          <span>No Faktur</span>
          <span>Warung</span>
          <span>Faktur dibuat</span>
          <span>Status</span>
          <span>Durasi</span>
        </div>
        <div v-for="row in vm.activeInvoiceRows" :key="row.invoiceNo" class="data-table__row" role="row">
          <strong>{{ row.invoiceNo }}</strong>
          <span>{{ row.outletName }}<small>{{ row.deliveredAt }}</small></span>
          <span>{{ row.issuedAt }}</span>
          <mark>{{ row.status }}</mark>
          <span>{{ row.duration }}</span>
        </div>
      </div>
    </section>

    <MatrixKpiFormModal />
  </main>
</template>
