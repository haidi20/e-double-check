<script setup lang="ts">
import AnswerTypeFormModal from '@/features/checklist/screen/AnswerTypeFormModal.vue'
import { useAnswerTypeFormVm } from '@/features/checklist/vm/useAnswerTypeFormVm'
import { useChecklistAnswerTypeVm } from '@/features/checklist/vm/useChecklistAnswerTypeVm'

const vm = useChecklistAnswerTypeVm()
const formVm = useAnswerTypeFormVm()
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Daftar Pertanyaan</p>
        <h2>Tipe Jawaban</h2>
        <p>Kelola tipe jawaban yang dipakai pada kolom kategori checklist.</p>
      </div>
      <button
        v-if="vm.isMasterEditor"
        type="button"
        class="primary-button"
        @click="formVm.openCreate"
      >
        Tambah Tipe Jawaban
      </button>
    </section>

    <section class="panel">
      <p v-if="vm.view.modal.formError" class="status-message">{{ vm.view.modal.formError }}</p>

      <div class="data-table data-table--master" role="table" aria-label="Data tipe jawaban">
        <div class="data-table__row data-table__row--head" role="row">
          <span>Nama</span>
          <span>Jenis</span>
          <span>Opsi</span>
          <span>Pemilik</span>
          <span>Aksi</span>
        </div>
        <div v-for="row in vm.activeAnswerTypeRows" :key="row.id" class="data-table__row" role="row">
          <strong>{{ row.label }}</strong>
          <span>{{ row.kindLabel }}</span>
          <span>{{ row.optionsLabel }}</span>
          <mark>{{ row.ownerLabel }}</mark>
          <span class="table-actions">
            <template v-if="vm.isMasterEditor && !row.isSystem">
              <button type="button" class="ghost-button" @click="formVm.openEdit(row.id)">Ubah</button>
              <button type="button" class="ghost-button" @click="vm.archiveAnswerType(row.id)">Arsipkan</button>
              <button type="button" class="ghost-button" @click="vm.deleteAnswerType(row.id)">Hapus</button>
            </template>
            <span v-else>-</span>
          </span>
        </div>
      </div>
    </section>

    <section v-if="vm.archivedAnswerTypeRows.length" class="checklist-archived-section">
      <h3>Arsip Tipe Jawaban</h3>
      <ul class="checklist-archived-list">
        <li v-for="row in vm.archivedAnswerTypeRows" :key="row.id">
          <div>
            <strong>{{ row.label }}</strong>
            <small>{{ row.kindLabel }}</small>
          </div>
          <span v-if="vm.isMasterEditor" class="checklist-archived-list__actions">
            <button type="button" class="ghost-button" @click="vm.restoreAnswerType(row.id)">Pulihkan</button>
            <button type="button" class="ghost-button" @click="vm.deleteAnswerType(row.id)">Hapus</button>
          </span>
        </li>
      </ul>
    </section>

    <AnswerTypeFormModal />
  </main>
</template>
