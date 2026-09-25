<script setup lang="ts">
import SearchableSelect from '@/core/components/SearchableSelect.vue'
import { useDeliveryOrdersVm } from '@/features/distribution/delivery-orders/vm/useDeliveryOrdersVm'

const vm = useDeliveryOrdersVm()
</script>

<template>
  <div v-if="vm.view.isFormModalOpen" class="feature-form-modal" data-shortcut-modal="true" role="dialog" aria-modal="true"
    aria-label="Modal form surat jalan">
    <section class="feature-form-modal__dialog feature-form-modal__dialog--lg">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">{{ vm.view.formSubtitle }}</p>
          <h3>{{ vm.view.formTitle }}</h3>
        </div>
        <button type="button" class="ghost-button" @click="vm.closeFormModal">Tutup</button>
      </header>

      <div class="feature-form-modal__body">
        <label class="feature-form-modal__field feature-form-modal__field--wide searchable-select">
          Pilih kendaraan
          <input
            :value="vm.view.vehicleSearch || vm.selectedVehicle.label"
            placeholder="Cari nomor polisi, tipe kendaraan, atau driver"
            @input="vm.updateVehicleSearch"
          />
          <div class="searchable-select__list" role="listbox" aria-label="Pilihan kendaraan">
            <button
              v-for="vehicle in vm.filteredVehicleOptions"
              :key="vehicle.id"
              type="button"
              :class="{ 'is-selected': vm.view.selectedVehicleId === vehicle.id }"
              @click="vm.selectVehicle(vehicle.id)"
            >
              <strong>{{ vehicle.label }}</strong>
              <small>{{ vehicle.detail }}</small>
            </button>
          </div>
        </label>

        <label v-for="field in vm.view.formFields" :key="field.id" class="feature-form-modal__field"
          :class="{ 'feature-form-modal__field--wide': field.wide }">
          {{ field.label }}
          <textarea v-if="field.type === 'textarea'" :rows="field.rows" :value="field.value" :readonly="field.readonly"
            @input="vm.updateFormField(field.id, $event)"></textarea>
          <SearchableSelect
            v-else-if="field.type === 'select'"
            :model-value="field.value"
            :options="field.options"
            :disabled="field.readonly"
            @change="vm.updateFormField(field.id, $event)"
          />
          <input v-else :value="field.value" :readonly="field.readonly" @input="vm.updateFormField(field.id, $event)" />
        </label>
        <p v-if="vm.view.isFormSubmitted" class="status-message feature-form-modal__field--wide">
          {{ vm.view.formSuccessMessage }}
        </p>
      </div>

      <section class="delivery-order-invoices" aria-label="Daftar faktur dalam surat jalan">
        <div class="panel__heading">
          <div>
            <p class="eyebrow">Faktur - faktur</p>
            <!-- <h3>Satu faktur untuk satu customer</h3> -->
          </div>
        </div>
        <div class="data-table data-table--delivery-invoices" role="table" aria-label="Daftar faktur">
          <div class="data-table__row data-table__row--head" role="row">
            <span>No. Faktur</span>
            <span>Customer</span>
            <span>Ringkasan barang</span>
            <span>Jumlah Item</span>
          </div>
          <div v-for="invoice in vm.view.invoiceRows" :key="invoice.invoiceNo" class="data-table__row" role="row">
            <strong>{{ invoice.invoiceNo }}</strong>
            <span>{{ invoice.customer }}</span>
            <span>{{ invoice.itemSummary }}</span>
            <mark>{{ invoice.itemCount }}</mark>
          </div>
        </div>
      </section>

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
