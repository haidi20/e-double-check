<script setup lang="ts">
import DashboardFormModal from '@/features/dashboard/screen/DashboardFormModal.vue'
import { useDashboardVm } from '@/features/dashboard/vm/useDashboardVm'

const vm = useDashboardVm()
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

    <section class="metric-grid" aria-label="Indikator KPI">
      <article v-for="metric in vm.view.dashboardMetrics" :key="metric.label" class="metric-card">
        <div class="metric-card__top">
          <span>{{ metric.icon }}</span>
          <small>{{ metric.trend }}</small>
        </div>
        <strong>{{ metric.value }}</strong>
        <p>{{ metric.label }}</p>
        <div class="progress-track"><i :style="{ width: metric.progressWidth }"></i></div>
      </article>
    </section>

    <section class="row g-4 align-items-start">
      <article class="panel panel--wide col-12 col-xl-8">
        <div class="panel__heading">
          <div>
            <p class="eyebrow">{{ vm.view.chartEyebrow }}</p>
            <h3>{{ vm.view.chartTitle }}</h3>
          </div>
          <span class="status-pill">{{ vm.view.chartStatus }}</span>
        </div>
        <div class="line-chart" aria-label="Grafik tren pesanan">
          <div class="line-chart__plot">
            <svg
              class="line-chart__svg"
              :viewBox="vm.trendChart.viewBox"
              preserveAspectRatio="none"
              role="img"
              aria-label="Grafik garis tren pesanan mingguan"
            >
              <path class="line-chart__grid" :d="vm.trendChart.gridPath" />
              <path class="line-chart__area" :d="vm.trendChart.areaPath" />
              <path class="line-chart__line" :d="vm.trendChart.linePath" />
            </svg>
            <span
              v-for="point in vm.trendChart.points"
              :key="point.id"
              class="line-chart__point"
              :style="{ left: point.xPercent, top: point.yPercent }"
              aria-hidden="true"
            ></span>
          </div>
          <div class="line-chart__labels" :style="{ gridTemplateColumns: vm.trendChart.labelColumns }"
            aria-hidden="true">
            <span v-for="point in vm.trendChart.points" :key="point.id">{{ point.label }}</span>
          </div>
        </div>
      </article>

      <article class="panel col-12 col-xl-4">
        <div class="panel__heading">
          <div>
            <p class="eyebrow">{{ vm.view.deliveryOrderEyebrow }}</p>
            <h3>{{ vm.view.deliveryOrderTitle }}</h3>
          </div>
          <span class="status-pill">{{ vm.deliveryOrderTotalLabel }}</span>
        </div>
        <div v-if="vm.deliveryOrderItems.length" class="activity-list activity-list--delivery-orders">
          <div v-for="item in vm.deliveryOrderItems" :key="item.id" class="activity-item activity-item--delivery-order">
            <span>{{ item.icon }}</span>
            <div>
              <strong>{{ item.code }}</strong>
              <small>{{ item.customer }}</small>
              <small>{{ item.detail }}</small>
            </div>
            <b>{{ item.status }}</b>
          </div>
        </div>
        <p v-else class="empty-state">{{ vm.deliveryOrderEmptyMessage }}</p>
      </article>
    </section>

    <!-- <section class="panel">
      <div class="panel__heading">
        <div>
          <p class="eyebrow">Pesanan Pekerjaan</p>
          <h3>Pesanan terbaru</h3>
        </div>
        <div class="button-row">
          <button type="button" class="ghost-button">Saring</button>
          <button type="button" class="ghost-button">Ekspor CSV</button>
        </div>
      </div>
      <div class="data-table data-table--orders" role="table" aria-label="Pesanan terbaru">
        <div class="data-table__row data-table__row--head" role="row">
          <span>ID Pesanan</span>
          <span>Pelanggan</span>
          <span>Penanggung jawab</span>
          <span>Status</span>
          <span>Muatan</span>
        </div>
        <div v-for="row in vm.view.dashboardOrders" :key="row.code" class="data-table__row" role="row">
          <strong>{{ row.code }}</strong>
          <span>{{ row.primary }}<small>{{ row.secondary }}</small></span>
          <span>{{ row.owner }}</span>
          <mark>{{ row.status }}</mark>
          <span>{{ row.amount }}</span>
        </div>
      </div>
    </section> -->

    <DashboardFormModal />
  </main>
</template>
