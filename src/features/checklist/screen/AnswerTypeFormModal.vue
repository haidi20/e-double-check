<script setup lang="ts">
import { useChecklistAnswerTypeVm } from '@/features/checklist/vm/useChecklistAnswerTypeVm'
import { useAnswerTypeFormVm } from '@/features/checklist/vm/useAnswerTypeFormVm'

const vm = useChecklistAnswerTypeVm()
const formVm = useAnswerTypeFormVm()
</script>

<template>
  <div
    v-if="vm.view.modal.isOpen"
    class="feature-form-modal"
    data-shortcut-modal="true"
    role="dialog"
    aria-modal="true"
    aria-label="Form tipe jawaban"
  >
    <section class="feature-form-modal__dialog">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">{{ formVm.isEditMode ? 'Ubah Tipe Jawaban' : 'Tambah Tipe Jawaban' }}</p>
          <h3>{{ formVm.isEditMode ? formVm.editingAnswerType?.label : 'Tipe jawaban baru' }}</h3>
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
            Nama tipe jawaban
            <input v-model="formVm.form.label" type="text" placeholder="Contoh: Kondisi Barang" />
          </label>
          <label class="feature-form-modal__field">
            Opsi (satu baris satu opsi)
            <textarea v-model="formVm.form.optionsText" rows="4" placeholder="Baik&#10;Rusak Ringan&#10;Rusak Berat"></textarea>
          </label>
          <p v-if="formVm.error" class="status-message">{{ formVm.error }}</p>
        </form>
      </div>

      <footer class="feature-form-modal__footer">
        <button type="button" class="ghost-button" @click="formVm.close()">Batal</button>
        <button type="button" class="primary-button" @click="formVm.submit()">
          {{ formVm.isEditMode ? 'Simpan Perubahan' : 'Tambah Tipe Jawaban' }}
        </button>
      </footer>
    </section>
  </div>
</template>
