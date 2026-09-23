<script setup lang="ts">
import { useOrdersVm } from '@/features/orders/vm/useOrdersVm'

const vm = useOrdersVm()
</script>

<template>
  <section class="panel">
    <div class="toolbar">
      <label>
        <span>Cari</span>
        <input type="search" :placeholder="vm.view.searchPlaceholder" />
      </label>
      <select aria-label="Status pesanan kerja">
        <option>Semua status</option>
        <option>Siap kirim</option>
        <option>Terverifikasi</option>
        <option>Menunggu cek</option>
        <option>Perlu koreksi</option>
      </select>
      <button type="button" class="ghost-button">Saring</button>
    </div>

    <div class="data-table data-table--order-import" role="table" aria-label="Daftar pesanan kerja dari faktur">
      <div class="data-table__row data-table__row--head" role="row">
        <span>No Pesanan</span>
        <span>Pelanggan</span>
        <span>Barang</span>
        <span>Petugas Penjualan</span>
        <span>Status</span>
        <span>Aksi</span>
      </div>
      <div v-for="row in vm.view.orderRows" :key="row.orderNumber" class="data-table__row" role="row">
        <strong>{{ row.orderNumber }}<small>{{ row.invoiceNumber }}</small></strong>
        <span>{{ row.customerName }}<small>{{ row.printDate }}</small></span>
        <span>{{ row.itemSummary }}<small>{{ row.totalQty }} item / {{ row.totalAmount }}</small></span>
        <span>{{ row.salesman }}</span>
        <mark>{{ row.status }}</mark>
        <span class="table-actions">
          <button type="button" class="ghost-button" @click="vm.openReturnModal(row.invoiceNumber)">Retur</button>
        </span>
      </div>
    </div>
  </section>
</template>

