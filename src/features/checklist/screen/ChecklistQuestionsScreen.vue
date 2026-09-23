<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'

const vm = useChecklistQuestionsVm()

onUnmounted(() => {
  vm.clearSelectedCategory()
})
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Checklist</p>
        <h2>{{ vm.selectedCategory ? vm.selectedCategory.name : 'Daftar Pertanyaan' }}</h2>
        <p>
          {{
            vm.selectedCategory
              ? vm.selectedCategory.description
              : 'Pilih kategori untuk melihat daftar pertanyaan checklist.'
          }}
        </p>
      </div>
      <button
        v-if="vm.selectedCategory"
        type="button"
        class="ghost-button"
        @click="vm.clearSelectedCategory"
      >
        Kembali
      </button>
    </section>

    <section v-if="!vm.selectedCategory" class="master-grid">
      <button
        v-for="category in vm.view.categories"
        :key="category.id"
        type="button"
        class="panel checklist-category-card"
        @click="vm.selectCategory(category.id)"
      >
        <p class="eyebrow">{{ category.questionCount }} pertanyaan</p>
        <strong>{{ category.name }}</strong>
        <p>{{ category.description }}</p>
      </button>
    </section>

    <section v-else class="panel">
      <div class="panel__heading">
        <div>
          <p class="eyebrow">Detail kategori</p>
          <h3>{{ vm.selectedCategory.name }}</h3>
        </div>
        <span class="status-pill">{{ vm.selectedCategoryQuestions.length }} pertanyaan</span>
      </div>

      <div class="employee-list">
        <article
          v-for="question in vm.selectedCategoryQuestions"
          :key="question.id"
          class="employee-row"
        >
          <span>{{ question.service.slice(0, 2).toUpperCase() }}</span>
          <div>
            <strong>{{ question.name }}</strong>
            <small>
              {{ question.executor ? `Pelaksana: ${question.executor}` : 'Pelaksana belum ditentukan' }}
              {{ question.controller ? ` - Kontrol: ${question.controller}` : '' }}
            </small>
          </div>
          <b>{{ question.service }}</b>
          <mark v-if="question.requiresDoubleCheck">Cek ganda</mark>
          <mark v-else-if="question.requiresFinalChecker">Pemeriksa akhir</mark>
          <mark v-else-if="question.requiresCheckTime">Jam cek</mark>
        </article>
      </div>
    </section>
  </main>
</template>
