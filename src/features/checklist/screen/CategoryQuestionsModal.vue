<script setup lang="ts">
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
              class="feature-form-modal__field"
            >
              {{ column.label }}
              <input
                v-if="column.type === 'text'"
                v-model="vm.form.values[column.id]"
                type="text"
                :disabled="column.mode === 'read-only'"
              />
              <input
                v-else-if="column.type === 'number'"
                v-model="vm.form.values[column.id]"
                type="number"
                :disabled="column.mode === 'read-only'"
              />
              <input
                v-else-if="column.type === 'time'"
                v-model="vm.form.values[column.id]"
                type="time"
                :disabled="column.mode === 'read-only'"
              />
              <input
                v-else
                v-model="vm.form.values[column.id]"
                type="checkbox"
                :disabled="column.mode === 'read-only'"
              />
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

<style scoped>
.category-questions-modal {
  width: min(720px, 100%);
}

.category-questions-modal__header {
  padding-bottom: 16px;
}

.category-questions-modal__header h3 {
  font-size: 1.15rem;
  margin: 2px 0 0;
}

.category-questions-modal__close {
  align-items: center;
  background: var(--sbm-tertiary);
  border: 0;
  border-radius: 10px;
  color: var(--sbm-neutral);
  cursor: pointer;
  display: flex;
  height: 32px;
  justify-content: center;
  transition: background 0.15s ease, color 0.15s ease;
  width: 32px;
}

.category-questions-modal__close:hover {
  background: var(--sbm-primary-soft);
  color: var(--sbm-primary);
}

.category-questions-modal__close svg {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  height: 15px;
  stroke-width: 2;
  width: 15px;
}

.category-questions-modal__body {
  display: block;
  max-height: min(60vh, 560px);
  overflow-y: auto;
}

.category-questions-modal__form-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 767.98px) {
  .category-questions-modal__body {
    max-height: calc(100vh - 250px);
  }

  .category-questions-modal__form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
