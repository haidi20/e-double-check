import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { columnFormState } from '@/features/checklist/state/columnFormState'
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import type { ChecklistColumn, ChecklistColumnMode, ChecklistColumnType } from '@/features/checklist/type/checklistTypes'

export const useColumnFormVm = defineStore('columnFormVm', () => {
  const form = reactive({ ...columnFormState })
  const questionsVm = useChecklistQuestionsVm()

  const category = computed(() =>
    questionsVm.view.categories.find(
      (item) => item.id === questionsVm.view.columnModal.columnModalCategoryId
    ) ?? null
  )

  const editingColumn = computed(() =>
    category.value?.columns.find(
      (column) => column.id === questionsVm.view.columnModal.editingColumnId
    ) ?? null
  )

  const isEditMode = computed(() => editingColumn.value !== null)
  const error = computed(() => questionsVm.view.columnModal.columnFormError)

  const columnTypeLabels: Record<ChecklistColumnType, string> = {
    text: 'Teks',
    number: 'Angka',
    boolean: 'Ya / Tidak',
    time: 'Waktu'
  }

  const columnModeLabels: Record<ChecklistColumnMode, string> = {
    input: 'Input',
    'read-only': 'Read-only'
  }

  const formatColumnType = (column: ChecklistColumn) =>
    [columnTypeLabels[column.type], columnModeLabels[column.mode], column.required ? 'Wajib' : '']
      .filter(Boolean)
      .join(' - ')

  const reset = () => {
    form.label = editingColumn.value?.label ?? columnFormState.label
    form.type = editingColumn.value?.type ?? columnFormState.type
    form.mode = editingColumn.value?.mode ?? columnFormState.mode
    form.required = editingColumn.value?.required ?? columnFormState.required
    form.error = columnFormState.error
  }

  const open = (categoryId: string, columnId?: string) => {
    questionsVm.openColumnModal(categoryId, columnId)
    reset()
  }

  const close = () => {
    questionsVm.closeColumnModal()
    reset()
  }

  const submit = () => {
    const isSuccess = questionsVm.addColumn({
      label: form.label,
      type: form.type,
      mode: form.mode,
      required: form.required
    })

    if (isSuccess) {
      reset()
    }

    return isSuccess
  }

  const remove = (columnId: string) => {
    if (!category.value) {
      return
    }

    questionsVm.removeColumn(category.value.id, columnId)
  }

  return {
    form,
    category,
    editingColumn,
    isEditMode,
    error,
    columnTypeLabels,
    columnModeLabels,
    formatColumnType,
    open,
    close,
    submit,
    remove
  }
})
