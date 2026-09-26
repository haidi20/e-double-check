<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShortcutsVm } from '../vm/useShortcutsVm'
import { getShortcutHandler } from '../vm/shortcutHandlers'
import ShortcutRecorder from './ShortcutRecorder.vue'
import type { ShortcutCommand } from '../type/shortcutTypes'

const shortcutsVm = useShortcutsVm()
const router = useRouter()
const searchInput = ref<HTMLInputElement | null>(null)
const editingCommandId = ref<string | null>(null)

function fuzzyMatch(text: string, query: string): boolean {
  if (!query) return true
  let textIndex = 0
  for (const char of query.toLowerCase()) {
    textIndex = text.toLowerCase().indexOf(char, textIndex)
    if (textIndex === -1) return false
    textIndex++
  }
  return true
}

function highlightLabel(label: string, query: string): string {
  if (!query) return label
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return label.replace(
    new RegExp(`(${escaped.split('').join('|')})`, 'gi'),
    '<mark>$1</mark>'
  )
}

const filteredCommands = computed<ShortcutCommand[]>(() => {
  const query = shortcutsVm.cheatSheet.searchQuery.trim()
  if (!query) return shortcutsVm.commands
  return shortcutsVm.commands.filter(
    (cmd) => fuzzyMatch(cmd.label, query) || fuzzyMatch(cmd.category, query)
  )
})

const activeIndex = computed(() =>
  filteredCommands.value.findIndex((cmd) => cmd.id === shortcutsVm.cheatSheet.activeId)
)

function setActive(id: string) {
  shortcutsVm.cheatSheet.activeId = id
}

function moveActive(delta: number) {
  if (filteredCommands.value.length === 0) return
  let index = activeIndex.value + delta
  if (index < 0) index = filteredCommands.value.length - 1
  if (index >= filteredCommands.value.length) index = 0
  shortcutsVm.cheatSheet.activeId = filteredCommands.value[index].id
}

async function executeCommand(command: ShortcutCommand) {
  if (command.routePath) {
    await router.push(command.routePath)
    return
  }
  const handler = getShortcutHandler(command.handler)
  if (handler) await handler()
}

async function executeActive() {
  const command = filteredCommands.value[activeIndex.value]
  if (!command) return
  await executeCommand(command)
}

function startEditing(commandId: string) {
  editingCommandId.value = commandId
}

function stopEditing() {
  editingCommandId.value = null
  nextTick(() => searchInput.value?.focus())
}

function saveBinding(commandId: string, binding: string | null) {
  shortcutsVm.setBinding(commandId, binding)
  stopEditing()
}

function resetBinding(commandId: string) {
  shortcutsVm.resetBinding(commandId)
  stopEditing()
}

function handleKeydown(event: KeyboardEvent) {
  if (editingCommandId.value) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      moveActive(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveActive(-1)
      break
    case 'Enter':
      event.preventDefault()
      void executeActive()
      break
    case 'Escape':
      router.back()
      break
  }
}

onMounted(() => {
  shortcutsVm.cheatSheet.searchQuery = ''
  shortcutsVm.cheatSheet.activeId = filteredCommands.value[0]?.id ?? null
  nextTick(() => searchInput.value?.focus())
})
</script>

<template>
  <main class="cheatsheet-screen" @keydown="handleKeydown">
    <div class="cheatsheet-shell">
      <label class="cheatsheet-search">
        <svg class="cheatsheet-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref="searchInput"
          v-model="shortcutsVm.cheatSheet.searchQuery"
          type="search"
          placeholder="Cari aksi atau shortcut..."
          aria-label="Cari command"
          role="combobox"
          aria-expanded="true"
          :aria-activedescendant="shortcutsVm.cheatSheet.activeId ?? undefined"
          @keydown="handleKeydown"
        />
        <kbd class="cheatsheet-search__hint">Esc</kbd>
      </label>

      <div class="cheatsheet-body">
        <ul class="cheatsheet-list" role="listbox" aria-label="Daftar shortcut">
          <template v-for="cmd in filteredCommands" :key="cmd.id">
            <li
              v-if="editingCommandId !== cmd.id"
              :id="cmd.id"
              :class="{ 'is-active': cmd.id === shortcutsVm.cheatSheet.activeId }"
              role="option"
              :aria-selected="cmd.id === shortcutsVm.cheatSheet.activeId"
              @click="startEditing(cmd.id)"
              @mouseenter="setActive(cmd.id)"
            >
              <div class="cheatsheet-row__left">
                <span class="cheatsheet-label" v-html="highlightLabel(cmd.label, shortcutsVm.cheatSheet.searchQuery)"></span>
                <span class="cheatsheet-description">{{ cmd.description }}</span>
              </div>
              <kbd class="cheatsheet-binding">{{ shortcutsVm.getBindingFor(cmd.id) ?? '' }}</kbd>
              <svg class="cheatsheet-edit__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </li>
            <li v-else class="cheatsheet-row--editing">
              <div class="cheatsheet-row__left">
                <span class="cheatsheet-label">{{ cmd.label }}</span>
              </div>
              <div class="cheatsheet-editor">
                <ShortcutRecorder
                  :command-id="cmd.id"
                  @save="(binding: string | null) => saveBinding(cmd.id, binding)"
                  @cancel="stopEditing"
                  @reset="() => resetBinding(cmd.id)"
                />
              </div>
            </li>
          </template>
          <li v-if="filteredCommands.length === 0 && !editingCommandId" class="cheatsheet-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M8 11h6" />
            </svg>
            <span>Tidak ada hasil yang cocok</span>
          </li>
        </ul>
      </div>

      <footer class="cheatsheet-footer">
        <span><kbd>Klik</kbd> ubah binding</span>
        <span><kbd>↑</kbd><kbd>↓</kbd> navigasi</span>
        <span><kbd>Enter</kbd> eksekusi</span>
        <span><kbd>Esc</kbd> kembali</span>
      </footer>
    </div>
  </main>
</template>
