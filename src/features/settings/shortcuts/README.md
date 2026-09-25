# Keyboard Shortcuts

Fitur untuk mengelola dan menggunakan keyboard shortcut di seluruh halaman admin.

## Struktur

```text
shortcuts/
  screen/
    ShortcutSettingsScreen.vue   # Halaman daftar & edit shortcut (/settings/shortcuts)
    ShortcutRecorder.vue         # Komponen perekam keybinding
    ShortcutCheatSheetScreen.vue # Halaman cheat sheet (/shortcuts)
  state/
    shortcutsState.ts            # Command registry & konstanta
  type/
    shortcutTypes.ts             # Interface & tipe
  vm/
    useShortcutsVm.ts            # Pinia store: logic binding
    shortcutHandlers.ts          # Handler registry global
```

## Cara Pakai

### Navigation shortcut

Otomatis digenerate dari `dashboardVm.view.favoriteItems`. Tekan `Ctrl+1`–`Ctrl+5` untuk pindah halaman.

### Page shortcut

Daftarkan di screen dengan `usePageShortcuts`:

```typescript
import { usePageShortcuts } from '@/core/composables/usePageShortcuts'

usePageShortcuts([
  { commandId: 'page.employees.new', handler: () => vm.openFormModal() }
])
```

Shortcut scope `page` bersifat lintas halaman: jika dipicu dari halaman lain, engine navigasi dulu ke target, lalu handler dijalankan setelah mount (pending action).

### Form modal shortcut

`Ctrl+S` (simpan) dan `Escape` (tutup) otomatis bekerja di semua modal yang memiliki `data-shortcut-modal="true"`. Engine menemukan tombol submit/close di dalam modal aktif via DOM query.

### Focus trap

Saat modal aktif, `Tab`/`Shift+Tab` terkurung di dalam modal. Shortcut navigasi diblokir. Hanya `page.form.save` dan `page.form.close` yang lolos.

## Menambah Command Baru

1. Tambahkan objek `ShortcutCommand` di `shortcutsState.ts`.
2. Jika scope `page`, daftarkan handler di screen terkait dengan `usePageShortcuts`.
3. Jika scope `global` atau `navigation`, daftarkan handler di `App.vue` `onMounted`.

## Persistensi

Custom binding disimpan di `localStorage` dengan key `edc-shortcut-bindings`. Hanya override yang disimpan; binding default tidak. Reset menghapus override dan kembali ke default.
