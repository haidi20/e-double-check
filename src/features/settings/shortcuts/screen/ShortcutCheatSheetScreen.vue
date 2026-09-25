<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShortcutsVm } from '../vm/useShortcutsVm'
import { getShortcutHandler } from '../vm/shortcutHandlers'
import type { ShortcutCommand } from '../type/shortcutTypes'

const shortcutsVm = useShortcutsVm()
const router = useRouter()
const searchInput = ref<HTMLInputElement | null>(null)

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

function handleKeydown(event: KeyboardEvent) {
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
  <main class="feature-screen cheatsheet-screen" @keydown="handleKeydown">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Referensi Cepat</p>
        <h2>Keyboard Shortcuts</h2>
        <p>Daftar semua aksi dan kombinasi tombol.</p>
      </div>
    </section>

    <section class="panel cheatsheet-panel">
      <label class="cheatsheet-search">
        <span aria-hidden="true">›</span>
        <input
          ref="searchInput"
          v-model="shortcutsVm.cheatSheet.searchQuery"
          type="search"
          placeholder="Cari command..."
          aria-label="Cari command"
          role="combobox"
          aria-expanded="true"
          :aria-activedescendant="shortcutsVm.cheatSheet.activeId ?? undefined"
          @keydown="handleKeydown"
        />
      </label>

      <ul class="cheatsheet-list" role="listbox" aria-label="Daftar shortcut">
        <li
          v-for="cmd in filteredCommands"
          :id="cmd.id"
          :key="cmd.id"
          :class="{ 'is-active': cmd.id === shortcutsVm.cheatSheet.activeId }"
          role="option"
          :aria-selected="cmd.id === shortcutsVm.cheatSheet.activeId"
          @click="executeCommand(cmd)"
          @mouseenter="setActive(cmd.id)"
        >
          <span class="cheatsheet-label" v-html="highlightLabel(cmd.label, shortcutsVm.cheatSheet.searchQuery)"></span>
          <span class="cheatsheet-category">— {{ cmd.category }}</span>
          <kbd class="cheatsheet-binding">{{ shortcutsVm.getBindingFor(cmd.id) ?? '' }}</kbd>
        </li>
        <li v-if="filteredCommands.length === 0" class="cheatsheet-empty">
          No matching commands
        </li>
      </ul>
    </section>
  </main>
</template>
