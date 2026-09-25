export type ShortcutHandler = () => void | Promise<void>

const handlers = new Map<string, ShortcutHandler>()

export function registerShortcutHandler(id: string, handler: ShortcutHandler) {
  handlers.set(id, handler)
}

export function unregisterShortcutHandler(id: string) {
  handlers.delete(id)
}

export function getShortcutHandler(id: string): ShortcutHandler | undefined {
  return handlers.get(id)
}
