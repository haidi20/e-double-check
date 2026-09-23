<script setup lang="ts">
import OrderFormModal from '@/features/orders/screen/OrderFormModal.vue'
import OrderImportModal from '@/features/orders/screen/OrderImportModal.vue'
import OrderReturnModal from '@/features/orders/screen/OrderReturnModal.vue'
import OrdersMetricGrid from '@/features/orders/screen/OrdersMetricGrid.vue'
import OrdersPageHeading from '@/features/orders/screen/OrdersPageHeading.vue'
import OrdersTable from '@/features/orders/screen/OrdersTable.vue'
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <OrdersPageHeading />

    <section class="operations-layout operations-layout--single">
      <div class="feature-stack">
        <OrdersMetricGrid />
        <OrdersTable />
      </div>
    </section>

    <OrderFormModal />
    <OrderImportModal />
    <OrderReturnModal />
  </main>
</template>

