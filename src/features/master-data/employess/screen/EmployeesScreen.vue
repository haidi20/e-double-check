<script setup lang="ts">
import { onMounted } from 'vue'
import EmployeeFormModal from '@/features/master-data/employess/screen/EmployeeFormModal.vue'
import { useEmployeesVm } from '@/features/master-data/employess/vm/useEmployeesVm'

const vm = useEmployeesVm()

onMounted(() => {
  document.getElementById('employee-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})
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

    <section id="employee-table" class="panel">
      <div class="toolbar">
        <label>
          <span>Cari</span>
          <input
            v-model="vm.searchQuery"
            type="search"
            placeholder="Cari nama pegawai atau jabatan"
          />
        </label>
        <select v-model="vm.selectedDepartment" aria-label="Departemen">
          <option value="all">Semua departemen</option>
          <option value="Gudang">Gudang</option>
          <option value="Pengiriman">Pengiriman</option>
          <option value="Operasional">Operasional</option>
          <option value="Administrasi">Administrasi</option>
          <option value="Keuangan">Keuangan</option>
          <option value="Pelanggan">Pelanggan</option>
        </select>
      </div>
      <div class="employee-list">
        <article v-for="row in vm.employeeRows" :key="row.name" class="employee-row">
          <span>{{ row.initials }}</span>
          <div>
            <strong>{{ row.name }}</strong>
            <small>{{ row.role }} - {{ row.department }}</small>
          </div>
          <mark>{{ row.status }}</mark>
        </article>
        <p v-if="!vm.employeeRows.length" class="employee-empty">Tidak ada pegawai yang cocok.</p>
      </div>
    </section>

    <EmployeeFormModal />
  </main>
</template>
