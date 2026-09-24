<script setup lang="ts">
import SearchableSelect from '@/core/components/SearchableSelect.vue'
import { useCategoryQuestionsModalVm } from '@/features/checklist/vm/useCategoryQuestionsModalVm'

const vm = useCategoryQuestionsModalVm()
</script>

<template>
  <div v-if="vm.view.isOpen" class="feature-form-modal" role="dialog" aria-modal="true" aria-label="Kelola pertanyaan kategori">
    <section class="feature-form-modal__dialog feature-form-modal__dialog--lg category-questions-modal">
      <header class="feature-form-modal__header category-questions-modal__header">
        <div>
          <p class="eyebrow">{{ vm.isEditing ? 'Ubah Pertanyaan' : 'Tambah Pertanyaan' }}</p>
          <h3>{{ vm.category?.name }}</h3>
        </div>
        <button type="button" class="category-questions-modal__close" aria-label="Tutup modal" @click="vm.close()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div class="feature-form-modal__body category-questions-modal__body">
        <form class="category-questions-modal__form" @submit.prevent="vm.submitQuestion()">
          <div class="category-questions-modal__form-grid">
            <label
              v-for="column in vm.fields"
              :key="column.id"
              class="feature-form-modal__field category-questions-modal__field"
            >
              <span class="category-questions-modal__label">
                {{ column.label }}
                <small
                  v-if="column.mode === 'read-only'"
                  class="category-questions-modal__owner-note"
                >
                  di isi oleh karyawan
                </small>
              </span>
              <SearchableSelect
                v-if="vm.isServiceColumn(column)"
                :model-value="vm.getServiceValue(column.id)"
                :options="vm.serviceOptions"
                :disabled="column.mode === 'read-only'"
                placeholder="Pilih layanan"
                search-placeholder="Cari layanan"
                @update:model-value="vm.setServiceValue(column.id, $event)"
              />
              <textarea
                v-else-if="vm.isQuestionColumn(column)"
                :value="vm.getQuestionValue(column.id)"
                @input="vm.updateQuestionValue(column.id, $event)"
                rows="3"
                :readonly="column.mode === 'read-only'"
              ></textarea>
              <input
                v-else-if="column.type === 'text'"
                v-model="vm.form.values[column.id]"
                type="text"
                :readonly="column.mode === 'read-only'"
              />
              <input
                v-else-if="column.type === 'number'"
                v-model="vm.form.values[column.id]"
                type="number"
                :readonly="column.mode === 'read-only'"
              />
              <input
                v-else-if="column.type === 'time'"
                v-model="vm.form.values[column.id]"
                type="time"
                :readonly="column.mode === 'read-only'"
              />
              <label
                v-else
                class="category-questions-modal__boolean"
                :class="{ 'is-disabled': column.mode === 'read-only' }"
              >
                <input
                  v-model="vm.form.values[column.id]"
                  type="checkbox"
                  :disabled="column.mode === 'read-only'"
                />
                <span>Ya</span>
              </label>
            </label>
          </div>

          <p v-if="vm.error" class="status-message">{{ vm.error }}</p>
        </form>
      </div>

      <footer class="feature-form-modal__footer">
        <button type="button" class="ghost-button" @click="vm.close()">Batal</button>
        <button
          type="button"
          class="primary-button"
          @click="vm.submitQuestion()"
        >
          {{ vm.isEditing ? 'Simpan Perubahan' : 'Simpan Pertanyaan' }}
        </button>
      </footer>
    </section>
  </div>
</template>

<style scoped src="./CategoryQuestionsModal.css"></style>
