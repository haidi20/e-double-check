<script setup lang="ts">
import { useQuestionVm } from '@/features/question/vm/useQuestionVm'

const vm = useQuestionVm()
</script>

<template>
  <main class="question-page" :aria-label="vm.view.ariaLabel">
    <header class="question-topbar">
      <button type="button" aria-label="Kembali" @click="vm.goBack()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m15 19-7-7 7-7" />
        </svg>
      </button>
      <strong>Daftar Pertanyaan</strong>
    </header>

    <div class="question-page__container">
      <header class="question-hero">
        <p class="question-hero__eyebrow">Checklist</p>
        <h1>{{ vm.view.title }}</h1>
        <p>{{ vm.view.subtitle }}</p>

        <div class="question-hero__info">
          <span v-for="item in vm.infoItems" :key="item.label">
            <small>{{ item.label }}</small>
            <strong>{{ item.value }}</strong>
          </span>
        </div>

        <div class="question-hero__progress">
          <div class="question-hero__progress-heading">
            <span>Progres Pengerjaan</span>
            <strong>{{ vm.progressPercentage }}%</strong>
          </div>
          <div class="question-hero__progress-track">
            <i :style="{ width: `${vm.progressPercentage}%` }"></i>
          </div>
          <small>{{ vm.completedQuestions }} dari {{ vm.totalQuestions }} pertanyaan selesai</small>
        </div>

      </header>

      <div v-if="vm.questionGroups.length" class="question-page__section-header">
        <h2>{{ vm.view.sectionLabel }}</h2>
        <span>{{ vm.categoryCount }}</span>
      </div>

        <label class="question-date">
          <span>Pilih tanggal</span>
          <input
            type="date"
            :value="vm.view.workDate"
            @change="vm.updateWorkDateFromEvent($event)"
          />
        </label>

      <section
        v-for="group in vm.questionGroups"
        :key="group.category.id"
        class="question-workspace"
        :class="{ 'is-helper-active': vm.view.activeHelperCategoryId === group.category.id }"
        :data-category-id="group.category.id"
      >
        <header class="question-workspace__heading">
          <div>
            <p class="question-workspace__eyebrow">Kategori</p>
            <h2>{{ group.category.name }}</h2>
          </div>
          <span>{{ group.questions.length }} pertanyaan</span>
        </header>

        <div v-if="group.answerColumns.length" class="question-column-hints">
          <span v-for="column in group.answerColumns" :key="column.id">{{ column.label }}</span>
        </div>

        <div class="question-answers">
          <div
            v-for="question in group.questions"
            :key="question.id"
            class="question-answer-item"
            :class="{ 'is-helper-active': vm.view.activeHelperQuestionId === question.id }"
            :data-question-id="question.id"
          >
            <header>
              <span>{{ String(question.number).padStart(2, '0') }}</span>
              <strong>{{ question.name }}</strong>
            </header>

            <div class="question-answer-fields">
              <label
                v-for="column in group.answerColumns"
                :key="column.id"
                :class="vm.getFieldLayoutClass(column)"
              >
                <small>{{ column.label }}</small>
                <strong
                  v-if="vm.isServiceColumn(column)"
                  class="question-answer-fields__service"
                >
                  {{ vm.getServiceAnswerValue(question.id, column.id) }}
                </strong>
                <span
                  v-else-if="column.mode === 'input'"
                  class="question-answer-fields__text"
                  :class="{ 'is-bold': column.boldValue }"
                >
                  {{ vm.getAnswerValue(question.id, column.id) }}
                </span>
                <span
                  v-else-if="column.type === 'boolean'"
                  class="question-answer-fields__choice"
                >
                  <input
                    type="checkbox"
                    :checked="vm.getAnswerValue(question.id, column.id) === true"
                    @change="vm.setBooleanAnswerFromEvent(question.id, column.id, $event)"
                  />
                  <span>{{ column.label }}</span>
                </span>
                <input
                  v-else-if="column.type === 'number'"
                  type="number"
                  :value="vm.getAnswerValue(question.id, column.id)"
                  @input="vm.setNumberAnswerFromEvent(question.id, column.id, $event)"
                />
                <input
                  v-else-if="column.type === 'time'"
                  type="time"
                  :value="vm.getAnswerValue(question.id, column.id)"
                  @input="vm.setTextAnswerFromEvent(question.id, column.id, $event)"
                />
                <input
                  v-else
                  type="text"
                  :value="vm.getAnswerValue(question.id, column.id)"
                  @input="vm.setTextAnswerFromEvent(question.id, column.id, $event)"
                />
              </label>
            </div>

          </div>
        </div>

      </section>

      <section v-if="vm.questionGroups.length" class="question-save-bar">
        <div>
          <small>{{ vm.completedQuestions }} pertanyaan tersimpan</small>
          <p>Periksa isian sebelum disimpan.</p>
        </div>
        <button type="button" @click="vm.saveAllAnswers()">Simpan Semua</button>
      </section>

      <section v-if="!vm.questionGroups.length" class="question-page__empty">
        <strong>{{ vm.categories.length ? vm.view.emptyQuestionTitle : vm.view.emptyTitle }}</strong>
        <p>{{ vm.categories.length ? vm.view.emptyQuestionDescription : vm.view.emptyDescription }}</p>
      </section>
    </div>

    <button
      type="button"
      class="question-helper-button"
      aria-label="Buka bantuan pencarian"
      @click="vm.openHelperModal()"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="m5.6 5.6 3.8 3.8M14.6 14.6l3.8 3.8M18.4 5.6l-3.8 3.8M9.4 14.6l-3.8 3.8" />
      </svg>
    </button>

    <button
      v-show="vm.view.isScrollTopVisible"
      type="button"
      class="question-scroll-top"
      aria-label="Gulir ke atas"
      @click="vm.scrollToQuestionTop()"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m5 15 7-7 7 7" />
      </svg>
    </button>

    <div
      v-if="vm.view.isHelperModalOpen"
      class="question-helper-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian pertanyaan"
    >
      <section class="question-helper-modal__dialog">
        <header>
          <strong>Cari Pertanyaan</strong>
        </header>

        <label class="question-helper-modal__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Cari pertanyaan..."
            :value="vm.view.helperSearchTerm"
            @input="vm.updateHelperSearchFromEvent($event)"
          />
        </label>

        <div class="question-helper-modal__results">
          <button
            v-for="result in vm.helperCategoryResults"
            :key="`category-${result.id}`"
            type="button"
            @click="vm.goToHelperCategory(result.id)"
          >
            <strong>{{ result.name }}</strong>
            <small>Kategori - {{ result.questionCount }} pertanyaan</small>
          </button>

          <button
            v-for="result in vm.helperResults"
            :key="result.id"
            type="button"
            @click="vm.goToHelperQuestion(result.id)"
          >
            <strong>{{ result.name }}</strong>
            <small>{{ result.category }}</small>
          </button>
        </div>

        <button type="button" class="question-helper-modal__close" @click="vm.closeHelperModal()">
          Tutup
        </button>
      </section>
    </div>
  </main>
</template>

<style scoped src="./QuestionScreen.css"></style>
