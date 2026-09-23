<script setup lang="ts">
import VehicleFormModal from '@/features/master-data/vehicles/screen/VehicleFormModal.vue'
import { useVehiclesVm } from '@/features/master-data/vehicles/vm/useVehiclesVm'

const vm = useVehiclesVm()
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

    <!-- <section class="master-grid">
      <article v-for="card in vm.view.masterCards" :key="card.title" class="panel">
        <span class="tile-icon">{{ card.icon }}</span>
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
      </article>
    </section> -->

    <section class="goods-layout goods-layout--single">
      <article class="panel panel--wide">
        <div class="toolbar">
          <label>
            <span>Cari</span>
            <input type="search" :placeholder="vm.view.searchPlaceholder" />
          </label>
          <button type="button" class="ghost-button">Saring</button>
          <button type="button" class="ghost-button">Ekspor CSV</button>
        </div>
        <div class="data-table data-table--vehicles" role="table" aria-label="Data kendaraan">
          <div class="data-table__row data-table__row--head" role="row">
            <span>Plat</span>
            <span>Kendaraan</span>
            <span>Kapasitas</span>
            <!-- <span>Driver</span> -->
            <span>Status dokumen</span>
            <span>Status</span>
          </div>
          <div v-for="row in vm.view.vehicleRows" :key="row.code" class="data-table__row" role="row">
            <!-- <strong>{{ row.code }}</strong> -->
            <span>
              {{ row.plateNumber }}
            </span>
            <span><small>{{ row.vehicleName }} / {{ row.vehicleType }}</small></span>
            <!-- <span>{{ row.capacity }}<small>{{ row.depot }}</small></span> -->
            <span>{{ row.capacity }}</span>
            <!-- <span>{{ row.defaultDriver }}<small>{{ row.documentStatus }}</small></span> -->
            <span>{{ row.documentStatus }}</span>
            <mark>{{ row.availability }}</mark>
          </div>
        </div>
      </article>
    </section>

    <VehicleFormModal />
  </main>
</template>
