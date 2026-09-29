import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { checklistAnswerTypeState } from '@/features/checklist/state/checklistAnswerTypeState'
import { localChecklistRepository } from '@/features/checklist/repository/localChecklistRepository'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import type { ChecklistAnswerType } from '@/features/checklist/type/checklistTypes'

const toPlainRecords = <T>(records: T[]): T[] => JSON.parse(JSON.stringify(records)) as T[]

export interface ChecklistAnswerTypeRow {
  id: string
  label: string
  kindLabel: string
  optionsLabel: string
  ownerLabel: string
  isSystem: boolean
  isArchived: boolean
}

const kindLabels: Record<ChecklistAnswerType['kind'], string> = {
  text: 'Teks',
  number: 'Angka',
  boolean: 'Ya / Tidak',
  time: 'Waktu',
  select: 'Pilihan'
}

export const useChecklistAnswerTypeVm = defineStore('checklistAnswerTypeVm', () => {
  const authVm = useAuthVm()
  const questionsVm = useChecklistQuestionsVm()
  const view = reactive({
    ...checklistAnswerTypeState,
    modal: { ...checklistAnswerTypeState.modal }
  })
  registerStateHmr(view, 'checklistAnswerTypeState')

  const savedAnswerTypes = localChecklistRepository.loadAnswerTypes()

  if (savedAnswerTypes && savedAnswerTypes.length) {
    view.answerTypes = savedAnswerTypes
  }

  watch(
    () => view.answerTypes,
    (answerTypes) => localChecklistRepository.saveAnswerTypes(toPlainRecords(answerTypes)),
    { deep: true }
  )

  const isMasterEditor = computed(() => authVm.selectedRole !== 'employee')

  const ensureMasterEditor = () => {
    if (isMasterEditor.value) {
      return true
    }

    view.modal.formError = 'Hanya admin yang dapat mengubah data master.'
    return false
  }

  const mapRow = (answerType: ChecklistAnswerType): ChecklistAnswerTypeRow => ({
    id: answerType.id,
    label: answerType.label,
    kindLabel: kindLabels[answerType.kind],
    optionsLabel: answerType.options?.length ? answerType.options.join(', ') : '-',
    ownerLabel: answerType.isSystem ? 'Sistem' : 'Admin',
    isSystem: answerType.isSystem,
    isArchived: answerType.isArchived ?? false
  })

  const activeAnswerTypeRows = computed<ChecklistAnswerTypeRow[]>(() =>
    view.answerTypes.filter((item) => !item.isArchived).map((item) => mapRow(item))
  )

  const archivedAnswerTypeRows = computed<ChecklistAnswerTypeRow[]>(() =>
    view.answerTypes.filter((item) => item.isArchived).map((item) => mapRow(item))
  )

  const answerTypeOptions = computed(() =>
    view.answerTypes
      .filter((item) => !item.isArchived)
      .map((item) => ({ value: item.id, label: item.label, detail: kindLabels[item.kind] }))
  )

  const isAnswerTypeUsed = (answerTypeId: string) =>
    questionsVm.view.categories.some((category) =>
      category.columns.some((column) => column.answerTypeId === answerTypeId)
    )

  const upsertAnswerType = (input: { label: string; options: string[] }) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const label = input.label.trim()

    if (!label) {
      view.modal.formError = 'Nama tipe jawaban wajib diisi.'
      return false
    }

    const isDuplicate = view.answerTypes.some(
      (item) =>
        item.id !== view.modal.editingAnswerTypeId &&
        item.label.trim().toLowerCase() === label.toLowerCase()
    )

    if (isDuplicate) {
      view.modal.formError = 'Nama tipe jawaban sudah digunakan.'
      return false
    }

    if (view.modal.editingAnswerTypeId) {
      const existing = view.answerTypes.find(
        (item) => item.id === view.modal.editingAnswerTypeId
      )

      if (!existing) {
        view.modal.formError = 'Tipe jawaban tidak ditemukan.'
        return false
      }

      if (existing.isSystem) {
        view.modal.formError = 'Tipe jawaban sistem tidak dapat diubah.'
        return false
      }

      existing.label = label
      existing.options = input.options.length ? input.options : undefined
    } else {
      view.answerTypes.push({
        id: `at-${Date.now()}`,
        label,
        kind: 'select',
        options: input.options.length ? input.options : undefined,
        isSystem: false
      })
    }

    view.modal.isOpen = false
    view.modal.editingAnswerTypeId = null
    view.modal.formError = ''
    return true
  }

  const archiveAnswerType = (answerTypeId: string) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const answerType = view.answerTypes.find((item) => item.id === answerTypeId)

    if (!answerType || answerType.isSystem) {
      return false
    }

    answerType.isArchived = true
    return true
  }

  const restoreAnswerType = (answerTypeId: string) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const answerType = view.answerTypes.find((item) => item.id === answerTypeId)

    if (!answerType || answerType.isSystem) {
      return false
    }

    answerType.isArchived = false
    return true
  }

  const deleteAnswerType = (answerTypeId: string) => {
    if (!ensureMasterEditor()) {
      return false
    }

    const index = view.answerTypes.findIndex((item) => item.id === answerTypeId)

    if (index < 0) {
      return false
    }

    if (view.answerTypes[index].isSystem) {
      view.modal.formError = 'Tipe jawaban sistem tidak dapat dihapus.'
      return false
    }

    if (isAnswerTypeUsed(answerTypeId)) {
      view.modal.formError = 'Tipe jawaban masih dipakai kolom kategori. Arsipkan saja.'
      return false
    }

    view.answerTypes.splice(index, 1)
    view.modal.formError = ''
    return true
  }

  return {
    view,
    isMasterEditor,
    activeAnswerTypeRows,
    archivedAnswerTypeRows,
    answerTypeOptions,
    upsertAnswerType,
    archiveAnswerType,
    restoreAnswerType,
    deleteAnswerType
  }
})
