<script setup lang="ts">
import SearchableSelect from '@/core/components/SearchableSelect.vue'
import { useProductsVm } from '@/features/master-data/products/vm/useProductsVm'

const vm = useProductsVm()
</script>

<template>
  <div v-if="vm.view.isFormModalOpen" class="feature-form-modal" role="dialog" aria-modal="true" aria-label="Modal form barang">
    <section class="feature-form-modal__dialog feature-form-modal__dialog--lg">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">{{ vm.view.formSubtitle }}</p>
          <h3>{{ vm.view.formTitle }}</h3>
        </div>
        <button type="button" class="ghost-button" @click="vm.closeFormModal">Tutup</button>
      </header>

      <div class="feature-form-modal__body">
        <label
          v-for="field in vm.view.formFields"
          :key="field.id"
          class="feature-form-modal__field"
          :class="{ 'feature-form-modal__field--wide': field.wide }"
        >
          {{ field.label }}
          <textarea
            v-if="field.type === 'textarea'"
            :rows="field.rows"
            :value="field.value"
            :readonly="field.readonly"
            @input="vm.updateFormField(field.id, $event)"
          ></textarea>
          <SearchableSelect
            v-else-if="field.type === 'select'"
            :model-value="field.value"
            :options="field.options"
            :disabled="field.readonly"
            @change="vm.updateFormField(field.id, $event)"
          />
          <input
            v-else
            :value="field.value"
            :readonly="field.readonly"
            @input="vm.updateFormField(field.id, $event)"
          />
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
