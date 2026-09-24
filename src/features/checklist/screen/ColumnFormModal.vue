<script setup lang="ts">
import { useColumnManagerModalVm } from '@/features/checklist/vm/useColumnManagerModalVm'

const modalVm = useColumnManagerModalVm()
</script>

<template>
  <div v-if="modalVm.view.isOpen" class="feature-form-modal" role="dialog" aria-modal="true" aria-label="Modal kelola kolom">
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
              Mode
              <select v-model="modalVm.formVm.form.mode">
                <option value="input">Input</option>
                <option value="read-only">Read-only</option>
              </select>
            </label>
          </div>
          <label class="checklist-column-form__check">
            <input v-model="modalVm.formVm.form.required" type="checkbox" />
            Wajib diisi
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

<style scoped>
.column-manager-modal {
  width: min(1040px, 100%);
}

.column-manager__header {
  padding-bottom: 14px;
}

.column-manager__header h3 {
  font-size: 1.05rem;
  line-height: 1.25;
  margin: 2px 0 0;
}

.column-manager__close {
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

.column-manager__close:hover {
  background: var(--sbm-primary-soft);
  color: var(--sbm-primary);
}

.column-manager__close svg {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  height: 15px;
  stroke-width: 2;
  width: 15px;
}

.column-manager {
  display: grid;
  gap: 16px;
  grid-column: 1 / -1;
  grid-template-columns: minmax(0, 1fr);
}

.column-manager__tabs {
  background: var(--sbm-tertiary);
  border-radius: 12px;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 4px;
}

.column-manager__tabs button {
  background: transparent;
  border: 0;
  border-radius: 9px;
  color: var(--sbm-neutral);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 800;
  min-height: 34px;
  padding: 0 10px;
  transition: background 0.15s ease, color 0.15s ease;
}

.column-manager__tabs button.is-active {
  background: #fff;
  color: var(--sbm-primary);
  box-shadow: 0 2px 8px rgb(0 70 139 / 8%);
}

.column-manager__panel,
.column-manager__form {
  background: #fff;
  border: 1px solid var(--sbm-border-soft);
  border-radius: 14px;
  padding: 14px;
}

.column-manager__panel-head {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 12px;
}

.column-manager__panel-head p {
  color: var(--sbm-ink);
  font-size: 0.86rem;
  font-weight: 850;
  margin: 0;
}

.column-manager__panel-head span {
  background: var(--sbm-primary-soft);
  border-radius: 999px;
  color: var(--sbm-primary);
  font-size: 0.7rem;
  font-weight: 850;
  padding: 3px 8px;
}

.column-manager__submit-wrap {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.column-manager__cancel {
  background: #facc15;
  border: 1px solid #eab308;
  border-radius: 10px;
  color: #713f12;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 800;
  min-height: 32px;
  padding: 6px 12px;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.column-manager__cancel:hover {
  background: #fde047;
  border-color: #ca8a04;
  color: #653c09;
}

.checklist-column-form {
  border: 0;
  padding-top: 0;
}

.checklist-column-form__submit {
  min-height: 32px;
  padding: 6px 12px;
  width: auto;
}

@media (max-width: 767.98px) {
  .column-manager {
    grid-template-columns: 1fr;
  }

  .column-manager__submit-wrap {
    justify-content: stretch;
  }

  .checklist-column-form__submit {
    width: 100%;
  }
}
</style>
