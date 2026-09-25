import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import {
  STORAGE_KEY,
  STORAGE_VERSION,
  shortcutCommands
} from '../state/shortcutsState'
import type {
  ShortcutBinding,
  ShortcutCommand,
  StoredBindings
} from '../type/shortcutTypes'

function loadOverrides(): Record<string, string | null> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as StoredBindings
    if (parsed.version !== STORAGE_VERSION) return {}
    return parsed.overrides ?? {}
  } catch {
    return {}
  }
}

function saveOverrides(overrides: Record<string, string | null>) {
  try {
    const payload: StoredBindings = { version: STORAGE_VERSION, overrides }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Silently fail
  }
}

function normalizeKeybinding(event: KeyboardEvent): string | null {
  const parts: string[] = []
  if (event.ctrlKey || event.metaKey) parts.push('Ctrl')
  if (event.altKey) parts.push('Alt')
  if (event.shiftKey) parts.push('Shift')

  let key = event.key
  if (key === ' ') key = 'Space'
  if (key.length === 1) key = key.toUpperCase()

  // If only modifiers were pressed, don't produce a binding yet
  if (['Control', 'Shift', 'Alt', 'Meta'].includes(event.key)) return null

  parts.push(key)
  return parts.join('+')
}

export const useShortcutsVm = defineStore('shortcutsVm', () => {
  const settings = reactive({
    isRecording: false,
    recordingCommandId: null as string | null,
    lastConflict: null as string | null,
    searchQuery: '',
    activeCategoryFilter: 'all',
    pendingPageAction: null as string | null
  })

  const cheatSheet = reactive({
    searchQuery: '',
    activeId: null as string | null
  })

  const overrides = ref<Record<string, string | null>>(loadOverrides())

  const commands = shortcutCommands

  const bindings = computed<Record<string, ShortcutBinding>>(() => {
    const result: Record<string, ShortcutBinding> = {}
    for (const cmd of commands) {
      const override = overrides.value[cmd.id]
      const isCustom = override !== undefined
      result[cmd.id] = {
        commandId: cmd.id,
        binding: override !== undefined ? override : cmd.defaultBinding,
        isCustom
      }
    }
    return result
  })

  const bindingMap = computed<Map<string, string>>(() => {
    const map = new Map<string, string>()
    for (const [commandId, binding] of Object.entries(bindings.value)) {
      if (binding.binding) {
        map.set(binding.binding, commandId)
      }
    }
    return map
  })

  function getBindingFor(commandId: string): string | null {
    return bindings.value[commandId]?.binding ?? null
  }

  function getCommandFor(binding: string): ShortcutCommand | undefined {
    const commandId = bindingMap.value.get(binding)
    if (!commandId) return undefined
    return commands.find((cmd) => cmd.id === commandId)
  }

  function detectConflict(binding: string, excludeCommandId?: string): ShortcutCommand | undefined {
    for (const [commandId, bindingData] of Object.entries(bindings.value)) {
      if (commandId === excludeCommandId) continue
      if (bindingData.binding !== null && bindingData.binding === binding) {
        return commands.find((cmd) => cmd.id === commandId)
      }
    }
    return undefined
  }

  function setBinding(commandId: string, binding: string | null) {
    const conflict = binding !== null ? detectConflict(binding, commandId) : undefined
    settings.lastConflict = conflict ? conflict.id : null

    if (binding === null || binding === commands.find((c) => c.id === commandId)?.defaultBinding) {
      delete overrides.value[commandId]
    } else {
      overrides.value[commandId] = binding
    }
    saveOverrides(overrides.value)
  }

  function resetBinding(commandId: string) {
    delete overrides.value[commandId]
    saveOverrides(overrides.value)
  }

  function resetAll() {
    overrides.value = {}
    saveOverrides(overrides.value)
  }

  function setPendingPageAction(commandId: string | null) {
    settings.pendingPageAction = commandId
  }

  function consumePendingPageAction(): string | null {
    const pending = settings.pendingPageAction
    settings.pendingPageAction = null
    return pending
  }

  function buildBindingFromEvent(event: KeyboardEvent): string | null {
    return normalizeKeybinding(event)
  }

  return {
    settings,
    cheatSheet,
    commands,
    bindings,
    bindingMap,
    getBindingFor,
    getCommandFor,
    detectConflict,
    setBinding,
    resetBinding,
    resetAll,
    setPendingPageAction,
    consumePendingPageAction,
    buildBindingFromEvent
  }
})
