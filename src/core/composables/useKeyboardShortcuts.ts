import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShortcutsVm } from '@/features/settings/shortcuts/vm/useShortcutsVm'
import { getShortcutHandler } from '@/features/settings/shortcuts/vm/shortcutHandlers'
import type { ShortcutCommand } from '@/features/settings/shortcuts/type/shortcutTypes'

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

function getActiveModalElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-shortcut-modal="true"]:not([hidden])')
}

function getFocusableElements(modal: HTMLElement): HTMLElement[] {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ')

  return Array.from(modal.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => el.style.display !== 'none' && !el.hasAttribute('hidden')
  )
}

function trapFocusInModal(event: KeyboardEvent, modal: HTMLElement) {
  const focusable = getFocusableElements(modal)
  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement as HTMLElement

  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

function executeFormSave(modal: HTMLElement) {
  const saveBtn = modal.querySelector<HTMLButtonElement>(
    'button[type="submit"], .feature-form-modal__actions .primary-button, .feature-form-modal__footer .primary-button'
  )
  saveBtn?.click()
}

function executeFormClose(modal: HTMLElement) {
  const closeBtn = modal.querySelector<HTMLButtonElement>(
    '.feature-form-modal__header .ghost-button, button[aria-label*="Tutup"]'
  )
  closeBtn?.click()
}

export function useKeyboardShortcuts() {
  const shortcutsVm = useShortcutsVm()
  const route = useRoute()
  const router = useRouter()

  let pendingChord: string | null = null
  let chordTimeout: ReturnType<typeof setTimeout> | null = null

  function buildBindingString(event: KeyboardEvent): string {
    const parts: string[] = []
    if (event.ctrlKey || event.metaKey) parts.push('Ctrl')
    if (event.altKey) parts.push('Alt')
    if (event.shiftKey) parts.push('Shift')

    let key = event.key
    if (key === ' ') key = 'Space'
    if (key.length === 1) key = key.toUpperCase()
    parts.push(key)

    return parts.join('+')
  }

  async function executeCommand(command: ShortcutCommand) {
    if (command.scope === 'page' && command.pageContext) {
      if (route.name === command.pageContext) {
        const handler = getShortcutHandler(command.handler)
        if (handler) await handler()
        return
      }

      shortcutsVm.setPendingPageAction(command.id)
      if (command.routePath) {
        await router.push(command.routePath)
      }
      return
    }

    const handler = getShortcutHandler(command.handler)
    if (handler) await handler()
  }

  function handleKeyDown(event: KeyboardEvent) {
    const activeModal = getActiveModalElement()

    if (activeModal) {
      if (event.key === 'Tab') {
        trapFocusInModal(event, activeModal)
        return
      }

      // Allow page.form.save and page.form.close through when modal is open
      const binding = buildBindingString(event)
      const modalCommand = shortcutsVm.getCommandFor(binding)
      const isFormShortcut =
        modalCommand?.id === 'page.form.save' || modalCommand?.id === 'page.form.close'

      if (!isFormShortcut) return

      event.preventDefault()
      if (modalCommand?.id === 'page.form.save') {
        executeFormSave(activeModal)
      } else {
        executeFormClose(activeModal)
      }
      return
    }

    // Skip when typing in editable fields (except Escape and F-keys)
    const isEditable = isEditableTarget(event.target)
    const isAllowedInEditable = event.key === 'Escape' || event.key.startsWith('F') && event.key.length > 1
    if (isEditable && !isAllowedInEditable) return

    // Build binding string (with chord support)
    const binding = buildBindingString(event)

    let fullBinding = binding
    if (pendingChord) {
      fullBinding = `${pendingChord} ${binding}`
    }

    // Check for chord prefix match
    const isChordPrefix = shortcutsVm.commands.some((cmd) => {
      const cmdBinding = shortcutsVm.getBindingFor(cmd.id)
      return cmdBinding?.startsWith(fullBinding + ' ') ?? false
    })

    if (isChordPrefix) {
      pendingChord = fullBinding
      if (chordTimeout) clearTimeout(chordTimeout)
      chordTimeout = setTimeout(() => { pendingChord = null }, 1000)
      event.preventDefault()
      return
    }

    pendingChord = null
    if (chordTimeout) clearTimeout(chordTimeout)

    const command = shortcutsVm.getCommandFor(fullBinding)
    if (!command) return

    event.preventDefault()
    void executeCommand(command)
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
}
