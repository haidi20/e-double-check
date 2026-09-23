<script setup lang="ts">
import { useOrdersVm } from '@/features/orders/vm/useOrdersVm'

const vm = useOrdersVm()
</script>

<template>
  <article class="invoice-paper">
    <header class="invoice-paper__header">
      <div>
        <h3>{{ vm.view.selectedOrder.supplierName }}</h3>
        <p>Jl. KH. Mas Mansyur No. 15 RT. 03</p>
        <p>Loa Bakung - Sei. Kunjang, Samarinda</p>
        <p>Telp. : 0541-274690 / 2773880</p>
        <p>HP: 0812 5099 986 / 0823 1458 3399</p>
      </div>
      <div class="invoice-paper__customer">
        <span>Kepada Yth.</span>
        <strong>{{ vm.view.selectedOrder.customerName }}</strong>
        <p>{{ vm.view.selectedOrder.customerAddress }}</p>
      </div>
    </header>

    <div class="invoice-paper__meta">
      <span>Tgl. Faktur : {{ vm.view.selectedOrder.invoiceDate }}</span>
      <span>No. : {{ vm.view.selectedOrder.invoiceNumber }}</span>
      <span>Petugas Penjualan : {{ vm.view.selectedOrder.salesman }}</span>
      <span>Jatuh Tempo : {{ vm.view.selectedOrder.dueDate }}</span>
    </div>

    <div class="invoice-paper__table" role="table" aria-label="Tinjauan barang faktur">
      <div class="invoice-paper__row invoice-paper__row--head" role="row">
        <span>No.</span>
        <span>Nama Barang</span>
        <span>Qty</span>
        <span>Unit</span>
        <span>Harga</span>
        <span>Diskon per Unit</span>
        <span>Jumlah</span>
      </div>
      <div v-for="(item, index) in vm.view.selectedOrder.products" :key="item.code" class="invoice-paper__row" role="row">
        <span>{{ index + 1 }}</span>
        <strong>{{ item.name }}</strong>
        <span>{{ item.qty }}</span>
        <span>{{ item.unit }}</span>
        <span>{{ item.price }}</span>
        <span>0</span>
        <span>{{ item.amount }}</span>
      </div>
    </div>

    <footer class="invoice-paper__footer">
      <div class="invoice-paper__words">
        <span>Terbilang :</span>
        <p>{{ vm.view.reviewSummary.amountInWords }}</p>
        <div class="invoice-paper__signatures">
          <span>{{ vm.view.reviewSummary.receiverLabel }}</span>
          <span>{{ vm.view.reviewSummary.senderLabel }}</span>
        </div>
      </div>

      <div class="invoice-paper__totals">
        <div>
          <span>Subtotal</span>
          <strong>{{ vm.view.selectedOrder.subtotal }}</strong>
        </div>
        <div>
          <span>Diskon</span>
          <strong>{{ vm.view.reviewSummary.discount }}</strong>
        </div>
        <div>
          <span>PPN 11%</span>
          <strong>{{ vm.view.selectedOrder.tax }}</strong>
        </div>
        <div class="invoice-paper__grand-total">
          <span>Jumlah</span>
          <strong>{{ vm.view.selectedOrder.totalAmount }}</strong>
        </div>
        <div class="invoice-paper__bank">
          <b>{{ vm.view.reviewSummary.paymentTitle }}</b>
          <span v-for="row in vm.view.reviewSummary.paymentBankRows" :key="row">{{ row }}</span>
        </div>
      </div>
    </footer>
  </article>
</template>

