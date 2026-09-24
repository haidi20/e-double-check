<script setup lang="ts">
import { useChecklistQuestionsByCategoryVm } from '@/features/checklist/vm/useChecklistQuestionsByCategoryVm'
import { useCategoryQuestionsModalVm } from '@/features/checklist/vm/useCategoryQuestionsModalVm'
import CategoryQuestionsModal from '@/features/checklist/screen/CategoryQuestionsModal.vue'

const vm = useChecklistQuestionsByCategoryVm()
const modalVm = useCategoryQuestionsModalVm()
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Daftar Pertanyaan</p>
        <h2>{{ vm.pageHeading.title }}</h2>
        <p>{{ vm.pageHeading.description }}</p>
      </div>

      <div class="checklist-question-page__heading-actions">
        <button type="button" class="ghost-button" @click="vm.goBack()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 19 8 12l7-7" />
          </svg>
          Kembali
        </button>
        <button type="button" class="primary-button" @click="modalVm.open()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Tambah
        </button>
      </div>
    </section>

    <section class="panel checklist-question-page__panel">
      <div class="panel__heading">
        <div>
          <p class="eyebrow">Kolom Kategori</p>
          <ul class="checklist-column-pills">
            <li v-for="column in vm.columns" :key="column.id">
              {{ column.label }}
            </li>
          </ul>
        </div>
        <span class="status-pill">{{ vm.questions.length }} pertanyaan</span>
      </div>

      <div v-if="vm.questions.length" class="checklist-question-list">
        <article v-for="row in vm.questions" :key="row.id" class="checklist-question-item">
          <span class="checklist-question-item__service">{{ row.serviceAbbreviation }}</span>
          <div class="checklist-question-item__content">
            <strong>{{ row.name }}</strong>
          </div>
          <div class="checklist-question-item__meta">
            <b>{{ row.service }}</b>
            <mark v-if="row.badge">{{ row.badge }}</mark>
            <span class="checklist-question-item__actions">
              <button type="button" class="checklist-question-action" aria-label="Ubah pertanyaan" @click="modalVm.open(row.id)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                </svg>
              </button>
              <button type="button" class="checklist-question-action checklist-question-action--remove" aria-label="Hapus pertanyaan" @click="modalVm.removeQuestion(row.id)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6" />
                </svg>
              </button>
            </span>
          </div>
        </article>
      </div>

      <div v-else class="checklist-question-empty">
        <strong>Belum ada pertanyaan</strong>
        <p>Tambahkan pertanyaan pertama untuk kategori ini.</p>
      </div>
    </section>

    <CategoryQuestionsModal />
  </main>
</template>

<style scoped>
.checklist-question-page__heading-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checklist-question-page__heading-actions .ghost-button,
.checklist-question-page__heading-actions .primary-button {
  min-height: 30px;
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 11.5px;
  gap: 6px;
}

.checklist-question-page__heading-actions svg {
  width: 13px;
  height: 13px;
}

.checklist-question-page__panel {
  padding: 16px;
}

.panel__heading {
  align-items: flex-start;
  margin-bottom: 12px;
}

.checklist-column-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
}

.checklist-column-pills li {
  padding: 4px 9px;
  border: 1px solid rgba(13, 148, 136, 0.16);
  border-radius: 999px;
  background: rgba(13, 148, 136, 0.07);
  color: #0f766e;
  font-size: 11px;
  font-weight: 650;
}

.checklist-question-list {
  display: grid;
  gap: 8px;
}

.checklist-question-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  min-height: 64px;
  padding: 10px 12px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  background: #fff;
}

.checklist-question-item__service {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: rgba(13, 148, 136, 0.1);
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.checklist-question-item__content {
  min-width: 0;
}

.checklist-question-item__content strong {
  display: block;
  font-size: 13px;
  line-height: 1.4;
}

.checklist-question-item__meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;
  white-space: nowrap;
}

.checklist-question-item__meta b {
  padding: 4px 8px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #475569;
  font-size: 11px;
}

.checklist-question-item__meta mark {
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.14);
  color: #92400e;
  font-size: 11px;
}

.checklist-question-item__actions {
  display: flex;
  gap: 4px;
}

.checklist-question-action {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  display: flex;
  height: 28px;
  justify-content: center;
  transition: background 0.15s ease, color 0.15s ease;
  width: 28px;
}

.checklist-question-action:hover {
  background: rgba(13, 148, 136, 0.1);
  color: #0f766e;
}

.checklist-question-action--remove:hover {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
}

.checklist-question-action svg {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  height: 14px;
  stroke-width: 2;
  width: 14px;
}

.checklist-question-empty {
  padding: 22px;
  border: 1px dashed rgba(148, 163, 184, 0.42);
  border-radius: 14px;
  text-align: center;
}

.checklist-question-empty strong {
  font-size: 14px;
}

.checklist-question-empty p {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 12px;
}

@media (max-width: 640px) {
  .checklist-question-page__heading-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .checklist-question-item {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .checklist-question-item__meta {
    grid-column: 1 / -1;
    justify-content: flex-start;
  }
}
</style>
