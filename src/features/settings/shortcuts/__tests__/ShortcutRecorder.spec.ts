import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import ShortcutRecorder from '../screen/ShortcutRecorder.vue'
import { useShortcutsVm } from '../vm/useShortcutsVm'

describe('ShortcutRecorder', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('renders input with placeholder', () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toContain('Tekan kombinasi')
    wrapper.unmount()
  })

  it('captures keybinding from keydown event', async () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    const input = wrapper.find('input')

    await input.trigger('keydown', { ctrlKey: true, shiftKey: true, key: 'D' })
    expect((input.element as HTMLInputElement).value).toBe('Ctrl+Shift+D')
    wrapper.unmount()
  })

  it('emits cancel on Escape key', async () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('cancel')).toBeTruthy()
    wrapper.unmount()
  })

  it('disables save button when binding has no modifier', async () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    await wrapper.find('input').trigger('keydown', { key: 'a' })

    const saveBtn = wrapper.findAll('button')[0]
    expect((saveBtn.element as HTMLButtonElement).disabled).toBe(true)
    wrapper.unmount()
  })

  it('enables save button when binding has modifier', async () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    await wrapper.find('input').trigger('keydown', { ctrlKey: true, key: 'a' })

    const saveBtn = wrapper.findAll('button')[0]
    expect((saveBtn.element as HTMLButtonElement).disabled).toBe(false)
    wrapper.unmount()
  })

  it('allows F-key without modifier', async () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    await wrapper.find('input').trigger('keydown', { key: 'F5' })

    const saveBtn = wrapper.findAll('button')[0]
    expect((saveBtn.element as HTMLButtonElement).disabled).toBe(false)
    wrapper.unmount()
  })

  it('shows conflict warning when binding matches another command', async () => {
    const vm = useShortcutsVm()
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.questions' } })
    await wrapper.find('input').trigger('keydown', { altKey: true, key: '1' })

    const conflict = wrapper.find('.shortcut-recorder__conflict')
    expect(conflict.exists()).toBe(true)
    expect(conflict.text()).toContain('Dashboard')
    wrapper.unmount()
  })

  it('emits save with captured binding on save click', async () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    await wrapper.find('input').trigger('keydown', { ctrlKey: true, altKey: true, key: 'X' })
    await wrapper.findAll('button')[0].trigger('click')

    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')![0][0]).toBe('Ctrl+Alt+X')
    wrapper.unmount()
  })

  it('emits cancel on cancel button click', async () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
    wrapper.unmount()
  })

  it('emits reset on reset button click', async () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    await wrapper.findAll('button')[2].trigger('click')
    expect(wrapper.emitted('reset')).toBeTruthy()
    wrapper.unmount()
  })

  it('does not show conflict when binding matches the same command', async () => {
    const wrapper = mount(ShortcutRecorder, { props: { commandId: 'nav.dashboard' } })
    await wrapper.find('input').trigger('keydown', { altKey: true, key: '1' })

    expect(wrapper.find('.shortcut-recorder__conflict').exists()).toBe(false)
    wrapper.unmount()
  })
})
