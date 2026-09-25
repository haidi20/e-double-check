<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useShortcutsVm } from '../vm/useShortcutsVm'

const props = defineProps<{ commandId: string }>()
const emit = defineEmits<{
  (e: 'save', binding: string | null): void
  (e: 'cancel'): void
  (e: 'reset'): void
}>()

const shortcutsVm = useShortcutsVm()
const recorderInput = ref<HTMLInputElement | null>(null)
const capturedBinding = ref<string | null>(null)
const isCapturing = ref(false)

const conflictCommand = computed(() => {
  if (!capturedBinding.value) return undefined
  return shortcutsVm.detectConflict(capturedBinding.value, props.commandId)
})

const isValid = computed(() => {
  if (!capturedBinding.value) return false
  // Must have at least one modifier or be an F-key
  const parts = capturedBinding.value.split('+')
  const hasModifier = parts.some((p) => ['Ctrl', 'Alt', 'Shift'].includes(p))
  const isFKey = /^F\d{1,2}$/.test(parts[parts.length - 1] ?? '')
  return hasModifier || isFKey
})

function handleKeydown(event: KeyboardEvent) {
  event.preventDefault()
  event.stopPropagation()

  if (event.key === 'Escape') {
    emit('cancel')
    return
  }

  const binding = shortcutsVm.buildBindingFromEvent(event)
  if (binding) {
    capturedBinding.value = binding
  }
}

function save() {
  if (!isValid.value) return
  emit('save', capturedBinding.value)
}

onMounted(() => {
  isCapturing.value = true
  recorderInput.value?.focus()
})

onUnmounted(() => {
  isCapturing.value = false
})
</script>

<template>
  <div class="shortcut-recorder">
    <input
      ref="recorderInput"
      class="shortcut-recorder__input"
      :value="capturedBinding ?? ''"
      placeholder="Tekan kombinasi tombol..."
      readonly
      @keydown="handleKeydown"
    />
    <span v-if="conflictCommand" class="shortcut-recorder__conflict">
      Konflik: {{ conflictCommand.label }}
    </span>
    <button type="button" class="ghost-button" :disabled="!isValid" @click="save">✓</button>
    <button type="button" class="ghost-button" @click="emit('cancel')">✕</button>
    <button type="button" class="ghost-button" title="Reset ke default" @click="emit('reset')">↺</button>
  </div>
</template>
