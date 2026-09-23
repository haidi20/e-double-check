<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useDashboardVm } from '@/features/dashboard/vm/useDashboardVm'

const vm = useDashboardVm()
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="page-heading">
      <div>
        <p class="eyebrow">{{ vm.view.subtitle }}</p>
        <h2>Dashboard Daftar Pertanyaan</h2>
        <p>Ringkasan kategori checklist, pertanyaan aktif, dan aktivitas konfigurasi.</p>
      </div>
    </section>

    <section class="metric-grid" aria-label="Ringkasan checklist operasional">
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

    <section class="panel panel--wide">
      <div class="panel__heading">
        <div>
          <p class="eyebrow">{{ vm.view.chartEyebrow }}</p>
          <h3>{{ vm.view.chartTitle }}</h3>
        </div>
        <span class="status-pill">{{ vm.view.chartStatus }}</span>
      </div>
      <div class="line-chart" aria-label="Grafik progres checklist tujuh hari terakhir">
        <div class="line-chart__plot">
          <svg class="line-chart__svg" :viewBox="vm.trendChart.viewBox" preserveAspectRatio="none" role="img"
            aria-label="Grafik garis progres checklist mingguan">
            <path class="line-chart__grid" :d="vm.trendChart.gridPath" />
            <path class="line-chart__area" :d="vm.trendChart.areaPath" />
            <path class="line-chart__line" :d="vm.trendChart.linePath" />
          </svg>
          <span v-for="point in vm.trendChart.points" :key="point.id" class="line-chart__point"
            :style="{ left: point.xPercent, top: point.yPercent }" aria-hidden="true"></span>
        </div>
        <div class="line-chart__labels" :style="{ gridTemplateColumns: vm.trendChart.labelColumns }" aria-hidden="true">
          <span v-for="point in vm.trendChart.points" :key="point.id">{{ point.label }}</span>
        </div>
      </div>
    </section>

    <section class="panel" aria-labelledby="activity-title">
      <div class="panel__heading">
        <div>
          <p class="eyebrow">Aktivitas terbaru</p>
          <h3 id="activity-title">Aktivitas checklist</h3>
        </div>
        <RouterLink to="/reports" class="ghost-button">Lihat semua</RouterLink>
      </div>
      <div class="activity-list">
        <div v-for="activity in vm.view.dashboardActivities" :key="activity.id" class="activity-item">
          <span>{{ activity.title.slice(0, 2).toUpperCase() }}</span>
          <div>
            <strong>{{ activity.title }}</strong>
            <small>{{ activity.description }}</small>
            <small>{{ activity.dateLabel }}</small>
          </div>
          <b :class="activity.valueClass">{{ activity.valueLabel }}</b>
        </div>
      </div>
    </section>
  </main>
</template>
