<script setup lang="ts">
import { useOrdersVm } from '@/features/orders/vm/useOrdersVm'

const vm = useOrdersVm()
</script>

<template>
  <div v-if="vm.view.isReturnModalOpen" class="feature-form-modal" data-shortcut-modal="true" role="dialog" aria-modal="true" aria-label="Modal retur barang">
    <section class="feature-form-modal__dialog">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">{{ vm.view.returnSubtitle }}</p>
          <h3>{{ vm.view.returnTitle }}</h3>
        </div>
        <button type="button" class="ghost-button" @click="vm.closeReturnModal">Tutup</button>
      </header>

      <div class="feature-form-modal__body">
        <label class="feature-form-modal__field">
          Nomor faktur
          <input :value="vm.view.returnForm.invoiceNumber" readonly />
        </label>

        <label class="feature-form-modal__field">
          Customer
          <input :value="vm.selectedReturnOrder.customerName" readonly />
        </label>

        <label class="feature-form-modal__field feature-form-modal__field--wide">
          Catatan
          <textarea
            rows="3"
            placeholder="Contoh: barang rusak, jumlah kurang, atau salah kirim"
            :value="vm.view.returnForm.note"
            @input="vm.updateReturnNote"
          ></textarea>
        </label>

        <div class="return-items-table feature-form-modal__field--wide" aria-label="Barang dalam faktur yang bisa diretur">
          <div class="return-items-table__head">
            <label class="return-check">
              <input
                type="checkbox"
                :checked="vm.allReturnItemsChecked"
                @change="vm.toggleAllReturnItems"
              />
              <span>Centang semua</span>
            </label>
            <span>Barang</span>
            <span>Satuan</span>
            <span>Qty Faktur</span>
            <span>Qty Kembali</span>
          </div>

          <div v-for="item in vm.view.returnForm.items" :key="item.id" class="return-items-table__row">
            <label class="return-check">
              <input
                type="checkbox"
                :checked="item.checked"
                @change="vm.toggleReturnItem(item.id, $event)"
              />
              <span>{{ item.code }}</span>
            </label>
            <strong>{{ item.name }}</strong>
            <span>{{ item.unit }}</span>
            <span>{{ item.invoiceQty }}</span>
            <input
              type="number"
              min="1"
              :max="item.invoiceQty"
              :disabled="!item.checked"
              :value="item.returnQty"
              @input="vm.updateReturnItemQty(item.id, $event)"
            />
          </div>
        </div>

        <div class="summary-box">
          <span>No pesanan</span>
          <strong>{{ vm.selectedReturnOrder.orderNumber }}</strong>
          <span>Barang dipilih</span>
          <strong>{{ vm.selectedReturnItems.length }}</strong>
          <span>Total qty kembali</span>
          <strong>{{ vm.returnSelectedQty }} item</strong>
        </div>

        <p v-if="vm.view.isReturnSubmitted" class="status-message feature-form-modal__field--wide">
          {{ vm.view.returnSuccessMessage }}
        </p>
      </div>

      <footer class="feature-form-modal__footer">
        <button type="button" class="ghost-button" @click="vm.closeReturnModal">Batal</button>
        <div class="feature-form-modal__actions">
          <button type="button" class="primary-button" @click="vm.saveReturnModal">
            {{ vm.view.returnSubmitLabel }}
          </button>
        </div>
      </footer>
    </section>
  </div>
</template>
