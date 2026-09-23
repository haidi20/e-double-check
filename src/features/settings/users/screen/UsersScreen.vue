<script setup lang="ts">
import UserFormModal from '@/features/settings/users/screen/UserFormModal.vue'
import { useUsersVm } from '@/features/settings/users/vm/useUsersVm'

const vm = useUsersVm()
</script>

<template>
  <main class="feature-screen container-fluid px-3 px-md-4 py-3 py-md-4">
    <section class="page-heading">
      <div>
        <p class="eyebrow">{{ vm.view.subtitle }}</p>
        <h2>{{ vm.view.headingTitle }}</h2>
        <p>{{ vm.view.description }}</p>
      </div>
      <button type="button" class="primary-button" @click="vm.openFormModal">{{ vm.view.primaryActionLabel }}</button>
    </section>

    <section class="access-layout access-layout--single">
      <article class="panel panel--wide">
        <div class="tabs" aria-label="Menu pengguna">
          <button
            v-for="tab in vm.view.tabs"
            :key="tab.id"
            type="button"
            :class="{ 'is-active': vm.view.activeTabId === tab.id }"
            @click="vm.setActiveTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>
        <div v-if="vm.view.activeTabId === 'users'" class="toolbar">
          <label>
            <span>Cari</span>
            <input type="search" placeholder="Cari pengguna, peran, atau wilayah" />
          </label>
          <button type="button" class="ghost-button">Saring</button>
        </div>
        <div v-if="vm.view.activeTabId === 'users'" class="access-list">
          <article v-for="row in vm.view.accessRows" :key="row.name" class="access-row">
            <span>{{ row.initials }}</span>
            <div>
              <strong>{{ row.name }}</strong>
              <small>{{ row.area }}</small>
            </div>
            <b>{{ row.role }}</b>
            <mark>{{ row.status }}</mark>
          </article>
        </div>

        <div v-else-if="vm.view.activeTabId === 'roles'" class="users-tab-panel">
          <section class="users-role-grid" aria-label="Daftar peran pengguna">
            <article v-for="role in vm.view.roleCards" :key="role.name" class="role-card">
              <strong>{{ role.name }}</strong>
              <span>{{ role.users }}</span>
              <p>{{ role.scope }}</p>
            </article>
          </section>

          <div class="permission-grid" aria-label="Matriks izin pengguna">
            <div class="permission-grid__head">Fitur</div>
            <div class="permission-grid__head">Lihat</div>
            <div class="permission-grid__head">Tambah</div>
            <div class="permission-grid__head">Ubah</div>
            <div class="permission-grid__head">Hapus</div>
            <template v-for="permission in vm.view.permissionRows" :key="permission.feature">
              <strong>{{ permission.feature }}</strong>
              <span class="check">{{ permission.view }}</span>
              <span class="check">{{ permission.create }}</span>
              <span class="check">{{ permission.update }}</span>
              <span :class="permission.removeClass">{{ permission.remove }}</span>
            </template>
          </div>
        </div>

        <div v-else class="access-list">
          <article v-for="row in vm.view.sessionRows" :key="`${row.name}-${row.device}`" class="access-row">
            <span>{{ row.initials }}</span>
            <div>
              <strong>{{ row.name }}</strong>
              <small>{{ row.device }}</small>
            </div>
            <b>{{ row.location }}</b>
            <mark>{{ row.status }}</mark>
          </article>
        </div>
      </article>
    </section>

    <UserFormModal />
  </main>
</template>
