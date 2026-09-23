<script setup lang="ts">
import { useOrdersVm } from '@/features/orders/vm/useOrdersVm'

const vm = useOrdersVm()
</script>

<template>
  <section class="metric-grid metric-grid--three" aria-label="Ringkasan pesanan kerja">
    <article v-for="metric in vm.view.orderMetrics" :key="metric.label" class="metric-card">
      <div class="metric-card__top">
        <span>{{ metric.icon }}</span>
        <small>{{ metric.trend }}</small>
      </div>
      <strong>{{ metric.value }}</strong>
      <p>{{ metric.label }}</p>
      <div class="progress-track"><i :style="{ width: metric.progressWidth }"></i></div>
    </article>
  </section>
</template>

