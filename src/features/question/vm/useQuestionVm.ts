import { defineStore } from 'pinia'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useChecklistQuestionsVm } from '@/features/checklist/vm/useChecklistQuestionsVm'
import { useDashboardMobileVm } from '@/features/dashboard/vm/useDashboardMobileVm'
import type { ChecklistColumn, ChecklistQuestionValue } from '@/features/checklist/type/checklistTypes'
import type { ChecklistCategoryCardItem, ChecklistQuestionRow } from '@/features/checklist/vm/useChecklistQuestionsVm'
import { questionScreenState } from '@/features/question/state/questionScreenState'

type ScrollContainer = HTMLElement | Window

export interface QuestionGroup {
  category: ChecklistCategoryCardItem
  questions: ChecklistQuestionRow[]
  answerColumns: ChecklistColumn[]
}

export const useQuestionVm = defineStore('questionVm', () => {
  const view = reactive({ ...questionScreenState })
  const router = useRouter()
  const checklistVm = useChecklistQuestionsVm()
  const dashboardVm = useDashboardMobileVm()
  let activeHelperHighlightTimeout: number | undefined
  let pageScrollContainer: ScrollContainer | null = null

  const getScrollContainer = (element: HTMLElement): ScrollContainer => {
    let parent = element.parentElement

    while (parent) {
      const styles = window.getComputedStyle(parent)
      const canScroll = /(auto|scroll|overlay)/.test(styles.overflowY)

      if (canScroll && parent.scrollHeight > parent.clientHeight) return parent
      parent = parent.parentElement
    }

    return window
  }

  const getPageScrollContainer = (): ScrollContainer => {
    const page = document.querySelector<HTMLElement>('.question-page')
    return page ? getScrollContainer(page) : window
  }

  const syncScrollTopVisibility = () => {
    const container = getPageScrollContainer()
    view.isScrollTopVisible = container instanceof HTMLElement
      ? container.scrollTop > 160
      : window.scrollY > 160
  }

  const scrollToQuestionTop = () => {
    getPageScrollContainer().scrollTo({ behavior: 'smooth', top: 0 })
  }

  const scrollToTarget = (target: HTMLElement | null) => {
    if (!target) return

    const container = getScrollContainer(target)
    const header = document.querySelector<HTMLElement>('.question-topbar')
    const offset = (header?.getBoundingClientRect().height ?? 0) + 12
    const targetRect = target.getBoundingClientRect()
    const top = container instanceof HTMLElement
      ? targetRect.top - container.getBoundingClientRect().top + container.scrollTop - offset
      : targetRect.top + window.scrollY - offset

    container.scrollTo({ behavior: 'smooth', top: Math.max(0, top) })
  }

  const goToHelperQuestion = async (questionId: string) => {
    closeHelperModal()
    view.activeHelperCategoryId = null
    view.activeHelperQuestionId = questionId
    if (activeHelperHighlightTimeout) window.clearTimeout(activeHelperHighlightTimeout)
    await nextTick()
    scrollToTarget(document.querySelector<HTMLElement>(`[data-question-id="${questionId}"]`))
    activeHelperHighlightTimeout = window.setTimeout(() => {
      view.activeHelperCategoryId = null
      view.activeHelperQuestionId = null
    }, 1600)
  }

  const goToHelperCategory = async (categoryId: string) => {
    closeHelperModal()
    view.activeHelperQuestionId = null
    view.activeHelperCategoryId = categoryId
    if (activeHelperHighlightTimeout) window.clearTimeout(activeHelperHighlightTimeout)
    await nextTick()
    scrollToTarget(document.querySelector<HTMLElement>(`[data-category-id="${categoryId}"]`))
    activeHelperHighlightTimeout = window.setTimeout(() => {
      view.activeHelperCategoryId = null
      view.activeHelperQuestionId = null
    }, 1600)
  }

  onMounted(() => {
    pageScrollContainer = getPageScrollContainer()
    pageScrollContainer.addEventListener('scroll', syncScrollTopVisibility, { passive: true })
    syncScrollTopVisibility()
  })

  onBeforeUnmount(() => {
    pageScrollContainer?.removeEventListener('scroll', syncScrollTopVisibility)
    if (activeHelperHighlightTimeout) window.clearTimeout(activeHelperHighlightTimeout)
  })

  const categories = computed(() => checklistVm.categoryCards)
  const categoryCount = computed(() => categories.value.length)
  const totalQuestions = computed(() =>
    categories.value.reduce((total, category) => total + category.questionCount, 0)
  )
  const workDateLabel = computed(() =>
    new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(view.workDate)
    )
  )
  const infoItems = computed(() => [
    { label: 'Warung', value: dashboardVm.view.outletName },
    { label: 'Kapten Warung', value: dashboardVm.view.profileName },
    { label: 'Tanggal', value: workDateLabel.value },
    { label: 'Shift', value: dashboardVm.shiftLabel }
  ])
  const completedQuestions = computed(() => view.savedQuestionIds.length)
  const progressPercentage = computed(() =>
    totalQuestions.value === 0 ? 0 : Math.round((completedQuestions.value / totalQuestions.value) * 100)
  )
  const questionGroups = computed<QuestionGroup[]>(() => {
    const normalizedSearch = view.searchTerm.trim().toLowerCase()
    const questionColumnKeywords = ['item yang dicek', 'langkah', 'item', 'tindakan']

    return categories.value
      .map((category) => {
        const questions = checklistVm.questionRowsByCategory[category.id]
          ?.filter((question) => question.name.toLowerCase().includes(normalizedSearch)) ?? []

        return {
          category,
          questions,
          answerColumns: category.columns.filter(
            (column) => !questionColumnKeywords.some((keyword) => column.label.toLowerCase().includes(keyword))
          )
        }
      })
      .filter((group) => group.questions.length > 0)
  })

  const helperCategoryResults = computed(() => {
    const normalizedSearch = view.helperSearchTerm.trim().toLowerCase()

    return categories.value
      .filter((category) => category.name.toLowerCase().includes(normalizedSearch))
      .map((category) => ({
        id: category.id,
        name: category.name,
        questionCount: category.questionCount
      }))
  })

  const helperResults = computed(() => {
    const normalizedSearch = view.helperSearchTerm.trim().toLowerCase()

    return questionGroups.value.flatMap((group) =>
      group.questions
        .filter((question) => question.name.toLowerCase().includes(normalizedSearch))
        .map((question) => ({
          id: question.id,
          category: group.category.name,
          name: question.name
        }))
    )
  })

  const getFieldLayoutClass = (column: ChecklistColumn) => {
    const isServiceColumn =
      column.type === 'text' && column.label.trim().toLowerCase() === 'layanan'

    return isServiceColumn
      ? 'question-answer-fields__field--full'
      : 'question-answer-fields__field--half'
  }

  const isServiceColumn = (column: ChecklistColumn) =>
    column.type === 'text' && column.label.trim().toLowerCase() === 'layanan'

  const getServiceAnswerValue = (questionId: string, columnId: string) => {
    const answerValue = getAnswerValue(questionId, columnId)

    return answerValue !== '' ? answerValue : getQuestion(questionId)?.service ?? ''
  }

  const updateSearch = (value: string) => {
    view.searchTerm = value
  }

  const openHelperModal = () => {
    view.helperSearchTerm = ''
    view.isHelperModalOpen = true
  }

  const closeHelperModal = () => {
    view.isHelperModalOpen = false
  }

  const updateHelperSearchFromEvent = (event: Event) => {
    const target = event.target
    view.helperSearchTerm = target instanceof HTMLInputElement ? target.value : ''
  }

  const updateSearchFromEvent = (event: Event) => {
    updateSearch((event.target as HTMLInputElement).value)
  }

  const updateWorkDate = (value: string) => {
    view.workDate = value
  }

  const updateWorkDateFromEvent = (event: Event) => {
    updateWorkDate((event.target as HTMLInputElement).value)
  }

  const goBack = () => {
    const roleQuery = router.currentRoute.value.query.role

    return router.push({
      path: '/dashboard',
      query: roleQuery ? { role: roleQuery } : {}
    })
  }

  const getQuestion = (questionId: string) =>
    checklistVm.view.questions.find((question) => question.id === questionId) ?? null

  const getAnswerValue = (questionId: string, columnId: string): ChecklistQuestionValue => {
    const answerKey = `${questionId}:${columnId}`

    if (answerKey in view.answers) {
      return view.answers[answerKey]
    }

    const question = getQuestion(questionId)
    const storedValue = question?.values?.[columnId]

    if (storedValue !== undefined && storedValue !== '') {
      return storedValue
    }

    const category = checklistVm.view.categories.find((item) => item.id === question?.categoryId)
    const column = category?.columns.find((item) => item.id === columnId)
    const label = column?.label.trim().toLowerCase()

    if (label === 'pelaksana') {
      return question?.executor ?? ''
    }

    if (label === 'kontrol') {
      return question?.controller ?? ''
    }

    return storedValue ?? ''
  }

  const setAnswerValue = (questionId: string, columnId: string, value: ChecklistQuestionValue) => {
    view.answers[`${questionId}:${columnId}`] = value
  }

  const setTextAnswerFromEvent = (questionId: string, columnId: string, event: Event) => {
    setAnswerValue(questionId, columnId, (event.target as HTMLInputElement).value)
  }

  const setNumberAnswerFromEvent = (questionId: string, columnId: string, event: Event) => {
    setAnswerValue(questionId, columnId, (event.target as HTMLInputElement).value)
  }

  const setBooleanAnswerFromEvent = (questionId: string, columnId: string, event: Event) => {
    setAnswerValue(questionId, columnId, (event.target as HTMLInputElement).checked)
  }

  const saveAnswers = (questionId: string) => {
    const question = getQuestion(questionId)
    const category = checklistVm.view.categories.find((item) => item.id === question?.categoryId)

    if (!question || !category) {
      return false
    }

    const values: Record<string, ChecklistQuestionValue> = {}

    category.columns.forEach((column: ChecklistColumn) => {
      const answerKey = `${question.id}:${column.id}`
      const rawValue = view.answers[answerKey]
      const fallbackValue = question.values?.[column.id]

      values[column.id] = rawValue ?? fallbackValue ?? ''
    })

    question.values = values

    if (!view.savedQuestionIds.includes(question.id)) {
      view.savedQuestionIds.push(question.id)
    }

    return true
  }

  const saveAllAnswers = () => {
    questionGroups.value.forEach((group) => {
      group.questions.forEach((question) => {
        saveAnswers(question.id)
      })
    })

    return true
  }

  return {
    view,
    categories,
    categoryCount,
    totalQuestions,
    completedQuestions,
    progressPercentage,
    infoItems,
    questionGroups,
    getFieldLayoutClass,
    helperCategoryResults,
    helperResults,
    isServiceColumn,
    getServiceAnswerValue,
    openHelperModal,
    closeHelperModal,
    updateHelperSearchFromEvent,
    updateSearch,
    updateSearchFromEvent,
    updateWorkDate,
    updateWorkDateFromEvent,
    goBack,
    getAnswerValue,
    setAnswerValue,
    setTextAnswerFromEvent,
    setNumberAnswerFromEvent,
    setBooleanAnswerFromEvent,
    saveAnswers,
    saveAllAnswers,
    scrollToQuestionTop,
    goToHelperQuestion,
    goToHelperCategory
  }
})
