import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { usePageShortcuts } from '../usePageShortcuts'
import { useShortcutsVm } from '@/features/settings/shortcuts/vm/useShortcutsVm'
import { getShortcutHandler } from '@/features/settings/shortcuts/vm/shortcutHandlers'

function createTestComponent(entries: { commandId: string; handler: () => void }[]) {
  return defineComponent({
    setup() {
      usePageShortcuts(entries)
      return () => h('div', 'test')
    }
  })
}

describe('usePageShortcuts', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('registers handler on mount', () => {
    const handler = vi.fn()
    const TestComp = createTestComponent([
      { commandId: 'page.employees.new', handler }
    ])

    mount(TestComp)

    const registered = getShortcutHandler('page.employees.new')
    expect(registered).toBeDefined()
    registered!()
    expect(handler).toHaveBeenCalledOnce()
  })

  it('consumes pending page action on mount', () => {
    const shortcutsVm = useShortcutsVm()
    shortcutsVm.setPendingPageAction('page.employees.new')

    const handler = vi.fn()
    const TestComp = createTestComponent([
      { commandId: 'page.employees.new', handler }
    ])

    mount(TestComp)

    expect(handler).toHaveBeenCalledOnce()
    expect(shortcutsVm.consumePendingPageAction()).toBeNull()
  })

  it('does not consume pending action if it does not match any entry', () => {
    const shortcutsVm = useShortcutsVm()
    shortcutsVm.setPendingPageAction('page.services.new')

    const handler = vi.fn()
    const TestComp = createTestComponent([
      { commandId: 'page.employees.new', handler }
    ])

    mount(TestComp)

    expect(handler).not.toHaveBeenCalled()
    expect(shortcutsVm.consumePendingPageAction()).toBeNull()
  })

  it('unregisters handler on unmount', async () => {
    const handler = vi.fn()
    const TestComp = createTestComponent([
      { commandId: 'page.employees.new', handler }
    ])

    const wrapper = mount(TestComp)
    expect(getShortcutHandler('page.employees.new')).toBeDefined()

    wrapper.unmount()
    expect(getShortcutHandler('page.employees.new')).toBeUndefined()
  })
})
