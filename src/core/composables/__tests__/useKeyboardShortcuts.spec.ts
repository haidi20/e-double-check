import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useKeyboardShortcuts } from '../useKeyboardShortcuts'
import { useShortcutsVm } from '@/features/settings/shortcuts/vm/useShortcutsVm'
import {
  registerShortcutHandler,
  unregisterShortcutHandler
} from '@/features/settings/shortcuts/vm/shortcutHandlers'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'dashboard', component: { template: '<div />' } },
      { path: '/checklist', name: 'checklist', component: { template: '<div />' } },
      { path: '/layanan', name: 'services', component: { template: '<div />' } },
      { path: '/outlets', name: 'outlets', component: { template: '<div />' } },
      { path: '/employees', name: 'employees', component: { template: '<div />' } },
      { path: '/shortcuts', name: 'shortcuts', component: { template: '<div />' } }
    ]
  })
}

function createTestComponent() {
  return defineComponent({
    setup() {
      useKeyboardShortcuts()
      return () => h('div', { 'data-testid': 'host' }, 'engine')
    }
  })
}

function pressKey(options: KeyboardEventInit) {
  document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...options }))
}

describe('useKeyboardShortcuts', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.body.innerHTML = ''
  })

  it('dispatches navigation handler when Ctrl+1 is pressed', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const handler = vi.fn()
    registerShortcutHandler('nav.dashboard', handler)

    const wrapper = mount(createTestComponent(), { global: { plugins: [router] } })
    pressKey({ ctrlKey: true, key: '1' })
    await nextTick()

    expect(handler).toHaveBeenCalledOnce()
    wrapper.unmount()
    unregisterShortcutHandler('nav.dashboard')
  })

  it('ignores shortcut when focus is in an input field', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const handler = vi.fn()
    registerShortcutHandler('nav.dashboard', handler)

    const wrapper = mount(createTestComponent(), { global: { plugins: [router] } })

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ctrlKey: true, key: '1' }))
    await nextTick()

    expect(handler).not.toHaveBeenCalled()
    wrapper.unmount()
    unregisterShortcutHandler('nav.dashboard')
  })

  it('allows Escape in input fields', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const handler = vi.fn()
    registerShortcutHandler('page.form.close', handler)

    const wrapper = mount(createTestComponent(), { global: { plugins: [router] } })

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Escape' }))
    await nextTick()

    expect(handler).toHaveBeenCalledOnce()
    wrapper.unmount()
    unregisterShortcutHandler('page.form.close')
  })

  it('does not execute navigation shortcut when a modal is open', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const handler = vi.fn()
    registerShortcutHandler('nav.dashboard', handler)

    const wrapper = mount(createTestComponent(), { global: { plugins: [router] } })

    const modal = document.createElement('div')
    modal.setAttribute('data-shortcut-modal', 'true')
    document.body.appendChild(modal)

    pressKey({ ctrlKey: true, key: '1' })
    await nextTick()

    expect(handler).not.toHaveBeenCalled()
    wrapper.unmount()
    unregisterShortcutHandler('nav.dashboard')
  })

  it('traps Tab focus inside modal', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(createTestComponent(), { global: { plugins: [router] } })

    const modal = document.createElement('div')
    modal.setAttribute('data-shortcut-modal', 'true')
    modal.innerHTML = `
      <input id="first" />
      <button id="middle">Mid</button>
      <button id="last">Last</button>
    `
    document.body.appendChild(modal)

    const first = modal.querySelector<HTMLElement>('#first')!
    const middle = modal.querySelector('#middle') as HTMLElement
    const last = modal.querySelector('#last') as HTMLElement

    last.focus()
    pressKey({ key: 'Tab' })
    expect(document.activeElement).toBe(first)

    first.focus()
    pressKey({ key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(last)

    wrapper.unmount()
  })

  it('supports two-step chord (Ctrl+K then Ctrl+S)', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const handler = vi.fn()
    registerShortcutHandler('global.open-cheatsheet', handler)

    const wrapper = mount(createTestComponent(), { global: { plugins: [router] } })

    pressKey({ ctrlKey: true, key: 'k' })
    await nextTick()
    expect(handler).not.toHaveBeenCalled()

    pressKey({ ctrlKey: true, key: 's' })
    await nextTick()
    expect(handler).toHaveBeenCalledOnce()

    wrapper.unmount()
    unregisterShortcutHandler('global.open-cheatsheet')
  })

  it('executes page command handler when already on target page', async () => {
    const router = createTestRouter()
    await router.push('/employees')
    await router.isReady()

    const handler = vi.fn()
    registerShortcutHandler('page.employees.new', handler)

    const wrapper = mount(createTestComponent(), { global: { plugins: [router] } })

    pressKey({ ctrlKey: true, key: 'n' })
    await nextTick()

    expect(handler).toHaveBeenCalledOnce()
    wrapper.unmount()
    unregisterShortcutHandler('page.employees.new')
  })

  it('sets pending page action and navigates when not on target page', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const handler = vi.fn()
    registerShortcutHandler('page.employees.new', handler)

    const wrapper = mount(createTestComponent(), { global: { plugins: [router] } })
    const shortcutsVm = useShortcutsVm()

    pressKey({ ctrlKey: true, key: 'n' })
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/employees')
    expect(shortcutsVm.consumePendingPageAction()).toBe('page.employees.new')
    wrapper.unmount()
    unregisterShortcutHandler('page.employees.new')
  })

  it('does nothing when no binding matches', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const handler = vi.fn()
    registerShortcutHandler('nav.dashboard', handler)

    const wrapper = mount(createTestComponent(), { global: { plugins: [router] } })

    pressKey({ ctrlKey: true, altKey: true, shiftKey: true, key: 'z' })
    await nextTick()

    expect(handler).not.toHaveBeenCalled()
    wrapper.unmount()
    unregisterShortcutHandler('nav.dashboard')
  })
})
