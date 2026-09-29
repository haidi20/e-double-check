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

      <div class="category-question-heading__actions">
        <button type="button" class="ghost-button" @click="vm.goBack()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" aria-hidden="true">
            <path d="M15 19 8 12l7-7" />
          </svg>
          Kembali
        </button>
        <button v-if="vm.isMasterEditor" type="button" class="primary-button" @click="modalVm.open()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Tambah
        </button>
      </div>
    </section>

    <section class="panel category-question-panel">
      <div class="category-question-panel__heading">
        <div>
          <p class="eyebrow">Kolom</p>
          <ul class="category-question-columns">
            <li v-for="column in vm.columns" :key="column.id">{{ column.label }}</li>
          </ul>
        </div>
        <span class="status-pill">{{ vm.questions.length }} pertanyaan</span>
      </div>

      <div v-if="vm.questions.length" class="category-question-grid">
        <article v-for="row in vm.questions" :key="row.id" class="category-question-card">
          <span class="category-question-card__index">{{ String(row.number).padStart(2, '0') }}</span>

          <div class="category-question-card__body">
            <strong>{{ row.name }}</strong>
            <div class="category-question-card__tags">
              <b>{{ row.service }}</b>
              <mark v-if="row.badge">{{ row.badge }}</mark>
            </div>
          </div>

          <div class="category-question-card__actions">
            <template v-if="vm.isMasterEditor">
              <button type="button" class="category-question-card__action" aria-label="Naikkan pertanyaan"
                @click="vm.moveQuestion(row.id, 'up')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round" aria-hidden="true">
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <button type="button" class="category-question-card__action" aria-label="Turunkan pertanyaan"
                @click="vm.moveQuestion(row.id, 'down')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </template>
            <button v-if="vm.isMasterEditor" type="button" class="category-question-card__action" aria-label="Ubah pertanyaan"
              @click="modalVm.open(row.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" aria-hidden="true">
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
              </svg>
            </button>
            <button v-if="vm.isMasterEditor" type="button"
              class="category-question-card__action category-question-card__action--remove"
              aria-label="Arsipkan pertanyaan" @click="vm.archiveQuestion(row.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" aria-hidden="true">
                <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
              </svg>
            </button>
            <button v-if="vm.isMasterEditor" type="button" class="category-question-card__action category-question-card__action--remove"
              aria-label="Hapus pertanyaan" @click="modalVm.removeQuestion(row.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" aria-hidden="true">
                <path
                  d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
        </article>
      </div>

      <div v-else class="category-question-empty">
        <strong>Belum ada pertanyaan</strong>
        <p>Tambahkan pertanyaan pertama untuk kategori ini.</p>
      </div>

      <div v-if="vm.archivedQuestions.length" class="category-question-archived">
        <p class="eyebrow">Arsip</p>
        <ul>
          <li v-for="row in vm.archivedQuestions" :key="row.id">
            <span>{{ row.number }}. {{ row.name }}</span>
            <span v-if="vm.isMasterEditor" class="category-question-archived__actions">
              <button type="button" class="ghost-button" @click="vm.restoreQuestion(row.id)">Pulihkan</button>
              <button type="button" class="ghost-button" @click="vm.removeQuestion(row.id)">Hapus</button>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <CategoryQuestionsModal />
  </main>
</template>

<style scoped src=./ChecklistQuestionsByCategoryScreen.css></style>
