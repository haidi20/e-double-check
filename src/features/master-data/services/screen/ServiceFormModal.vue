<script setup lang="ts">
import { useServicesVm } from '@/features/master-data/services/vm/useServicesVm'

const vm = useServicesVm()
</script>

<template>
  <div v-if="vm.view.isFormModalOpen" class="feature-form-modal" data-shortcut-modal="true" role="dialog" aria-modal="true" aria-label="Modal form layanan">
    <section class="feature-form-modal__dialog">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">{{ vm.view.formSubtitle }}</p>
          <h3>{{ vm.view.editingServiceId ? 'Ubah layanan' : vm.view.formTitle }}</h3>
        </div>
        <button type="button" class="ghost-button" @click="vm.closeFormModal">Tutup</button>
      </header>

      <div class="feature-form-modal__body">
        <label
          v-for="field in vm.view.formFields"
          :key="field.id"
          class="feature-form-modal__field"
          :class="{ 'feature-form-modal__field--wide': field.type === 'textarea' }"
        >
          {{ field.label }}
          <select v-if="field.type === 'select'" v-model="field.value">
            <option v-for="option in field.options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <textarea v-else-if="field.type === 'textarea'" v-model="field.value" />
          <input v-else type="text" v-model="field.value" />
        </label>
        <p v-if="vm.view.formError" class="status-message feature-form-modal__field--wide">
          {{ vm.view.formError }}
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