<script setup lang="ts">
import SearchableSelect from '@/core/components/SearchableSelect.vue'
import { useOrdersVm } from '@/features/orders/vm/useOrdersVm'

const vm = useOrdersVm()
</script>

<template>
  <div v-if="vm.view.isFormModalOpen" class="feature-form-modal" data-shortcut-modal="true" role="dialog" aria-modal="true" aria-label="Modal tambah order pesanan">
    <section class="feature-form-modal__dialog feature-form-modal__dialog--lg">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">{{ vm.view.formSubtitle }}</p>
          <h3>{{ vm.view.formTitle }}</h3>
        </div>
        <button type="button" class="ghost-button" @click="vm.closeFormModal">Tutup</button>
      </header>

      <div class="feature-form-modal__body">
        <label class="feature-form-modal__field">
          Nomor faktur
          <input :value="vm.view.formManual.invoiceNumber" readonly />
        </label>

        <label class="feature-form-modal__field">
          Pelanggan
          <SearchableSelect
            :model-value="vm.view.formManual.customerCode"
            :options="vm.view.formCustomers.map((customer) => ({ value: customer.code, label: customer.name, detail: customer.address }))"
            @change="vm.updateManualCustomer"
          />
        </label>

        <label class="feature-form-modal__field feature-form-modal__field--wide">
          Alamat
          <textarea rows="2" :value="vm.selectedFormCustomer.address" readonly></textarea>
        </label>

        <div class="manual-order-items feature-form-modal__field--wide" aria-label="Barang order pesanan">
          <div class="manual-order-items__head">
            <div>
              <span>Barang</span>
              <small>Pilih barang, isi qty, satuan otomatis muncul.</small>
            </div>
            <button type="button" class="ghost-button" @click="vm.addManualItem">Tambah Barang</button>
          </div>
          <div v-for="item in vm.view.formManual.items" :key="item.id" class="manual-item-row">
            <label class="feature-form-modal__field">
              Barang
              <SearchableSelect
                :model-value="item.productCode"
                :options="vm.view.formProducts.map((product) => ({ value: product.code, label: product.name, detail: product.unit }))"
                @change="vm.updateManualItem(item.id, 'productCode', $event)"
              />
            </label>
            <label class="feature-form-modal__field">
              Qty
              <input
                type="number"
                min="1"
                :value="item.qty"
                @input="vm.updateManualItem(item.id, 'qty', $event)"
              />
            </label>
            <label class="feature-form-modal__field">
              Satuan
              <input :value="vm.getManualItemUnit(item.productCode)" readonly />
            </label>
            <button
              v-if="vm.view.formManual.items.length > 1"
              type="button"
              class="ghost-button"
              @click="vm.removeManualItem(item.id)"
            >
              Hapus
            </button>
          </div>
        </div>

        <div class="summary-box">
          <span>Pelanggan</span>
          <strong>{{ vm.selectedFormCustomer.name }}</strong>
          <span>Jumlah jenis barang</span>
          <strong>{{ vm.view.formManual.items.length }}</strong>
          <span>Total qty</span>
          <strong>{{ vm.manualFormTotalQty }} item</strong>
        </div>

        <p v-if="vm.view.isFormSubmitted" class="status-message feature-form-modal__field--wide">
          {{ vm.view.formSuccessMessage }}
        </p>
      </div>

      <footer class="feature-form-modal__footer">
        <button type="button" class="ghost-button" @click="vm.closeFormModal">Batal</button>
        <div class="feature-form-modal__actions">
          <button type="button" class="primary-button" @click="vm.saveFormModal">
            {{ vm.view.formSubmitLabel }}
          </button>
        </div>
      </footer>
    </section>
  </div>
</template>
