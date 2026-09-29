import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { columnFormState } from '@/features/checklist/state/columnFormState'
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import { useChecklistAnswerTypeVm } from '@/features/checklist/vm/useChecklistAnswerTypeVm'
import type { ChecklistColumn, ChecklistColumnGridSpan, ChecklistColumnMode, ChecklistColumnType } from '@/features/checklist/type/checklistTypes'

export const useColumnFormVm = defineStore('columnFormVm', () => {
  const form = reactive({ ...columnFormState })
  const questionsVm = useChecklistQuestionsVm()
  const answerTypeVm = useChecklistAnswerTypeVm()

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
    time: 'Waktu',
    select: 'Pilihan'
  }

  const columnModeLabels: Record<ChecklistColumnMode, string> = {
    input: 'Admin',
    'read-only': 'Karyawan'
  }

  const activeAnswerTypes = computed(() => answerTypeVm.answerTypeOptions)

  const selectedAnswerType = computed(() =>
    answerTypeVm.view.answerTypes.find((item) => item.id === form.answerTypeId) ?? null
  )

  const resolveAnswerTypeId = (column: ChecklistColumn | null) => {
    if (column?.answerTypeId) {
      return column.answerTypeId
    }

    const kindMatch = answerTypeVm.view.answerTypes.find(
      (item) => !item.isArchived && item.kind === column?.type
    )

    return kindMatch?.id ?? activeAnswerTypes.value[0]?.value ?? 'at-text'
  }

  const defaultGridSpan = (column: ChecklistColumn | null): ChecklistColumnGridSpan => {
    const isQuestionColumn = column && ['item yang dicek', 'langkah', 'item', 'tindakan']
      .some((keyword) => column.label.toLowerCase().includes(keyword))

    if (column?.gridSpan) {
      return column.gridSpan
    }

    if (isQuestionColumn || column?.label === 'Layanan') {
      return 12
    }

    return 6
  }

  const formatColumnType = (column: ChecklistColumn) =>
    [columnTypeLabels[column.type], columnModeLabels[column.mode], column.required ? 'Wajib' : '']
      .filter(Boolean)
      .join(' - ')

  const reset = () => {
    form.label = editingColumn.value?.label ?? columnFormState.label
    form.mode = editingColumn.value?.mode ?? columnFormState.mode
    form.required = editingColumn.value?.required ?? columnFormState.required
    form.gridSpan = editingColumn.value?.gridSpan ?? defaultGridSpan(editingColumn.value)
    form.boldValue = editingColumn.value?.boldValue ?? columnFormState.boldValue
    form.error = columnFormState.error
    form.answerTypeId = resolveAnswerTypeId(editingColumn.value)
    form.type = selectedAnswerType.value?.kind ?? editingColumn.value?.type ?? columnFormState.type
  }

  const syncSelectedAnswerType = () => {
    form.type = selectedAnswerType.value?.kind ?? form.type
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
    const answerType = selectedAnswerType.value
    const isSuccess = questionsVm.addColumn({
      label: form.label,
      type: answerType?.kind ?? form.type,
      mode: form.mode,
      required: form.required,
      gridSpan: form.gridSpan,
      boldValue: form.boldValue,
      answerTypeId: form.answerTypeId,
      options: answerType?.kind === 'select' ? answerType.options ?? [] : undefined
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
    activeAnswerTypes,
    selectedAnswerType,
    syncSelectedAnswerType,
    formatColumnType,
    open,
    close,
    submit,
    remove
  }
})
