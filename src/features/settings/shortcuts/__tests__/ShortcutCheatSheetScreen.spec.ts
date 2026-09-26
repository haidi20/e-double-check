import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import ShortcutCheatSheetScreen from '../screen/ShortcutCheatSheetScreen.vue'
import { useShortcutsVm } from '../vm/useShortcutsVm'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'dashboard', component: { template: '<div />' } },
      { path: '/shortcuts', name: 'shortcuts', component: { template: '<div />' } }
    ]
  })
}

async function mountScreen() {
  const router = createTestRouter()
  await router.push('/shortcuts')
  await router.isReady()

  const wrapper = mount(ShortcutCheatSheetScreen, { global: { plugins: [router] } })
  await flushPromises()
  return wrapper
}

describe('ShortcutCheatSheetScreen', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('renders search input and command list', async () => {
    const wrapper = await mountScreen()
    expect(wrapper.find('.cheatsheet-search input').exists()).toBe(true)
    expect(wrapper.findAll('.cheatsheet-list li').length).toBeGreaterThan(0)
    wrapper.unmount()
  })

  it('shows all commands by default', async () => {
    const vm = useShortcutsVm()
    const wrapper = await mountScreen()
    expect(wrapper.findAll('.cheatsheet-list li:not(.cheatsheet-empty)').length).toBe(vm.commands.length)
    wrapper.unmount()
  })

  it('filters commands by search query', async () => {
    const wrapper = await mountScreen()
    const input = wrapper.find('.cheatsheet-search input')
    await input.setValue('Dashboard')

    const rows = wrapper.findAll('.cheatsheet-list li:not(.cheatsheet-empty)')
    expect(rows.length).toBeGreaterThanOrEqual(1)
    expect(rows[0].text()).toContain('Dashboard')
    wrapper.unmount()
  })

  it('shows empty state when no results match', async () => {
    const wrapper = await mountScreen()
    await wrapper.find('.cheatsheet-search input').setValue('zzz-nonexistent')
    expect(wrapper.find('.cheatsheet-empty').exists()).toBe(true)
    wrapper.unmount()
  })

  it('highlights matching characters with mark tag', async () => {
    const wrapper = await mountScreen()
    await wrapper.find('.cheatsheet-search input').setValue('Das')

    const mark = wrapper.find('.cheatsheet-label mark')
    expect(mark.exists()).toBe(true)
    wrapper.unmount()
  })

  it('opens recorder when a row is clicked', async () => {
    const wrapper = await mountScreen()
    const firstRow = wrapper.find('.cheatsheet-list li:not(.cheatsheet-empty)')
    await firstRow.trigger('click')

    expect(wrapper.find('.shortcut-recorder').exists()).toBe(true)
    wrapper.unmount()
  })

  it('closes recorder on cancel', async () => {
    const wrapper = await mountScreen()
    await wrapper.find('.cheatsheet-list li:not(.cheatsheet-empty)').trigger('click')
    expect(wrapper.find('.shortcut-recorder').exists()).toBe(true)

    await wrapper.findAll('button').find(b => b.text() === '✕')!.trigger('click')
    expect(wrapper.find('.shortcut-recorder').exists()).toBe(false)
    wrapper.unmount()
  })

  it('displays footer keyboard hints', async () => {
    const wrapper = await mountScreen()
    const footer = wrapper.find('.cheatsheet-footer')
    expect(footer.text()).toContain('navigasi')
    expect(footer.text()).toContain('eksekusi')
    expect(footer.text()).toContain('kembali')
    wrapper.unmount()
  })
})
