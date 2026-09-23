<script setup lang="ts">
import OrderInvoicePaper from '@/features/orders/screen/OrderInvoicePaper.vue'
import { useOrdersVm } from '@/features/orders/vm/useOrdersVm'

const vm = useOrdersVm()
</script>

<template>
  <div v-if="vm.view.isImportModalOpen" class="import-modal" role="dialog" aria-modal="true" aria-label="Modal impor faktur">
    <section class="import-modal__dialog">
      <header class="import-modal__header">
        <div class="import-modal__title">
          <span>{{ vm.view.importEyebrow }}</span>
          <h3>{{ vm.importModalTitle }}</h3>
          <p>{{ vm.importModalDescription }}</p>
        </div>
        <div class="import-modal__steps" aria-label="Tahap impor faktur">
          <span :class="{ 'is-active': !vm.view.isImportReviewOpen }">1</span>
          <i></i>
          <span :class="{ 'is-active': vm.view.isImportReviewOpen }">2</span>
        </div>
        <button type="button" class="ghost-button" @click="vm.closeImportModal">{{ vm.view.importCloseLabel }}</button>
      </header>

      <div v-if="!vm.view.isImportReviewOpen" class="import-upload-layout">
        <label class="import-dropzone" :class="{ 'is-ready': vm.canProcessImport }">
          <input
            class="import-dropzone__input"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            aria-label="Pilih file faktur"
            @change="vm.handleImportFileChange"
          />
          <span>{{ vm.importDropzoneBadge }}</span>
          <strong>{{ vm.view.importDropzoneTitle }}</strong>
          <p>{{ vm.view.importFileHint }}</p>
          <small v-if="vm.view.selectedImportFileName">
            {{ vm.view.importSelectedFilePrefix }} {{ vm.view.selectedImportFileName }} ({{ vm.view.selectedImportFileSize }})
          </small>
          <b>{{ vm.importSelectButtonLabel }}</b>
        </label>

        <aside class="import-file-card">
          <img :src="vm.importPreviewUrl" alt="Pratinjau file faktur" />
          <div>
            <span>{{ vm.view.importActiveFileLabel }}</span>
            <strong>{{ vm.selectedImportFileDisplay }}</strong>
            <p>{{ vm.selectedImportFileMeta }}</p>
          </div>
          <ul>
            <li v-for="item in vm.view.importChecklist" :key="item">{{ item }}</li>
          </ul>
        </aside>
      </div>

      <OrderInvoicePaper v-if="vm.view.isImportReviewOpen" />

      <p v-if="vm.view.isImportSubmitted" class="status-message">{{ vm.view.importSuccessMessage }}</p>

      <footer class="import-modal__footer">
        <button type="button" class="ghost-button" @click="vm.closeImportModal">{{ vm.view.importCancelLabel }}</button>
        <div class="import-modal__actions">
          <button
            v-if="!vm.view.isImportReviewOpen"
            type="button"
            class="primary-button"
            :disabled="!vm.canProcessImport"
            @click="vm.processImportFile"
          >
            {{ vm.view.importProcessLabel }}
          </button>
          <button v-else type="button" class="primary-button" :disabled="vm.view.isImportSubmitted" @click="vm.sendImportReview">
            {{ vm.view.importSendLabel }}
          </button>
        </div>
      </footer>
    </section>
  </div>
</template>

