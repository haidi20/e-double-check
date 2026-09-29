import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { answerTypeFormState } from '@/features/checklist/state/answerTypeFormState'
import { useChecklistAnswerTypeVm } from '@/features/checklist/vm/useChecklistAnswerTypeVm'

export const useAnswerTypeFormVm = defineStore('answerTypeFormVm', () => {
  const form = reactive({ ...answerTypeFormState })
  const answerTypeVm = useChecklistAnswerTypeVm()

  const editingAnswerType = computed(() =>
    answerTypeVm.view.answerTypes.find(
      (item) => item.id === answerTypeVm.view.modal.editingAnswerTypeId
    ) ?? null
  )

  const isEditMode = computed(() => editingAnswerType.value !== null)
  const isSystemType = computed(() => editingAnswerType.value?.isSystem ?? false)
  const error = computed(() => answerTypeVm.view.modal.formError)

  const reset = () => {
    form.label = editingAnswerType.value?.label ?? answerTypeFormState.label
    form.optionsText = editingAnswerType.value?.options?.join('\n') ?? answerTypeFormState.optionsText
  }

  const openCreate = () => {
    answerTypeVm.view.modal.editingAnswerTypeId = null
    answerTypeVm.view.modal.formError = ''
    answerTypeVm.view.modal.isOpen = true
    reset()
  }

  const openEdit = (answerTypeId: string) => {
    answerTypeVm.view.modal.editingAnswerTypeId = answerTypeId
    answerTypeVm.view.modal.formError = ''
    answerTypeVm.view.modal.isOpen = true
    reset()
  }

  const close = () => {
    answerTypeVm.view.modal.isOpen = false
    answerTypeVm.view.modal.editingAnswerTypeId = null
    answerTypeVm.view.modal.formError = ''
    reset()
  }

  const submit = () => {
    const options = form.optionsText
      .split('\n')
      .map((option) => option.trim())
      .filter(Boolean)
    const isSuccess = answerTypeVm.upsertAnswerType({
      label: form.label,
      options
    })

    if (isSuccess) {
      reset()
    }

    return isSuccess
  }

  return {
    form,
    editingAnswerType,
    isEditMode,
    isSystemType,
    error,
    openCreate,
    openEdit,
    close,
    submit
  }
})
