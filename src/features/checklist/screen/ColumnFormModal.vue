<script setup lang="ts">
import { useColumnManagerModalVm } from '@/features/checklist/vm/useColumnManagerModalVm'

const modalVm = useColumnManagerModalVm()
</script>

<template>
  <div v-if="modalVm.view.isOpen" class="feature-form-modal" data-shortcut-modal="true" role="dialog" aria-modal="true" aria-label="Modal kelola kolom">
    <section class="feature-form-modal__dialog feature-form-modal__dialog--lg column-manager-modal">
      <header class="feature-form-modal__header column-manager__header">
        <div>
          <p class="eyebrow">{{ modalVm.formVm.isEditMode ? 'Ubah Kolom' : 'Kelola Kolom' }}</p>
          <h3>{{ modalVm.category?.name }}</h3>
        </div>
        <button type="button" class="column-manager__close" aria-label="Tutup modal" @click="modalVm.close()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <nav class="column-manager__tabs" aria-label="Menu kelola kolom">
        <button
          type="button"
          :class="{ 'is-active': modalVm.view.activeTab === 'columns' }"
          @click="modalVm.setTab('columns')"
        >
          Daftar Kolom
        </button>
        <button
          type="button"
          :class="{ 'is-active': modalVm.view.activeTab === 'form' }"
          @click="modalVm.setTab('form')"
        >
          Form Kolom
        </button>
      </nav>

      <div class="feature-form-modal__body column-manager">
        <aside v-if="modalVm.view.activeTab === 'columns'" class="column-manager__panel">
          <div class="column-manager__panel-head">
            <p>Kolom Aktif</p>
            <span>{{ modalVm.columns.length }}</span>
          </div>

          <ul v-if="modalVm.columns.length" class="checklist-column-list">
            <li
              v-for="column in modalVm.columns"
              :key="column.id"
              class="checklist-column-list__item"
              :class="{ 'is-active': column.id === modalVm.formVm.editingColumn?.id }"
            >
              <div>
                <strong>{{ column.label }}</strong>
                <small>{{ modalVm.formVm.formatColumnType(column) }}</small>
              </div>
              <span class="checklist-column-list__actions">
                <button
                  type="button"
                  class="checklist-column-list__edit"
                  aria-label="Ubah kolom"
                  @click.stop="modalVm.openEdit(modalVm.category!.id, column.id)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  class="checklist-column-list__remove"
                  aria-label="Hapus kolom"
                  @click.stop="modalVm.formVm.remove(column.id)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6" />
                  </svg>
                </button>
              </span>
            </li>
          </ul>

          <p v-else class="checklist-column-list__empty">Belum ada kolom pada kategori ini.</p>
        </aside>

        <form v-else class="checklist-column-form column-manager__form" @submit.prevent="modalVm.submit()">
          <div class="column-manager__panel-head">
            <p>{{ modalVm.formVm.isEditMode ? 'Ubah Detail' : 'Kolom Baru' }}</p>
            <span>{{ modalVm.formVm.isEditMode ? 'Edit' : 'Tambah' }}</span>
          </div>
          <label class="feature-form-modal__field">
            {{ modalVm.formVm.isEditMode ? 'Ubah nama kolom' : 'Tambah kolom baru' }}
            <input v-model="modalVm.formVm.form.label" type="text" placeholder="Contoh: Jam cek" />
          </label>
          <div class="checklist-column-form__row">
            <label class="feature-form-modal__field">
              Tipe data
              <select v-model="modalVm.formVm.form.type">
                <option value="text">Teks</option>
                <option value="number">Angka</option>
                <option value="boolean">Ya / Tidak</option>
                <option value="time">Waktu</option>
              </select>
            </label>
            <label class="feature-form-modal__field">
              Nilai ditentukan oleh
              <select v-model="modalVm.formVm.form.mode">
                <option value="input">Admin</option>
                <option value="read-only">Karyawan</option>
              </select>
            </label>
          </div>
          <label class="feature-form-modal__field">
            Lebar grid
            <select v-model.number="modalVm.formVm.form.gridSpan">
              <option :value="12">Full Grid</option>
              <option :value="6">Setengah (6 Grid)</option>
            </select>
          </label>
          <label class="checklist-column-form__check">
            <input v-model="modalVm.formVm.form.required" type="checkbox" />
            Wajib diisi
          </label>
          <label class="checklist-column-form__check">
            <input v-model="modalVm.formVm.form.boldValue" type="checkbox" />
            Bold value
          </label>
          <p v-if="modalVm.error" class="status-message">
            {{ modalVm.error }}
          </p>
          <div class="column-manager__submit-wrap">
            <button type="button" class="column-manager__cancel" @click="modalVm.close()">Batal</button>
            <button type="submit" class="primary-button checklist-column-form__submit">
            {{ modalVm.formVm.isEditMode ? 'Simpan Perubahan' : 'Tambah Kolom' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped src=./ColumnFormModal.css></style>
