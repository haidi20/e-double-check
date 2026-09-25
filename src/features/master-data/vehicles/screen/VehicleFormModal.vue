<script setup lang="ts">
import { useVehiclesVm } from '@/features/master-data/vehicles/vm/useVehiclesVm'

const vm = useVehiclesVm()
</script>

<template>
  <div v-if="vm.view.isFormModalOpen" class="feature-form-modal" data-shortcut-modal="true" role="dialog" aria-modal="true"
    aria-label="Modal form kendaraan">
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
          Nomor polisi
          <input :value="vm.view.formDraft.plateNumber" @input="vm.updateFormDraft('plateNumber', $event)" />
        </label>
        <label class="feature-form-modal__field">
          Tipe kendaraan
          <input :value="vm.view.formDraft.vehicleType" @input="vm.updateFormDraft('vehicleType', $event)" />
        </label>
        <label class="feature-form-modal__field">
          Kapasitas
          <input :value="vm.view.formDraft.capacity" @input="vm.updateFormDraft('capacity', $event)" />
        </label>
        <label class="feature-form-modal__field">
          Driver default
          <input :value="vm.view.formDraft.defaultDriver" @input="vm.updateFormDraft('defaultDriver', $event)" />
        </label>
        <!-- <label class="feature-form-modal__field">
          Depo
          <input :value="vm.view.formDraft.depot" @input="vm.updateFormDraft('depot', $event)" />
        </label> -->
        <label class="feature-form-modal__field feature-form-modal__field--wide">
          Status dokumen
          <textarea rows="3" :value="vm.view.formDraft.documentStatus"
            @input="vm.updateFormDraft('documentStatus', $event)"></textarea>
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
