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
const searchInputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const searchQuery = ref('')

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

const toggle = async () => {
  if (props.disabled) {
    return
  }

  isOpen.value = !isOpen.value

  if (isOpen.value) {
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
  if (!rootRef.value?.contains(event.target as Node)) {
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
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div ref="rootRef" class="search-select" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">
    <button type="button" class="search-select__button" :disabled="disabled" @click="toggle">
      <span>{{ selectedOption?.label || placeholder }}</span>
      <svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div v-if="isOpen" class="search-select__panel">
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
          <strong>{{ option.label }}</strong>
          <small v-if="option.detail">{{ option.detail }}</small>
        </button>
        <p v-if="filteredOptions.length === 0">Data tidak ditemukan</p>
      </div>
    </div>
  </div>
</template>
