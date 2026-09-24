<script setup lang="ts">
import { useHistoryVm } from '@/features/history/vm/useHistoryVm'

const vm = useHistoryVm()
</script>

<template>
  <main class="history-page">
    <div class="history-content">
      <header class="history-header">
        <p class="history-header__eyebrow">{{ vm.view.eyebrow }}</p>
        <h1>{{ vm.view.title }}</h1>
        <p class="history-header__description">{{ vm.view.description }}</p>
      </header>

      <section class="history-summary" aria-label="Ringkasan riwayat">
        <div>
          <strong>{{ vm.summary.total }}</strong>
          <span>Shift</span>
        </div>
        <div>
          <strong>{{ vm.summary.completed }}</strong>
          <span>Selesai</span>
        </div>
        <div>
          <strong>{{ vm.summary.running }}</strong>
          <span>Berjalan</span>
        </div>
      </section>

      <div class="history-filters" role="tablist" aria-label="Filter riwayat">
        <button
          v-for="filter in vm.view.filters"
          :key="filter.id"
          type="button"
          role="tab"
          :aria-selected="vm.view.activeFilter === filter.id"
          :class="{ 'is-active': vm.view.activeFilter === filter.id }"
          @click="vm.setFilter(filter.id)"
        >
          {{ filter.label }}
        </button>
      </div>

      <section v-if="vm.hasItems" class="history-list" aria-label="Daftar riwayat">
        <article v-for="item in vm.filteredItems" :key="item.id" class="history-item">
          <div class="history-item__head">
            <div>
              <strong>{{ item.shiftLabel }}</strong>
              <span>{{ item.dateLabel }}</span>
            </div>
            <span class="history-item__status" :class="`is-${item.status}`">
              {{ item.statusLabel }}
            </span>
          </div>
          <p>{{ item.outletName }}</p>
          <div class="history-item__progress">
            <i :style="{ width: vm.progressWidth(item) }"></i>
          </div>
          <span class="history-item__count">{{ vm.progressLabel(item) }}</span>
        </article>
      </section>

      <section v-else class="history-empty">
        <strong>{{ vm.view.emptyTitle }}</strong>
        <p>{{ vm.view.emptyDescription }}</p>
      </section>
    </div>
  </main>
</template>

<style scoped src="./HistoryScreen.css"></style>
