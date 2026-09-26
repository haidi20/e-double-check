import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount, flushPromises } from '@vue/test-utils'
import ShortcutSettingsScreen from '../screen/ShortcutSettingsScreen.vue'
import { useShortcutsVm } from '../vm/useShortcutsVm'

async function mountScreen() {
  const wrapper = mount(ShortcutSettingsScreen)
  await flushPromises()
  return wrapper
}

describe('ShortcutSettingsScreen', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('renders heading and reset button', async () => {
    const wrapper = await mountScreen()
    expect(wrapper.find('h2').text()).toContain('Shortcut')
    expect(wrapper.find('.button-row .ghost-button').exists()).toBe(true)
    wrapper.unmount()
  })

  it('renders commands grouped by category', async () => {
    const vm = useShortcutsVm()
    const wrapper = await mountScreen()
    const groups = wrapper.findAll('.shortcut-group')
    const categories = [...new Set(vm.commands.map(c => c.category))]
    expect(groups.length).toBe(categories.length)
    wrapper.unmount()
  })

  it('shows binding for each command', async () => {
    const vm = useShortcutsVm()
    const wrapper = await mountScreen()
    const bindings = wrapper.findAll('.shortcut-row__binding')
    expect(bindings.length).toBe(vm.commands.length)
    wrapper.unmount()
  })

  it('filters commands by search query', async () => {
    const wrapper = await mountScreen()
    const searchInput = wrapper.find('input[type="search"]')
    await searchInput.setValue('Pegawai')

    const rows = wrapper.findAll('.shortcut-row')
    expect(rows.length).toBeGreaterThanOrEqual(1)
    expect(rows[0].text()).toContain('Pegawai')
    wrapper.unmount()
  })

  it('filters commands by category', async () => {
    const wrapper = await mountScreen()
    const select = wrapper.find('select')
    await select.setValue('Global')

    const rows = wrapper.findAll('.shortcut-row')
    const vm = useShortcutsVm()
    const globalCount = vm.commands.filter(c => c.category === 'Global').length
    expect(rows.length).toBe(globalCount)
    wrapper.unmount()
  })

  it('opens recorder when Edit button is clicked', async () => {
    const wrapper = await mountScreen()
    await wrapper.find('.shortcut-row .ghost-button').trigger('click')
    expect(wrapper.find('.shortcut-recorder').exists()).toBe(true)
    wrapper.unmount()
  })

  it('closes recorder and saves binding', async () => {
    const wrapper = await mountScreen()
    await wrapper.find('.shortcut-row .ghost-button').trigger('click')

    const recorder = wrapper.find('.shortcut-recorder')
    await recorder.find('input').trigger('keydown', { ctrlKey: true, altKey: true, key: 'Y' })
    await recorder.findAll('button')[0].trigger('click')

    const vm = useShortcutsVm()
    expect(vm.getBindingFor('nav.dashboard')).toBe('Ctrl+Alt+Y')
    expect(wrapper.find('.shortcut-recorder').exists()).toBe(false)
    wrapper.unmount()
  })

  it('shows custom badge after setting custom binding', async () => {
    const vm = useShortcutsVm()
    vm.setBinding('nav.dashboard', 'Ctrl+Alt+Z')

    const wrapper = await mountScreen()
    expect(wrapper.find('.shortcut-row__custom').exists()).toBe(true)
    wrapper.unmount()
  })

  it('resetAll restores all default bindings', async () => {
    const vm = useShortcutsVm()
    vm.setBinding('nav.dashboard', 'Ctrl+Alt+Z')
    vm.setBinding('nav.questions', 'Ctrl+Alt+W')

    const wrapper = await mountScreen()
    await wrapper.find('.button-row .ghost-button').trigger('click')

    expect(vm.getBindingFor('nav.dashboard')).toBe('Alt+1')
    expect(vm.getBindingFor('nav.questions')).toBe('Alt+2')
    wrapper.unmount()
  })
})
