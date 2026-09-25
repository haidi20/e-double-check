# Perencanaan Fitur Keyboard Shortcut (Gaya VS Code)

## 1. Ringkasan

Fitur ini memungkinkan pengguna (khususnya admin) melihat, mengubah, dan menggunakan keyboard shortcut di seluruh halaman admin aplikasi. Pendekatannya meniru VS Code:

- Ada daftar aksi (command) bawaan yang bisa diberi shortcut.
- Setiap aksi punya binding default yang bisa ditimpa (override) oleh pengguna.
- Pengguna bisa mencari aksi, mengubah keybinding, dan mereset ke nilai default.
- Shortcut aktif secara global di sisi klien dan tetap berjalan meski halaman berganti (SPA navigation).

## 2. Ruang Lingkup

**Termasuk:**

- Panel pengaturan shortcut di halaman admin (section Pengaturan).
- Registry aksi global dan per-halaman yang bisa di-bind.
- Engine keyboard listener global di level `App.vue`.
- Persistensi custom shortcut di `localStorage` (fase 1) dan API (fase lanjutan).
- Pencarian, filter, dan edit keybinding.
- Deteksi konflik antar shortcut.
- Cheat sheet sebagai halaman routed (`/shortcuts`) dengan tampilan gaya VS Code Command Palette.

**Di luar ruang lingkup (fase ini):**

- Shortcut tingkat peran (role-based shortcut sets).
- Sinkronisasi antar perangkat real-time.
- Macro atau chord multi-level lebih dari 2 key.

## 3. Struktur Feature

Mengikuti pola feature yang sudah ada:

```text
src/features/settings/shortcuts/
  README.md
  screen/
    ShortcutSettingsScreen.vue   # Halaman daftar & edit shortcut
    ShortcutRecorder.vue         # Komponen perekam keybinding
    ShortcutCheatSheetScreen.vue # Halaman cheat sheet (routed page)
  state/
    shortcutsState.ts            # Data statis & initial state
  type/
    shortcutTypes.ts             # Interface & tipe
  vm/
    useShortcutsVm.ts            # Pinia store: logic
```

Plus core composable:

```text
src/core/composables/useKeyboardShortcuts.ts   # Engine global
```

## 4. Model Data

### 4.1 Tipe

```typescript
// shortcutTypes.ts

export type ShortcutScope = 'global' | 'navigation' | 'action' | 'page'

export interface ShortcutCommand {
  id: string                    // Contoh: 'nav.dashboard'
  label: string                 // Contoh: 'Buka Halaman Utama'
  description: string
  scope: ShortcutScope
  pageContext?: string          // Route name, untuk scope 'page'
  routePath?: string            // Target halaman untuk cross-page navigation
  defaultBinding: string        // Format: 'Ctrl+Shift+D'
  handler: string               // Nama handler terdaftar di registry
  category: string              // Untuk grouping di UI
}

export interface ShortcutBinding {
  commandId: string
  binding: string | null        // null = disabled
  isCustom: boolean
}

export interface ShortcutSettingsState {
  commands: ShortcutCommand[]
  bindings: Record<string, ShortcutBinding>
  isRecording: boolean
  recordingCommandId: string | null
  lastConflict: string | null
  searchQuery: string
  activeCategoryFilter: string
}
```

### 4.2 Format Keybinding

Menggunakan format seragam: `Modifier+Modifier+Key`, case-sensitive pada bagian key, modifier menggunakan nama standar:

| Token      | Arti                        |
|------------|-----------------------------|
| `Ctrl`     | Ctrl (atau Cmd di macOS)    |
| `Shift`    | Shift                       |
| `Alt`      | Alt (atau Option di macOS)  |
| `Meta`     | Win / Cmd                   |

Key diakhiri dengan nama tombol utama: `A-Z`, `0-9`, `F1-F12`, `ArrowUp`, `ArrowDown`, `Enter`, `Escape`, `Backspace`, `Delete`, `Tab`, `Space`, dan karakter khusus.

### 4.3 Persistensi

**Fase 1 (localStorage):**

```typescript
const STORAGE_KEY = 'edc-shortcut-bindings'

// Simpan hanya yang custom
interface StoredBindings {
  version: number
  overrides: Record<string, string | null> // commandId -> binding
}
```

**Fase lanjutan (API):** `GET /api/user/preferences/shortcuts` dan `PUT /api/user/preferences/shortcuts` dengan payload sama seperti StoredBindings.

## 5. Daftar Aksi (Command Registry)

### 5.1 Navigasi Halaman (scope: navigation)

Mengikuti item sidebar yang benar-benar tampil di halaman admin (dari `dashboardVm.view.favoriteItems`):

| ID                  | Label              | Default   |
|---------------------|--------------------|-----------|
| `nav.dashboard`     | Dashboard          | `Ctrl+1`  |
| `nav.questions`     | Daftar Pertanyaan | `Ctrl+2`  |
| `nav.services`      | Layanan            | `Ctrl+3`  |
| `nav.outlets`       | Warung             | `Ctrl+4`  |
| `nav.employees`     | Pegawai            | `Ctrl+5`  |

> Digenerate otomatis dari `dashboardVm.view.favoriteItems`, ID-nya `nav.{item.id}`.

### 5.2 Aksi Global (scope: global)

| ID                        | Label                          | Default          |
|---------------------------|--------------------------------|------------------|
| `global.open-cheatsheet`  | Buka halaman shortcut          | `Ctrl+K Ctrl+S`  |
| `global.toggle-sidebar`   | Buka / tutup sidebar           | `Ctrl+B`         |
| `global.focus-search`     | Fokus ke pencarian halaman     | `Ctrl+P`         |
| `global.logout`           | Keluar                         | `Ctrl+Shift+Q`   |

### 5.3 Aksi Per Halaman (scope: page)

Shortcut per-halaman bersifat lintas halaman (cross-page). Jika pengguna sedang di halaman lain (misalnya dashboard) dan menekan `Ctrl+N` yang terikat ke `page.employees.new`, aplikasi akan:

1. Navigasi ke halaman target (`/employees`).
2. Tunggu halaman selesai dirender.
3. Otomatis buka modal form ("Tambah Pegawai").

Jika shortcut hanya navigasi (tidak membuka modal), aplikasi langsung pindah ke halaman target tanpa aksi tambahan.

| ID                              | Halaman           | Label                    | Default        |
|---------------------------------|-------------------|--------------------------|----------------|
| `page.checklist.new`            | checklist         | Tambah Pertanyaan        | `Ctrl+N`       |
| `page.services.new`             | services          | Tambah Layanan           | `Ctrl+N`       |
| `page.outlets.new`              | outlets           | Tambah Warung            | `Ctrl+N`       |
| `page.employees.new`            | employees         | Tambah Pegawai           | `Ctrl+N`       |
| `page.form.save`                | universal         | Simpan Form Modal        | `Ctrl+S`       |
| `page.form.close`               | universal         | Tutup Form Modal         | `Escape`       |

> Page-level commands didaftarkan oleh masing-masing feature melalui `registerPageCommands()` di `onMounted` dan dihapus di `onUnmounted`.

## 6. Arsitektur Engine

### 6.1 `useKeyboardShortcuts.ts` (Core)

Composable yang dipasang sekali di `App.vue`:

```typescript
// Pseudocode
export function useKeyboardShortcuts() {
  const shortcutsVm = useShortcutsVm()

  const handleKeyDown = (event: KeyboardEvent) => {
    // 1. Abaikan jika target adalah input/textarea/select yang sedang editable
    //    (kecuali binding mengandung Escape)
    // 2. Jika ada modal aktif, lakukan focus trap:
    //    - Tab: cycle fokus di dalam elemen modal saja
    //    - Shift+Tab: cycle mundur di dalam elemen modal saja
    //    - Blokir navigasi shortcut lain yang bisa memindahkan fokus keluar modal
    // 3. Bangun string keybinding dari event
    //    contoh: 'Ctrl+Shift+D'
    // 4. Cari match di shortcutsVm.activeBindings
    // 5. Jika ketemu, preventDefault() dan jalankan handler
    // 6. Jika scope 'page':
    //    a. Jika sudah di halaman target, jalankan handler langsung
    //    b. Jika di halaman lain, navigasi dulu ke halaman target,
    //       lalu setelah halaman terbuka jalankan handler (auto-open modal)
    //    c. Jika shortcut hanya navigasi, langsung pindah halaman
  }

  onMounted(() => document.addEventListener('keydown', handleKeyDown))
  onUnmounted(() => document.removeEventListener('keydown', handleKeyDown))
}
```

### 6.2 Command Handler Registry

```typescript
// shortcutHandlers.ts
type ShortcutHandler = () => void | Promise<void>

const handlers = new Map<string, ShortcutHandler>()

export function registerShortcutHandler(id: string, handler: ShortcutHandler) {
  handlers.set(id, handler)
}

export function getShortcutHandler(id: string): ShortcutHandler | undefined {
  return handlers.get(id)
}
```

### 6.4 Modal Focus Trap

Ketika ada modal terbuka (form modal, konfirmasi, dll), navigasi keyboard wajib terkurung di dalam modal tersebut:

- `Tab` â†’ pindah fokus ke elemen interaktif berikutnya **di dalam modal saja** (input, select, button, link).
- `Shift+Tab` â†’ pindah fokus ke elemen interaktif sebelumnya **di dalam modal saja**.
- Jika fokus berada di elemen terakhir â†’ `Tab` kembali ke elemen pertama di modal (cycle).
- Jika fokus berada di elemen pertama â†’ `Shift+Tab` kembali ke elemen terakhir di modal (cycle).
- Shortcut navigasi halaman (`nav.*`) **tidak boleh** aktif saat modal terbuka.
- Shortcut `page.form.close` (`Escape`) tetap aktif untuk menutup modal.

Implementasi:

```typescript
function trapFocusInModal(event: KeyboardEvent, modalElement: HTMLElement) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ')

  const focusableElements = Array.from(
    modalElement.querySelectorAll<HTMLElement>(focusableSelectors)
  ).filter((el) => el.offsetParent !== null)

  if (focusableElements.length === 0) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement as HTMLElement

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}
```

Helper untuk mendeteksi modal aktif:

```typescript
function getActiveModalElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-shortcut-modal="true"]:not([hidden])')
}
```

Setiap komponen modal harus menambahkan atribut `data-shortcut-modal="true"` pada elemen root-nya agar engine bisa mendeteksi modal aktif.

Handler navigation didaftarkan di `App.vue` menggunakan `rrouter.push(routePath)`. Handler page didaftarkan di masing-masing screen.

### 6.5 Cross-Page Command Execution

Page-scoped shortcut dapat dipicu dari halaman mana pun. Engine membedakan dua skenario:

**Skenario A â€” Sudah di halaman target:**

```text
User di /employees â†’ tekan Ctrl+N â†’ handler page.employees.new dijalankan â†’ modal terbuka
```

**Skenario B â€” Di halaman lain (cross-page):**

```text
User di /dashboard â†’ tekan Ctrl+N â†’ engine navigasi ke /employees
                   â†’ tunggu route selesai â†’ handler page.employees.new dijalankan â†’ modal terbuka
```

Jika command hanya navigasi (misalnya `nav.employees`), engine langsung `rrouter.push(routePath)` tanpa langkah tambahan.

#### 6.5.1 Mekanisme Pending Action

Untuk skenario B, engine menggunakan pola **pending action**:

1. Saat shortcut scope `page` ditekan dari halaman lain, engine menyimpan `commandId` ke `pendingPageAction`.
2. Engine melakukan `rrouter.push(targetRoutePath)`.
3. Halaman target di-mount dan memanggil `usePageShortcuts()` di `onMounted`.
4. `usePageShortcuts()` memanggil `shortcutsVm.consumePendingPageAction()`.
5. Jika `pendingPageAction` cocok dengan salah satu command yang didaftarkan halaman tersebut, handler dijalankan dan pending action di-clear.
6. Jika tidak cocok (misalnya halaman tidak punya command tersebut), pending action di-ignore.

```typescript
// Pseudocode di engine (App.vue)
async function executePageCommand(command: ShortcutCommand) {
  const currentRoute = route.name

  if (currentRoute === command.pageContext) {
    // Sudah di halaman target, langsung jalankan
    const handler = getShortcutHandler(command.handler)
    handler?.()
    return
  }

  // Cross-page: simpan pending action, lalu navigasi
  shortcutsVm.setPendingPageAction(command.id)
  await rrouter.push(command.routePath)
  // Handler akan dijalankan oleh usePageShortcuts() di onMounted halaman target
}
```

```typescript
// Pseudocode di usePageShortcuts() (dipanggil tiap halaman)
export function usePageShortcuts(pageCommands: { commandId: string; handler: ShortcutHandler }[]) {
  const shortcutsVm = useShortcutsVm()

  onMounted(() => {
    // Daftarkan handler
    pageCommands.forEach(({ commandId, handler }) => {
      registerShortcutHandler(commandId, handler)
    })

    // Consume pending action dari cross-page shortcut
    const pendingAction = shortcutsVm.consumePendingPageAction()
    if (pendingAction) {
      const match = pageCommands.find((cmd) => cmd.commandId === pendingAction)
      match?.handler()
    }
  })

  onUnmounted(() => {
    pageCommands.forEach(({ commandId }) => {
      unregisterShortcutHandler(commandId)
    })
  })
}
```

#### 6.5.2 Tipe Tambahan

```typescript
// shortcutTypes.ts (tambahan)
export interface ShortcutSettingsState {
  // ... properti yang sudah ada
  pendingPageAction: string | null
}
```

#### 6.5.3 Flow Diagram

```text
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     Ctrl+N (page.employees.new)     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Dashboard  â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º  â”‚      Engine       â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                                     â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                                             â”‚
                                              Sudah di /employees?
                                                   â”‚         â”‚
                                                  YES        NO
                                                   â”‚         â”‚
                                                   â–¼         â–¼
                                            Jalankan handler  setPendingPageAction
                                            (modal terbuka)   rrouter.push('/employees')
                                                                   â”‚
                                                                   â–¼
                                                              EmployeesScreen mounted
                                                              usePageShortcuts()
                                                              consumePendingPageAction()
                                                                   â”‚
                                                                   â–¼
                                                              Jalankan handler
                                                              (modal terbuka)
```

#### 6.5.4 Konflik dengan Halaman yang Sama

Beberapa halaman punya default binding sama (`Ctrl+N` untuk "Tambah"). Karena setiap command punya `pageContext` yang unik, tidak ada konflik binding antar halaman â€” engine hanya akan mengeksekusi command yang cocok dengan konteks pending action, bukan semua handler dengan binding sama.

Handler navigation didaftarkan di `App.vue` menggunakan `rrouter.push(routePath)`. Handler page didaftarkan di masing-masing screen.

### 6.3 Chord (2-step keybinding)

Untuk chord seperti `Ctrl+K Ctrl+S`, engine menyimpan state `pendingChord` dengan timeout 1 detik. Jika key berikutnya tidak cocok, chord di-reset.

## 7. UI Halaman Pengaturan Shortcut

Rute: `/settings/shortcuts` (masuk ke section Pengaturan sidebar).

### 7.1 Layout

```text
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Shortcut Keyboard                                           â”‚
â”‚  Kelola kombinasi tombol untuk aksi di aplikasi.             â”‚
â”‚                                    [ Reset Semua ]  [+ Baru] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  ðŸ” Cari aksi atau shortcut...         [Kategori â–¾] [Scope â–¾]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Navigasi Halaman                                            â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Halaman Utama          Ctrl+1                    [Edit]â”‚  â”‚
â”‚  â”‚ Order Pesanan          Ctrl+3                    [Edit]â”‚  â”‚
â”‚  â”‚ ...                                                    â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                              â”‚
â”‚  Aksi Global                                                 â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Buka Daftar Shortcut   Ctrl+K Ctrl+S             [Edit]â”‚  â”‚
â”‚  â”‚ ...                                                    â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                              â”‚
â”‚  Aksi Halaman                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ [Orders] Tambah Pesanan    Ctrl+N                [Edit]â”‚  â”‚
â”‚  â”‚ ...                                                    â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### 7.2 Komponen `ShortcutRecorder.vue`

Ketika tombol Edit diklik, baris berubah menjadi mode rekam:

```text
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Order Pesanan    [ Tekan kombinasi tombol... ]  âœ“ Simpan  âœ• â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

Perilaku:

- Klik area rekam â†’ fokus, tangkap `keydown`.
- Tampilkan kombinasi secara real-time saat pengguna menekan modifier.
- Kombinasi harus mengandung minimal 1 modifier ATAU `F1-F12`.
- Tekan `Escape` untuk batal rekam.
- Jika binding sama dengan command lain â†’ tampilkan warning konflik inline.
- Tombol `Reset` (ikon â†º) mengembalikan ke default.

### 7.3 Cheat Sheet Page

Halaman cheat sheet adalah **routed page** (/shortcuts) — bukan modal atau overlay. Tampilan dan interaksinya mengadopsi pola Command Palette VS Code, tetapi dirender sebagai halaman penuh dengan sidebar tetap terlihat.

Rute: /shortcuts (bisa diakses dari shortcut global.open-cheatsheet atau tombol di dropdown profile).

#### 7.3.1 Tampilan Visual

`	ext
┌──────────────────────────────────────────────────────────────────┐
│ ┌──────┐                                                         │
│ │side  │   ┌─ content ────────────────────────────────────────┐  │
│ │bar   │   │  Keyboard Shortcuts                              │  │
│ │(tetap│   │  Daftar semua aksi dan kombinasi tombol.          │  │
│ │terli-│   │                                                   │  │
│ │hat)  │   │  ┌─ search-box ──────────────────────────────┐   │  │
│ │      │   │  │  › cari command...                        │   │  │
│ │      │   │  └───────────────────────────────────────────┘   │  │
│ │      │   │                                                   │  │
│ │      │   │  ┌─ command-list ─────────────────────────────┐   │  │
│ │      │   │  │  Dashboard — Utama                 Ctrl+1 │   │  │
│ │      │   │  │  Daftar Pertanyaan — Utama         Ctrl+2 │   │  │
│ │      │   │  │  Layanan — Utama                   Ctrl+3 │   │  │
│ │      │   │  │  Warung — Utama                    Ctrl+4 │   │  │
│ │      │   │  │  Pegawai — Utama                   Ctrl+5 │   │  │
│ │      │   │  │  Tambah Pegawai — Halaman          Ctrl+N │   │  │
│ │      │   │  │  Simpan Form Modal — Halaman       Ctrl+S │   │  │
│ │      │   │  │  Tutup Form Modal — Halaman        Escape │   │  │
│ │      │   │  │  Buka Halaman Shortcut — Global  Ctrl+K..S │   │  │
│ │      │   │  │  Buka / Tutup Sidebar — Global     Ctrl+B │   │  │
│ │      │   │  │  Fokus ke Pencarian — Global       Ctrl+P │   │  │
│ │      │   │  │  Keluar — Global               Ctrl+Shift+Q│  │  │
│ │      │   │  └────────────────────────────────────────────┘   │  │
│ │      │   └───────────────────────────────────────────────────┘  │
│ └──────┘                                                         │
└──────────────────────────────────────────────────────────────────┘
```

Detail visual:

- **Layout:** Mengikuti pp-layout yang sudah ada — sidebar tetap terlihat di kiri, konten di kanan.
- **Search box:** Full-width di atas list, dengan prefix › (serupa VS Code). Auto-focus saat halaman dibuka.
- **List:** Max-height mengikuti sisa viewport, scrollable jika melebihi. Setiap row adalah <li> dengan grid layout.
- **Row:** 3 kolom — label (dengan <mark> highlight), kategori (em-dash —), dan <kbd> binding chip di kanan.
- **Item aktif:** Background highlight + border kiri aksen (seperti VS Code).
- **Hover:** Background subtle.
- **Tema:** Mengikuti tema aplikasi (light/dark) yang sudah ada.
- **Responsive:** Pada mobile, sidebar collapse, list full-width.

#### 7.3.2 Struktur Komponen

`	ext
┌─ ShortcutCheatSheetScreen.vue ─────────────────────────────────┐
│                                                                 │
│  <main class="feature-screen container-fluid">                  │
│    <section class="page-heading">                               │
│      <div>                                                      │
│        <p class="eyebrow">Referensi Cepat</p>                   │
│        <h2>Keyboard Shortcuts</h2>                              │
│        <p>Daftar semua aksi dan kombinasi tombol.</p>           │
│      </div>                                                     │
│    </section>                                                   │
│                                                                 │
│    <section class="panel">                                      │
│      <label class="cheatsheet-search">                          │
│        <span>›</span>                                           │
│        <input type="search" placeholder="Cari command..."       │
│                ref="searchInput" v-model="vm.searchQuery" />    │
│      </label>                                                   │
│                                                                 │
│      <ul class="cheatsheet-list" role="listbox">                │
│        <li v-for="cmd in vm.filteredCommands"                   │
│             :class="{ 'is-active': cmd.id === vm.activeId }"    │
│             role="option"                                       │
│             :aria-selected="cmd.id === vm.activeId"             │
│             @click="vm.execute(cmd.id)"                         │
│             @mouseenter="vm.setActive(cmd.id)">                 │
│          <span class="cheatsheet-label"                         │
│                 v-html="vm.highlightedLabel(cmd)"></span>       │
│          <span class="cheatsheet-category">— {{ cmd.category }}</span> │
│          <kbd class="cheatsheet-binding">                       │
│            {{ vm.getBinding(cmd.id) ?? '' }}                    │
│          </kbd>                                                 │
│        </li>                                                    │
│        <li v-if="vm.filteredCommands.length === 0"              │
│              class="cheatsheet-empty">                          │
│          No matching commands                                   │
│        </li>                                                    │
│      </ul>                                                      │
│    </section>                                                   │
│  </main>                                                        │
└─────────────────────────────────────────────────────────────────┘
```

#### 7.3.3 Perilaku Keyboard

| Tombul              | Aksi                                                                 |
|---------------------|----------------------------------------------------------------------|
| ArrowDown         | Pindah ke item berikutnya, item aktif di-highlight & auto-scroll     |
| ArrowUp           | Pindah ke item sebelumnya, item aktif di-highlight & auto-scroll     |
| Enter             | Eksekusi command yang sedang aktif                                   |
| Escape            | Kembali ke halaman sebelumnya (
outer.back())                      |
| Ctrl+N / Ctrl+P | Dalam halaman: navigasi bawah/atas (seperti VS Code)                |
| Karakter lain       | Masuk ke kotak pencarian, filter daftar secara real-time             |

> Karena cheat sheet adalah halaman (bukan modal), semua global shortcut lain (navigasi, sidebar toggle, dll.) tetap aktif dan berfungsi normal.

#### 7.3.4 Pencarian (Fuzzy Match)

- Pencarian dilakukan terhadap label dan category setiap command.
- Menggunakan **fuzzy matching** (substring match case-insensitive, atau fuzzy subsequence).
- Karakter yang match di-highlight dengan <mark> di dalam label.
- Jika tidak ada hasil, tampilkan pesan: No matching commands.

Contoh: mengetik empa → match "Tambah **Em**pl**a**yee" → highlight karakter e, m, p, .

#### 7.3.5 Interaksi Mouse

| Aksi                    | Hasil                                        |
|-------------------------|----------------------------------------------|
| Klik item               | Eksekusi command                              |
| Hover item              | Highlight row (background subtle)            |
| Scroll pada list        | Scrollable, max-height dengan overflow       |
| Klik X / kembali        | Kembali ke halaman sebelumnya                |

#### 7.3.6 State

`	ypescript
interface CheatSheetState {
  searchQuery: string
  activeId: string | null       // ID command yang di-highlight
  filteredCommands: ShortcutCommand[]
}
```

Perilaku:

- Saat halaman dibuka, searchQuery reset ke '', ctiveId reset ke command pertama, fokus otomatis ke input.
- Saat mengetik, ilteredCommands di-update dan ctiveId reset ke command pertama hasil filter.
- State tidak perlu persist antar navigasi.

#### 7.3.7 Aksesibilitas

- List: 
ole="listbox", setiap row: 
ole="option" dengan ria-selected.
- Item aktif: ria-selected="true" dan id yang di-referensi oleh ria-activedescendant pada input.
- Input pencarian: ria-label="Cari command".

#### 7.3.8 Routing

Rute: /shortcuts — ditambahkan ke ppState.navigationItems dengan section 'Pengaturan' agar muncul di sidebar.

`	ypescript
{
  id: 'shortcuts',
  label: 'Keyboard Shortcuts',
  shortLabel: 'Shortcuts',
  section: 'Pengaturan',
  routePath: '/shortcuts',
  icon: '...',
  component: lazyView(() => import('@/features/settings/shortcuts/screen/ShortcutCheatSheetScreen.vue'))
}
```

#### 7.3.9 Tombol di Dropdown Profile

Di App.vue, di dalam dropdown profile (.app-topbar__dropdown), tambahkan tombol untuk membuka halaman cheat sheet. Posisi: **di atas tombol Keluar**, dengan gaya sama seperti tombol dropdown lain:

```vue
<!-- Di dalam .app-topbar__dropdown, sebelum tombol Keluar -->
<button
  type="button"
  class="app-topbar__dropdown-item"
  @click="vm.openCheatSheet"
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 8h2M12 8h2M18 8h2M6 12h2M12 12h2M18 12h2M6 16h2M12 16h2M18 16h2" />
  </svg>
  Keyboard Shortcuts
  <kbd>Ctrl+K Ctrl+S</kbd>
</button>
```

Perilaku: klik → router.push('/shortcuts') → tutup dropdown profile.
## 8. Fase Implementasi

### Fase 1 â€” Fondasi (estimasi: 2â€“3 hari)

1. Buat `shortcutTypes.ts` dengan semua interface.
2. Buat `shortcutsState.ts` dengan command registry statis (digenerate dari `appState.navigationItems` + daftar manual).
3. Buat `useShortcutsVm.ts` (Pinia store) dengan:
   - Load dari `localStorage`.
   - `getBindingFor(commandId)`.
   - `setBinding(commandId, binding)`.
   - `resetBinding(commandId)`.
   - `resetAll()`.
   - `detectConflict(binding)`.
4. Buat `useKeyboardShortcuts.ts` composable.
5. Daftarkan handler navigation di `App.vue`.
6. Unit test: keybinding parser, conflict detection.

### Fase 2 â€” UI Pengaturan (estimasi: 2â€“3 hari)

1. Buat `ShortcutSettingsScreen.vue`.
2. Buat `ShortcutRecorder.vue`.
3. Tambahkan route `/settings/shortcuts` dan item navigasi.
4. Styling menggunakan tema yang sudah ada (`livinTheme.css`).
5. Integrasi pencarian & filter kategori.

### Fase 3 â€” Page-level Commands (estimasi: 1â€“2 hari)

1. Buat helper `usePageShortcuts()` untuk dipakai di masing-masing screen.
2. Daftarkan aksi "Tambah" (Ctrl+N) di setiap halaman master & transaksi.
3. Daftarkan `page.form.save` (Ctrl+S) di semua form modal.
4. Daftarkan `page.form.close` (Escape) di semua form modal.

### Fase 4 â€” Cheat Sheet & Polish (estimasi: 1â€“2 hari)

1. Buat `ShortcutCheatSheetScreen.vue`.
2. Registrasi chord `Ctrl+K Ctrl+S`.
3. Tambahkan tombol "Keyboard Shortcuts" di dropdown profile (di atas tombol Keluar).
4. Tampilkan hint shortcut di tooltip sidebar & tombol aksi.
5. Responsif mobile (cheat sheet tetap sebagai halaman).
6. Testing manual semua shortcut.

## 9. Pertimbangan Teknis

| Pertimbangan | Keputusan |
|---|---|
| Browser reserved shortcuts | Hindari `Ctrl+T`, `Ctrl+W`, `Ctrl+N` (tab baru). Gunakan `Alt+` sebagai alternatif untuk halaman yang konflik. |
| Input focus | Shortcut tidak aktif saat pengguna sedang mengetik di `<input>`, `<textarea>`, atau `<select>`, kecuali tombolnya `Escape` atau `F1-F12`. |
| Modal focus trap | Saat modal aktif, `Tab` dan `Shift+Tab` hanya berputar di dalam modal (cycle), tidak keluar ke elemen di belakangnya. Shortcut navigasi halaman dinonaktifkan. |
| Cross-page shortcut | Shortcut scope `page` dapat dipicu dari halaman mana pun. Engine navigasi dulu ke halaman target, lalu jalankan handler via pending action setelah halaman ter-mount. |
| Screen reader | Tambahkan `aria-label` pada tombol shortcut dan `aria-keyshortcuts` untuk aksesibilitas. |
| Mobile | Shortcut tidak relevan di mobile; UI pengaturan shortcut disembunyikan di mobile viewport. Cheat sheet tetap bisa dibuka sebagai halaman melalui menu. |
| Performance | Engine keydown listener tidak melakukan lookup berat; binding disimpan dalam `Map<string, commandId>` untuk O(1) lookup. |
| Migration | `StoredBindings.version` untuk migrasi struktur data di masa depan. |

## 10. Kriteria Selesai (Definition of Done)

- [ ] Semua halaman sidebar bisa diakses via shortcut navigasi.
- [ ] Halaman pengaturan shortcut menampilkan semua command dengan binding saat ini.
- [ ] Pengguna bisa mengubah binding, melihat konflik, dan mereset ke default.
- [ ] Custom binding tersimpan di `localStorage` dan bertahan setelah refresh.
- [ ] Cheat sheet halaman (`/shortcuts`) terbuka dengan shortcut dan dari tombol di dropdown profile.
- [ ] Tidak ada shortcut yang aktif saat fokus di input field (kecuali yang diizinkan).
- [ ] Tab tidak keluar dari modal yang sedang aktif (focus trap berfungsi di semua form modal).
- [ ] Shortcut scope `page` (misalnya `Ctrl+N` untuk Tambah Pegawai) dapat dipicu dari halaman mana pun: navigasi ke halaman target dulu, lalu modal form terbuka otomatis.
- [ ] Tidak ada error TypeScript (`vue-tsc`).
- [ ] Test manual: semua default binding berfungsi, reset berfungsi, konflik terdeteksi.

