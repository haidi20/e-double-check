<script setup lang="ts">
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import ColumnFormModal from '@/features/checklist/screen/ColumnFormModal.vue'
import { useColumnManagerModalVm } from '@/features/checklist/vm/useColumnManagerModalVm'

const vm = useChecklistQuestionsVm()
const columnManagerModalVm = useColumnManagerModalVm()
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="checklist-grid">
      <article
        v-for="category in vm.categoryCards"
        :key="category.id"
        class="checklist-category-card"
        :class="{ 'is-hidden': !category.isVisible }"
        @click="vm.openCategory(category.id)"
      >
        <header class="checklist-category-card__header">
          <span class="checklist-category-card__leading">
            <button
              type="button"
              class="checklist-category-card__toggle"
              :aria-pressed="category.isVisible"
              :title="category.isVisible ? 'Sembunyikan kategori' : 'Tampilkan kategori'"
              @click.stop="vm.toggleCategoryVisibility(category.id)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <template v-if="category.isVisible">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </template>
                <template v-else>
                  <path d="M3 3l18 18M10.6 5.1A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.4 3.2M6.6 6.6A17.2 17.2 0 0 0 2 12s3.5 7 10 7a10.4 10.4 0 0 0 5.4-1.4" />
                  <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                </template>
              </svg>
            </button>
            <span class="checklist-category-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path :d="category.icon" />
              </svg>
            </span>
          </span>
          <button
            type="button"
              class="checklist-category-card__add"
            aria-label="Kelola kolom"
            title="Kelola kolom kategori"
            @click.stop="columnManagerModalVm.open(category.id)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </header>

        <div class="checklist-category-card__body">
          <strong>{{ category.name }}</strong>
          <p>{{ category.description }}</p>
          <ul class="checklist-category-card__columns">
            <li
              v-for="column in category.displayColumns"
              :key="column.id"
              class="checklist-column-item"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              {{ column.label }}
            </li>
          </ul>
        </div>

        <footer class="checklist-category-card__footer">
          <span class="checklist-category-card__badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            {{ category.questionCount }} pertanyaan
          </span>
          <span class="checklist-category-card__status" :class="{ 'is-off': !category.isVisible }">
            {{ category.isVisible ? 'Tampil' : 'Disembunyikan' }}
          </span>
        </footer>
      </article>
    </section>

    <ColumnFormModal />
  </main>
</template>
