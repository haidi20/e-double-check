<script setup lang="ts">
import { computed } from 'vue'
import { useShortcutsVm } from '../vm/useShortcutsVm'
import ShortcutRecorder from './ShortcutRecorder.vue'
import type { ShortcutCommand } from '../type/shortcutTypes'

const shortcutsVm = useShortcutsVm()

const categories = computed(() => [
  'all',
  ...new Set(shortcutsVm.commands.map((cmd) => cmd.category))
])

const filteredCommands = computed<ShortcutCommand[]>(() => {
  const query = shortcutsVm.settings.searchQuery.toLowerCase().trim()
  const category = shortcutsVm.settings.activeCategoryFilter

  return shortcutsVm.commands.filter((cmd) => {
    const matchesCategory = category === 'all' || cmd.category === category
    const matchesQuery =
      !query ||
      cmd.label.toLowerCase().includes(query) ||
      (shortcutsVm.getBindingFor(cmd.id) ?? '').toLowerCase().includes(query)
    return matchesCategory && matchesQuery
  })
})

const groupedCommands = computed(() => {
  const groups = new Map<string, ShortcutCommand[]>()
  for (const cmd of filteredCommands.value) {
    const list = groups.get(cmd.category) ?? []
    list.push(cmd)
    groups.set(cmd.category, list)
  }
  return Array.from(groups.entries())
})

function isRecording(commandId: string) {
  return shortcutsVm.settings.isRecording && shortcutsVm.settings.recordingCommandId === commandId
}

function startRecording(commandId: string) {
  shortcutsVm.settings.isRecording = true
  shortcutsVm.settings.recordingCommandId = commandId
  shortcutsVm.settings.lastConflict = null
}

function stopRecording() {
  shortcutsVm.settings.isRecording = false
  shortcutsVm.settings.recordingCommandId = null
}

function onSave(commandId: string, binding: string | null) {
  shortcutsVm.setBinding(commandId, binding)
  stopRecording()
}

function onReset(commandId: string) {
  shortcutsVm.resetBinding(commandId)
  stopRecording()
}
</script>

<template>
  <main class="feature-screen shortcut-settings-screen">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Pengaturan</p>
        <h2>Shortcut Keyboard</h2>
        <p>Kelola kombinasi tombol untuk aksi di aplikasi.</p>
      </div>
      <div class="button-row">
        <button type="button" class="ghost-button" @click="shortcutsVm.resetAll()">
          Reset Semua
        </button>
      </div>
    </section>

    <section class="panel">
      <div class="toolbar shortcut-settings-toolbar">
        <label>
          <span>Cari</span>
          <input
            v-model="shortcutsVm.settings.searchQuery"
            type="search"
            placeholder="Cari aksi atau shortcut..."
          />
        </label>
        <label>
          <span>Kategori</span>
          <select v-model="shortcutsVm.settings.activeCategoryFilter">
            <option value="all">Semua</option>
            <option v-for="cat in categories.filter((c) => c !== 'all')" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </label>
      </div>

      <div v-for="[category, cmds] in groupedCommands" :key="category" class="shortcut-group">
        <h3>{{ category }}</h3>
        <div class="shortcut-group__list">
          <template v-for="cmd in cmds" :key="cmd.id">
            <ShortcutRecorder
              v-if="isRecording(cmd.id)"
              :command-id="cmd.id"
              @save="(binding) => onSave(cmd.id, binding)"
              @cancel="stopRecording"
              @reset="() => onReset(cmd.id)"
            />
            <div v-else class="shortcut-row">
              <div class="shortcut-row__info">
                <strong>{{ cmd.label }}</strong>
                <small>{{ cmd.description }}</small>
              </div>
              <kbd class="shortcut-row__binding">
                {{ shortcutsVm.getBindingFor(cmd.id) ?? '—' }}
              </kbd>
              <span v-if="shortcutsVm.bindings[cmd.id]?.isCustom" class="shortcut-row__custom">
                custom
              </span>
              <button type="button" class="ghost-button" @click="startRecording(cmd.id)">
                Edit
              </button>
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>
