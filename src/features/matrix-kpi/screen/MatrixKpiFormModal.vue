<script setup lang="ts">
import { useMatrixKpiVm } from '@/features/matrix-kpi/vm/useMatrixKpiVm'

const vm = useMatrixKpiVm()
</script>

<template>
  <div v-if="vm.view.isFormModalOpen" class="feature-form-modal" role="dialog" aria-modal="true" aria-label="Modal pengaturan KPI">
    <section class="feature-form-modal__dialog">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">{{ vm.view.formSubtitle }}</p>
          <h3>{{ vm.view.formTitle }}</h3>
        </div>
        <button type="button" class="ghost-button" @click="vm.closeFormModal">Tutup</button>
      </header>

      <div class="feature-form-modal__body">
        <label class="feature-form-modal__field">
          Jumlah hari
          <input type="number" min="1" :value="vm.view.slaDays" @input="vm.updateSlaDays" />
        </label>
        <label class="feature-form-modal__field">
          Jam per hari
          <input type="number" min="1" :value="vm.view.slaHours" @input="vm.updateSlaHours" />
        </label>
        <div class="summary-box feature-form-modal__field--wide">
          <span>Batas waktu aktif</span>
          <strong>{{ vm.slaLabel }}</strong>
          <p>Faktur pengiriman akan dikelompokkan ke tab sebelum atau sesudah batas waktu ini.</p>
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
