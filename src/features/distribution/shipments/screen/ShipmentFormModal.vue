<script setup lang="ts">
import SearchableSelect from '@/core/components/SearchableSelect.vue'
import { useShipmentsVm } from '@/features/distribution/shipments/vm/useShipmentsVm'

const vm = useShipmentsVm()
</script>

<template>
  <div v-if="vm.view.isFormModalOpen" class="feature-form-modal" data-shortcut-modal="true" role="dialog" aria-modal="true" aria-label="Modal form pengiriman">
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
          Nomor pengiriman
          <input :value="vm.view.selectedShipment.code" readonly />
        </label>
        <label class="feature-form-modal__field">
          Status
          <input :value="vm.view.selectedShipment.status" readonly />
        </label>

        <div class="invoice-list feature-form-modal__field--wide" aria-label="Faktur yang dipilih">
          <article
            v-for="invoice in vm.view.invoiceOptions"
            :key="invoice.invoiceNumber"
            class="invoice-list__item"
            :class="{ 'data-table__row--selected': invoice.selected }"
            role="button"
            tabindex="0"
            @click="vm.toggleInvoiceSelection(invoice.invoiceNumber)"
            @keydown.enter="vm.toggleInvoiceSelection(invoice.invoiceNumber)"
          >
            <span>{{ invoice.invoiceNumber }}</span>
            <strong>{{ invoice.customerName }}</strong>
            <small>{{ invoice.itemSummary }} / {{ invoice.totalQty }}</small>
          </article>
        </div>

        <label class="feature-form-modal__field">
          Driver
          <SearchableSelect
            :model-value="vm.view.selectedShipment.driverLabel"
            :options="vm.view.driverOptions.map((driver) => ({ value: driver.label, label: driver.label }))"
            @change="vm.updateShipmentField('driverLabel', $event)"
          />
        </label>
        <label class="feature-form-modal__field">
          Kendaraan
          <SearchableSelect
            :model-value="vm.view.selectedShipment.vehicleLabel"
            :options="vm.view.vehicleOptions.map((vehicle) => ({ value: vehicle.label, label: vehicle.label }))"
            @change="vm.updateShipmentField('vehicleLabel', $event)"
          />
        </label>
        <label class="feature-form-modal__field feature-form-modal__field--wide">
          Catatan
          <textarea rows="4" :value="vm.view.selectedShipment.note" @input="vm.updateShipmentField('note', $event)"></textarea>
        </label>
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
