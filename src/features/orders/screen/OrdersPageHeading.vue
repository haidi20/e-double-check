<script setup lang="ts">
import { useOrdersVm } from '@/features/orders/vm/useOrdersVm'

const vm = useOrdersVm()
</script>

<template>
  <section class="page-heading">
    <div>
      <p class="eyebrow">{{ vm.view.subtitle }}</p>
      <h2>{{ vm.view.headingTitle }}</h2>
      <p>{{ vm.view.description }}</p>
    </div>
    <div class="button-row">
      <button type="button" class="ghost-button" @click="vm.openFormModal">Tambah Order Pesanan</button>
      <button type="button" class="primary-button" @click="vm.openImportModal">
        {{ vm.view.primaryActionLabel }}
      </button>
    </div>
  </section>
</template>
