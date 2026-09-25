import { onMounted, onUnmounted } from 'vue'
import {
  registerShortcutHandler,
  unregisterShortcutHandler
} from '@/features/settings/shortcuts/vm/shortcutHandlers'

interface FormModalShortcutOptions {
  onSave?: () => void
  onClose?: () => void
}

export function useFormModalShortcuts(options: FormModalShortcutOptions = {}) {
  const { onSave, onClose } = options

  onMounted(() => {
    if (onSave) registerShortcutHandler('page.form.save', onSave)
    if (onClose) registerShortcutHandler('page.form.close', onClose)
  })

  onUnmounted(() => {
    if (onSave) unregisterShortcutHandler('page.form.save')
    if (onClose) unregisterShortcutHandler('page.form.close')
  })
}
