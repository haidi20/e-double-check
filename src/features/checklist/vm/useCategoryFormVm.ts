import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { categoryFormState } from '@/features/checklist/state/categoryFormState'
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'

export const useCategoryFormVm = defineStore('categoryFormVm', () => {
  const form = reactive({ ...categoryFormState })
  const questionsVm = useChecklistQuestionsVm()

  const editingCategory = computed(() =>
    questionsVm.view.categories.find(
      (item) => item.id === questionsVm.view.categoryModal.editingCategoryId
    ) ?? null
  )

  const isEditMode = computed(() => editingCategory.value !== null)
  const error = computed(() => questionsVm.view.categoryModal.categoryFormError)

  const reset = () => {
    form.name = editingCategory.value?.name ?? categoryFormState.name
    form.description = editingCategory.value?.description ?? categoryFormState.description
  }

  const open = (categoryId?: string) => {
    questionsVm.openCategoryModal(categoryId)
    reset()
  }

  const close = () => {
    questionsVm.closeCategoryModal()
    reset()
  }

  const submit = () => {
    const isSuccess = questionsVm.view.categoryModal.editingCategoryId
      ? questionsVm.updateCategory(questionsVm.view.categoryModal.editingCategoryId, {
          name: form.name,
          description: form.description
        })
      : questionsVm.addCategory({
          name: form.name,
          description: form.description
        })

    if (isSuccess) {
      reset()
    }

    return isSuccess
  }

  return {
    form,
    editingCategory,
    isEditMode,
    error,
    open,
    close,
    submit
  }
})
