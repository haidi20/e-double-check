<script setup lang="ts">
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import { useCategoryFormVm } from '@/features/checklist/vm/useCategoryFormVm'
import CategoryFormModal from '@/features/checklist/screen/CategoryFormModal.vue'
import ColumnFormModal from '@/features/checklist/screen/ColumnFormModal.vue'
import { useColumnManagerModalVm } from '@/features/checklist/vm/useColumnManagerModalVm'
import { usePageShortcuts } from '@/core/composables/usePageShortcuts'
import { useShortcutsVm } from '@/features/settings/shortcuts/vm/useShortcutsVm'

const vm = useChecklistQuestionsVm()
const categoryFormVm = useCategoryFormVm()
const columnManagerModalVm = useColumnManagerModalVm()
const shortcutsVm = useShortcutsVm()

usePageShortcuts([
  { commandId: 'page.checklist.new', handler: () => vm.openQuestionModal(vm.categoryCards[0]?.id ?? '') }
])
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="checklist-page-heading">
      <div>
        <p class="eyebrow">Daftar Pertanyaan</p>
        <h2>Kategori Checklist</h2>
      </div>
      <button
        v-if="vm.isMasterEditor"
        type="button"
        class="primary-button"
        @click="categoryFormVm.open()"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Tambah Kategori
      </button>
    </section>

    <p v-if="vm.view.categoryModal.actionError" class="checklist-action-error" role="alert">
      {{ vm.view.categoryModal.actionError }}
    </p>

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
              v-if="vm.isMasterEditor"
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
          <span v-if="vm.isMasterEditor" class="checklist-category-card__actions">
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
            <button
              type="button"
              class="checklist-category-card__add"
              aria-label="Ubah kategori"
              title="Ubah nama atau deskripsi kategori"
              @click.stop="categoryFormVm.open(category.id)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
              </svg>
            </button>
            <button
              type="button"
              class="checklist-category-card__add"
              aria-label="Naikkan kategori"
              title="Urutkan ke atas"
              @click.stop="vm.moveCategory(category.id, 'up')"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <button
              type="button"
              class="checklist-category-card__add"
              aria-label="Turunkan kategori"
              title="Urutkan ke bawah"
              @click.stop="vm.moveCategory(category.id, 'down')"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              class="checklist-category-card__add"
              aria-label="Arsipkan kategori"
              title="Arsipkan kategori"
              @click.stop="vm.archiveCategory(category.id)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
              </svg>
            </button>
          </span>
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
              <span class="checklist-column-owner">
                {{ column.mode === 'input' ? 'Admin' : 'Karyawan' }}
              </span>
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

    <section v-if="vm.archivedCategoryCards.length" class="checklist-archived-section">
      <h3>Arsip Kategori</h3>
      <ul class="checklist-archived-list">
        <li v-for="category in vm.archivedCategoryCards" :key="category.id">
          <div>
            <strong>{{ category.name }}</strong>
            <small>{{ category.questionCount }} pertanyaan</small>
          </div>
          <span v-if="vm.isMasterEditor" class="checklist-archived-list__actions">
            <button type="button" class="ghost-button" @click="vm.restoreCategory(category.id)">
              Pulihkan
            </button>
            <button type="button" class="ghost-button" @click="vm.deleteCategory(category.id)">
              Hapus
            </button>
          </span>
        </li>
      </ul>
    </section>

    <CategoryFormModal />
    <ColumnFormModal />
  </main>
</template>
