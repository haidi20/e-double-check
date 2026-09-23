<script setup lang="ts">
import EmployeeFormModal from '@/features/master-data/employess/screen/EmployeeFormModal.vue'
import { useEmployeesVm } from '@/features/master-data/employess/vm/useEmployeesVm'

const vm = useEmployeesVm()
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

    <section class="master-grid">
      <article v-for="item in vm.view.employeeSummary" :key="item.label" class="panel">
        <p class="eyebrow">{{ item.label }}</p>
        <strong class="big-number">{{ item.value }}</strong>
        <p>{{ item.description }}</p>
      </article>
    </section>

    <section class="panel">
      <div class="toolbar">
        <label>
          <span>Cari</span>
          <input type="search" placeholder="Cari nama pegawai atau jabatan" />
        </label>
        <select aria-label="Departemen">
          <option>Semua departemen</option>
          <option>Gudang</option>
          <option>Pengiriman</option>
        </select>
        <button type="button" class="ghost-button">Saring</button>
      </div>
      <div class="employee-list">
        <article v-for="row in vm.view.employeeRows" :key="row.name" class="employee-row">
          <span>{{ row.initials }}</span>
          <div>
            <strong>{{ row.name }}</strong>
            <small>{{ row.role }} - {{ row.department }}</small>
          </div>
          <div class="score-bar"><i :style="{ width: row.score }"></i></div>
          <b>{{ row.score }}</b>
          <mark>{{ row.status }}</mark>
        </article>
      </div>
    </section>

    <EmployeeFormModal />
  </main>
</template>
