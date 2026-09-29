<script setup lang="ts">
import SearchableSelect from '@/core/components/SearchableSelect.vue'
import { useCaptainAssignmentVm } from '@/features/master-data/outlets/vm/useCaptainAssignmentVm'

const vm = useCaptainAssignmentVm()
</script>

<template>
  <div
    v-if="vm.view.isOpen"
    class="feature-form-modal"
    data-shortcut-modal="true"
    role="dialog"
    aria-modal="true"
    aria-label="Kelola kapten warung"
  >
    <section class="feature-form-modal__dialog feature-form-modal__dialog--lg">
      <header class="feature-form-modal__header">
        <div>
          <p class="eyebrow">Penugasan Kapten</p>
          <h3>{{ vm.outlet?.name }}</h3>
        </div>
        <button type="button" class="ghost-button" aria-label="Tutup modal" @click="vm.close()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div class="feature-form-modal__body">
        <section class="captain-current">
          <p class="eyebrow">Kapten aktif</p>
          <strong>{{ vm.activeCaptain?.employeeName ?? 'Belum ada kapten aktif' }}</strong>
          <small v-if="vm.activeCaptain">Sejak {{ vm.activeCaptain.assignedAt }}</small>
        </section>

        <form class="captain-assign-form" @submit.prevent="vm.assign()">
          <label class="feature-form-modal__field">
            Tugaskan kapten baru
            <SearchableSelect
              :model-value="vm.view.selectedEmployeeId"
              :options="vm.eligibleEmployees"
              placeholder="Pilih pegawai"
              search-placeholder="Cari pegawai"
              @update:model-value="vm.view.selectedEmployeeId = $event"
            />
          </label>
          <p v-if="vm.view.formError" class="status-message">{{ vm.view.formError }}</p>
          <button type="submit" class="primary-button">Tugaskan</button>
        </form>

        <section class="captain-history">
          <div class="captain-history__head">
            <p class="eyebrow">Riwayat penugasan</p>
            <input v-model="vm.view.search" type="search" placeholder="Cari nama atau tanggal" />
          </div>
          <table v-if="vm.filteredHistory.length" class="captain-history__table">
            <thead>
              <tr>
                <th>Pegawai</th>
                <th>Mulai</th>
                <th>Selesai</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in vm.filteredHistory" :key="row.id">
                <td>{{ row.employeeName }}</td>
                <td>{{ row.assignedAt }}</td>
                <td>{{ row.releasedAt }}</td>
                <td>{{ row.isActive ? 'Aktif' : 'Selesai' }}</td>
                <td>
                  <button
                    v-if="row.isActive"
                    type="button"
                    class="ghost-button"
                    @click="vm.release(row.id)"
                  >
                    Akhiri
                  </button>
                  <span v-else>-</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else class="captain-history__empty">Belum ada riwayat penugasan.</p>
        </section>
      </div>

      <footer class="feature-form-modal__footer">
        <button type="button" class="ghost-button" @click="vm.close()">Tutup</button>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.captain-current {
  border: 1px solid var(--sbm-border-soft);
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 14px 16px;
}

.captain-current strong {
  display: block;
  font-size: 1rem;
}

.captain-current small {
  color: var(--sbm-neutral);
}

.captain-assign-form {
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
}

.captain-assign-form .primary-button {
  justify-self: start;
}

.captain-history__head {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 8px;
}

.captain-history__head input {
  border: 1px solid var(--sbm-border);
  border-radius: 10px;
  padding: 8px 12px;
}

.captain-history__table {
  border-collapse: collapse;
  font-size: 0.86rem;
  width: 100%;
}

.captain-history__table th,
.captain-history__table td {
  border-bottom: 1px solid var(--sbm-border-soft);
  padding: 8px 10px;
  text-align: left;
}

.captain-history__empty {
  color: var(--sbm-neutral);
  font-size: 0.86rem;
}
</style>
