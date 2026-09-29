<script setup lang="ts">
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import { useCategoryFormVm } from '@/features/checklist/vm/useCategoryFormVm'

const vm = useChecklistQuestionsVm()
const formVm = useCategoryFormVm()
</script>

<template>
  <div
    v-if="vm.view.categoryModal.isCategoryModalOpen"
    class="feature-form-modal"
    data-shortcut-modal="true"
    role="dialog"
    aria-modal="true"
    aria-label="Form kategori checklist"
  >
    <section class="feature-form-modal__dialog">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">{{ formVm.isEditMode ? 'Ubah Kategori' : 'Tambah Kategori' }}</p>
          <h3>{{ formVm.isEditMode ? formVm.editingCategory?.name : 'Kategori baru' }}</h3>
        </div>
        <button type="button" class="ghost-button" aria-label="Tutup modal" @click="formVm.close()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div class="feature-form-modal__body">
        <form class="feature-form-modal__form" @submit.prevent="formVm.submit()">
          <label class="feature-form-modal__field">
            Nama kategori
            <input v-model="formVm.form.name" type="text" placeholder="Contoh: Persiapan Shift" />
          </label>
          <label class="feature-form-modal__field">
            Deskripsi
            <textarea v-model="formVm.form.description" rows="3" placeholder="Jelaskan tujuan kategori ini"></textarea>
          </label>
          <p v-if="formVm.error" class="status-message">{{ formVm.error }}</p>
        </form>
      </div>

      <footer class="feature-form-modal__footer">
        <button type="button" class="ghost-button" @click="formVm.close()">Batal</button>
        <button type="button" class="primary-button" @click="formVm.submit()">
          {{ formVm.isEditMode ? 'Simpan Perubahan' : 'Tambah Kategori' }}
        </button>
      </footer>
    </section>
  </div>
</template>
