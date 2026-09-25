<script setup lang="ts">
import OutletFormModal from '@/features/master-data/outlets/screen/OutletFormModal.vue'
import { useOutletsVm } from '@/features/master-data/outlets/vm/useOutletsVm'
import { usePageShortcuts } from '@/core/composables/usePageShortcuts'
import { useShortcutsVm } from '@/features/settings/shortcuts/vm/useShortcutsVm'

const vm = useOutletsVm()
const shortcutsVm = useShortcutsVm()

usePageShortcuts([
  { commandId: 'page.outlets.new', handler: () => vm.openCreateModal() }
])
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="page-heading">
      <div>
        <p class="eyebrow">{{ vm.view.subtitle }}</p>
        <h2>{{ vm.view.headingTitle }}</h2>
        <p>{{ vm.view.description }}</p>
      </div>
      <button
        type="button"
        class="primary-button"
        :title="`Tambah Warung (${shortcutsVm.getBindingFor('page.outlets.new')})`"
        :aria-keyshortcuts="shortcutsVm.getBindingFor('page.outlets.new') ?? undefined"
        @click="vm.openCreateModal"
      >
        {{ vm.view.primaryActionLabel }}
      </button>
    </section>

    <section id="outlet-table" class="panel">
      <div class="toolbar">
        <label>
          <span>Cari</span>
          <input v-model="vm.searchQuery" type="search" :placeholder="vm.view.searchPlaceholder" />
        </label>
      </div>

      <div class="data-table data-table--master" role="table" aria-label="Data warung">
        <div class="data-table__row data-table__row--head" role="row">
          <span>Kode</span>
          <span>Nama</span>
          <span>Penanggung jawab</span>
          <span>Status</span>
          <span>Aksi</span>
        </div>
        <div v-for="row in vm.outletRows" :key="row.id" class="data-table__row" role="row">
          <strong>{{ row.code }}</strong>
          <span>{{ row.name }}</span>
          <span>{{ row.owner }}</span>
          <mark>{{ row.status }}</mark>
          <span class="table-actions">
            <button type="button" class="ghost-button" @click="vm.openEditModal(row.id)">Ubah</button>
            <button type="button" class="ghost-button" @click="vm.deleteOutlet(row.id)">Hapus</button>
          </span>
        </div>
      </div>

      <p v-if="!vm.outletRows.length" class="outlet-empty">Tidak ada warung yang cocok.</p>
    </section>

    <OutletFormModal />
  </main>
</template>
