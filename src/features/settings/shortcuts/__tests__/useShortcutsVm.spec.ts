import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShortcutsVm } from '../vm/useShortcutsVm'
import { STORAGE_KEY } from '../state/shortcutsState'

describe('useShortcutsVm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('returns default binding when no override exists', () => {
    const vm = useShortcutsVm()
    expect(vm.getBindingFor('nav.dashboard')).toBe('Alt+1')
    expect(vm.getBindingFor('nav.questions')).toBe('Alt+2')
    expect(vm.getBindingFor('global.open-cheatsheet')).toBe('Ctrl+K Ctrl+S')
    expect(vm.getBindingFor('page.employees.new')).toBe('Ctrl+N')
  })

  it('returns overridden binding after setBinding', () => {
    const vm = useShortcutsVm()
    vm.setBinding('nav.dashboard', 'Ctrl+Shift+D')
    expect(vm.getBindingFor('nav.dashboard')).toBe('Ctrl+Shift+D')
  })

  it('persists override to localStorage', () => {
    const vm = useShortcutsVm()
    vm.setBinding('nav.dashboard', 'Ctrl+Shift+D')

    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw!)
    expect(parsed.version).toBe(1)
    expect(parsed.overrides['nav.dashboard']).toBe('Ctrl+Shift+D')
  })

  it('loads overrides from localStorage on store init', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      overrides: { 'nav.dashboard': 'Alt+D' }
    }))

    const vm = useShortcutsVm()
    expect(vm.getBindingFor('nav.dashboard')).toBe('Alt+D')
    expect(vm.bindings['nav.dashboard']?.isCustom).toBe(true)
  })

  it('resetBinding restores default binding', () => {
    const vm = useShortcutsVm()
    vm.setBinding('nav.dashboard', 'Ctrl+Shift+D')
    expect(vm.getBindingFor('nav.dashboard')).toBe('Ctrl+Shift+D')

    vm.resetBinding('nav.dashboard')
    expect(vm.getBindingFor('nav.dashboard')).toBe('Alt+1')
    expect(vm.bindings['nav.dashboard']?.isCustom).toBe(false)
  })

  it('resetAll clears all overrides', () => {
    const vm = useShortcutsVm()
    vm.setBinding('nav.dashboard', 'Ctrl+Shift+D')
    vm.setBinding('nav.questions', 'Ctrl+Shift+Q')

    vm.resetAll()
    expect(vm.getBindingFor('nav.dashboard')).toBe('Alt+1')
    expect(vm.getBindingFor('nav.questions')).toBe('Alt+2')
  })

  it('setBinding with same value as default removes override', () => {
    const vm = useShortcutsVm()
    vm.setBinding('nav.dashboard', 'Ctrl+Shift+D')
    vm.setBinding('nav.dashboard', 'Alt+1')
    expect(vm.bindings['nav.dashboard']?.isCustom).toBe(false)
  })

  it('detectConflict finds conflicting command', () => {
    const vm = useShortcutsVm()
    const conflict = vm.detectConflict('Alt+1', 'nav.questions')
    expect(conflict).toBeDefined()
    expect(conflict!.id).toBe('nav.dashboard')
  })

  it('detectConflict excludes the same command', () => {
    const vm = useShortcutsVm()
    const conflict = vm.detectConflict('Alt+1', 'nav.dashboard')
    expect(conflict).toBeUndefined()
  })

  it('detectConflict returns undefined for unused binding', () => {
    const vm = useShortcutsVm()
    const conflict = vm.detectConflict('Ctrl+Shift+Z')
    expect(conflict).toBeUndefined()
  })

  it('setBinding sets lastConflict when there is a conflict', () => {
    const vm = useShortcutsVm()
    vm.setBinding('nav.questions', 'Alt+1')
    expect(vm.settings.lastConflict).toBe('nav.dashboard')
  })

  it('setBinding clears lastConflict when no conflict', () => {
    const vm = useShortcutsVm()
    vm.resetBinding('nav.dashboard')
    vm.setBinding('nav.questions', 'Ctrl+Shift+2')
    expect(vm.settings.lastConflict).toBeNull()
  })

  it('getCommandFor finds command by binding', () => {
    const vm = useShortcutsVm()
    const cmd = vm.getCommandFor('Alt+1')
    expect(cmd).toBeDefined()
    expect(cmd!.id).toBe('nav.dashboard')
  })

  it('getCommandFor returns undefined for unknown binding', () => {
    const vm = useShortcutsVm()
    expect(vm.getCommandFor('Ctrl+Shift+Z')).toBeUndefined()
  })

  it('setPendingPageAction and consumePendingPageAction', () => {
    const vm = useShortcutsVm()
    vm.setPendingPageAction('page.employees.new')
    expect(vm.consumePendingPageAction()).toBe('page.employees.new')
    expect(vm.consumePendingPageAction()).toBeNull()
  })

  it('buildBindingFromEvent normalizes keyboard event', () => {
    const vm = useShortcutsVm()

    const event = new KeyboardEvent('keydown', { ctrlKey: true, shiftKey: true, key: 'D' })
    expect(vm.buildBindingFromEvent(event)).toBe('Ctrl+Shift+D')

    const altEvent = new KeyboardEvent('keydown', { altKey: true, key: '1' })
    expect(vm.buildBindingFromEvent(altEvent)).toBe('Alt+1')

    const plainEvent = new KeyboardEvent('keydown', { key: 'a' })
    expect(vm.buildBindingFromEvent(plainEvent)).toBe('A')
  })

  it('buildBindingFromEvent returns null for modifier-only keypress', () => {
    const vm = useShortcutsVm()

    const ctrlOnly = new KeyboardEvent('keydown', { ctrlKey: true, key: 'Control' })
    expect(vm.buildBindingFromEvent(ctrlOnly)).toBeNull()

    const shiftOnly = new KeyboardEvent('keydown', { shiftKey: true, key: 'Shift' })
    expect(vm.buildBindingFromEvent(shiftOnly)).toBeNull()
  })

  it('ignores corrupted localStorage data', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')
    const vm = useShortcutsVm()
    expect(vm.getBindingFor('nav.dashboard')).toBe('Alt+1')
  })

  it('ignores version mismatch in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 99,
      overrides: { 'nav.dashboard': 'Alt+D' }
    }))
    const vm = useShortcutsVm()
    expect(vm.getBindingFor('nav.dashboard')).toBe('Alt+1')
  })
})
