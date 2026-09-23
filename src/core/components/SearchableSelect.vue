<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type SelectOption =
  | string
  | {
      value: string
      label: string
      detail?: string
    }

const props = withDefaults(
  defineProps<{
    modelValue: string
    options?: SelectOption[]
    disabled?: boolean
    placeholder?: string
    searchPlaceholder?: string
  }>(),
  {
    disabled: false,
    options: () => [],
    placeholder: 'Pilih data',
    searchPlaceholder: 'Cari data'
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'change', value: Event): void
}>()

const rootRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const searchQuery = ref('')
const panelStyle = ref<Record<string, string>>({})
const opensUpward = ref(false)

const normalizedOptions = computed(() =>
  props.options.map((option) =>
    typeof option === 'string'
      ? { value: option, label: option, detail: '' }
      : { value: option.value, label: option.label, detail: option.detail || '' }
  )
)

const selectedOption = computed(() =>
  normalizedOptions.value.find((option) => option.value === props.modelValue)
)

const filteredOptions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return normalizedOptions.value
  }

  return normalizedOptions.value.filter((option) =>
    `${option.label} ${option.value} ${option.detail}`.toLowerCase().includes(query)
  )
})

const close = () => {
  isOpen.value = false
  searchQuery.value = ''
}

const updatePanelPosition = () => {
  const button = buttonRef.value

  if (!button) {
    return
  }

  const rect = button.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  const shouldFlip = spaceBelow < 260 && spaceAbove > spaceBelow

  opensUpward.value = shouldFlip
  panelStyle.value = {
    left: `${Math.max(8, Math.min(rect.left, window.innerWidth - 300))}px`,
    width: `${rect.width}px`,
    ...(shouldFlip
      ? { bottom: `${window.innerHeight - rect.top + 6}px` }
      : { top: `${rect.bottom + 6}px` })
  }
}

const handleWindowChange = () => {
  if (isOpen.value) {
    updatePanelPosition()
  }
}

const toggle = async () => {
  if (props.disabled) {
    return
  }

  isOpen.value = !isOpen.value

  if (isOpen.value) {
    await nextTick()
    updatePanelPosition()
    await nextTick()
    searchInputRef.value?.focus()
  }
}

const selectOption = (value: string) => {
  emit('update:modelValue', value)
  emit('change', { target: { value } } as unknown as Event)
  close()
}

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node

  if (!rootRef.value?.contains(target) && !(target instanceof Element && target.closest('.search-select__panel'))) {
    close()
  }
}

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      close()
    }
  }
)

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  window.addEventListener('scroll', handleWindowChange, true)
  window.addEventListener('resize', handleWindowChange)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  window.removeEventListener('scroll', handleWindowChange, true)
  window.removeEventListener('resize', handleWindowChange)
})
</script>

<template>
  <div ref="rootRef" class="search-select" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">
    <button ref="buttonRef" type="button" class="search-select__button" :disabled="disabled" @click="toggle">
      <span>{{ selectedOption?.label || placeholder }}</span>
      <svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <Teleport to="body">
      <div v-if="isOpen" class="search-select__panel" :class="{ 'is-flipped': opensUpward }" :style="panelStyle">
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="search"
          :placeholder="searchPlaceholder"
        />
        <div class="search-select__list" role="listbox">
          <button
            v-for="option in filteredOptions"
            :key="option.value"
            type="button"
            :class="{ 'is-selected': option.value === modelValue }"
            @click="selectOption(option.value)"
          >
            <span class="search-select__option-text">
              <strong>{{ option.label }}</strong>
              <small v-if="option.detail">{{ option.detail }}</small>
            </span>
            <svg v-if="option.value === modelValue" class="search-select__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m5 13 4 4L19 7" />
            </svg>
          </button>
          <p v-if="filteredOptions.length === 0">Data tidak ditemukan</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>