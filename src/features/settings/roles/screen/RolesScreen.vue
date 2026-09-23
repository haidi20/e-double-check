<script setup lang="ts">
import RoleFormModal from '@/features/settings/roles/screen/RoleFormModal.vue'
import { useRolesVm } from '@/features/settings/roles/vm/useRolesVm'

const vm = useRolesVm()
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

    <section class="roles-layout">
      <aside class="role-list" aria-label="Daftar peran">
        <article v-for="role in vm.view.roleCards" :key="role.name" class="panel role-card">
          <strong>{{ role.name }}</strong>
          <span>{{ role.users }}</span>
          <p>{{ role.scope }}</p>
        </article>
      </aside>

      <article class="panel panel--wide">
        <div class="panel__heading">
          <div>
            <p class="eyebrow">Matriks Izin</p>
            <h3>Konfigurasi fitur</h3>
          </div>
          <button type="button" class="primary-button">Simpan Perubahan</button>
        </div>
        <div class="permission-grid" aria-label="Matriks izin">
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
      </article>
    </section>

    <RoleFormModal />
  </main>
</template>
