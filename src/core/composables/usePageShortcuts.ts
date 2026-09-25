import { onMounted, onUnmounted } from 'vue'
import { useShortcutsVm } from '@/features/settings/shortcuts/vm/useShortcutsVm'
import {
  registerShortcutHandler,
  unregisterShortcutHandler
} from '@/features/settings/shortcuts/vm/shortcutHandlers'

interface PageShortcutEntry {
  commandId: string
  handler: () => void
}

export function usePageShortcuts(entries: PageShortcutEntry[]) {
  const shortcutsVm = useShortcutsVm()

  onMounted(() => {
    entries.forEach(({ commandId, handler }) => {
      registerShortcutHandler(commandId, handler)
    })

    const pending = shortcutsVm.consumePendingPageAction()
    if (pending) {
      const match = entries.find((entry) => entry.commandId === pending)
      match?.handler()
    }
  })

  onUnmounted(() => {
    entries.forEach(({ commandId }) => {
      unregisterShortcutHandler(commandId)
    })
  })
}
