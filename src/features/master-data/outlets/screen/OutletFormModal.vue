<script setup lang="ts">
import SearchableSelect from '@/core/components/SearchableSelect.vue'
import { useOutletsVm } from '@/features/master-data/outlets/vm/useOutletsVm'

const vm = useOutletsVm()
</script>

<template>
  <div v-if="vm.view.isFormModalOpen" class="feature-form-modal" data-shortcut-modal="true" role="dialog" aria-modal="true" aria-label="Modal form warung">
    <section class="feature-form-modal__dialog">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">{{ vm.view.formSubtitle }}</p>
          <h3>{{ vm.view.editingOutletId ? 'Ubah warung' : vm.view.formTitle }}</h3>
        </div>
        <button type="button" class="ghost-button" @click="vm.closeFormModal">Tutup</button>
      </header>

      <div class="feature-form-modal__body">
        <label
          v-for="field in vm.view.formFields"
          :key="field.id"
          class="feature-form-modal__field"
        >
          {{ field.label }}
          <SearchableSelect
            v-if="field.type === 'select'"
            :placeholder="field.id === 'owner' ? 'Pilih pegawai' : 'Pilih status'"
            :search-placeholder="field.id === 'owner' ? 'Cari pegawai' : 'Cari status'"
            :options="field.options"
            v-model="field.value"
          />
          <input
            v-else
            type="text"
            v-model="field.value"
          />
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
