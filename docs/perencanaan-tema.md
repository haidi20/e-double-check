# Perencanaan Tema UI/UX
## Livin' by Mandiri Design System

> Aplikasi target: e-double-check (Vue 3 + Vite + TypeScript + Pinia + Bootstrap)
> Referensi desain: Livin' by Mandiri (mobile banking)

---

## 1. Desain UI/UX — Livin' by Mandiri Style

Seluruh antarmuka mengadopsi pola visual referensi Livin' by Mandiri pada gambar: mobile-first, gradasi biru memenuhi layar untuk beranda, sheet putih dengan sudut membulat untuk konten, header ringan, ikon aksi berbentuk lingkaran, navigasi bawah yang mengambang, filter berbasis kartu/form, dan tipografi yang kuat. Referensi digunakan sebagai inspirasi struktur dan pengalaman, bukan penyalinan logo/aset bermerek.

### 1.1 Design Tokens

```css
:root {
  /* Mandiri brand colors */
  --lv-primary: #003D79;        /* Navy Mandiri */
  --lv-primary-dark: #002952;
  --lv-accent: #FDB913;         /* Kuning Mandiri */
  --lv-accent-soft: #FFF3D6;
  --lv-surface: #FFFFFF;
  --lv-background: #F5F6FA;
  --lv-border: #E8EAF0;
  --lv-ink: #1A1A2E;
  --lv-neutral: #6B7280;
  --lv-success: #16A34A;
  --lv-success-soft: #F0FDF4;
  --lv-danger: #DC2626;
  --lv-danger-soft: #FEF2F2;
  --lv-warning: #D97706;
  --lv-warning-soft: #FFFBEB;
  --lv-info: #2563EB;
  --lv-info-soft: #EFF6FF;

  /* Radius & shadow */
  --lv-radius-sm: 8px;
  --lv-radius-md: 12px;
  --lv-radius-lg: 16px;
  --lv-radius-full: 999px;
  --lv-shadow-sm: 0 1px 3px rgba(0, 61, 121, 0.08);
  --lv-shadow-md: 0 4px 12px rgba(0, 61, 121, 0.10);
  --lv-shadow-lg: 0 8px 24px rgba(0, 61, 121, 0.14);

  /* Spacing */
  --lv-gap-xs: 4px;
  --lv-gap-sm: 8px;
  --lv-gap-md: 16px;
  --lv-gap-lg: 24px;
  --lv-gap-xl: 32px;
}
```


### 1.2 Layout Shell

| Komponen | Desain |
|---|---|
| Layout | **Mobile-first**; lebar penuh di mobile (100% viewport). Di desktop tampilan mobile ditampilkan di tengah (center) dengan max-width 480px, kanan-kiri kosong dengan background abu-abu #F0F1F5 |
| Header | Beranda memakai background gradient biru full-screen, greeting dan ikon aksi berwarna putih. Halaman detail memakai header putih dengan tombol kembali dan judul tengah |
| Bottom nav | 5 tab bergaya Livin: Beranda, Produk Anda, tombol tengah QR/aksi utama, Suka, Loyalty. Untuk aplikasi checklist, label disesuaikan menjadi Beranda, Checklist, Riwayat, Laporan, Profil |
| Konten | Scroll vertikal di dalam container mobile, card-based, gap 16px, padding 16px |
| Safe area | Bottom padding env(safe-area-inset-bottom) |


**Implementasi CSS**

```css
.app-shell {
  min-height: 100dvh;
  background: #F0F1F5; /* Background kosong kanan-kiri */
}

.app-container {
  width: 100%;          /* Mobile: full-width */
  max-width: 480px;     /* Desktop/tablet: cap di 480px */
  margin: 0 auto;       /* Center horizontal */
  min-height: 100dvh;
  background: var(--lv-background);
  box-shadow: 0 0 32px rgba(0, 61, 121, 0.06);
  position: relative;
  overflow-x: hidden;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  background: var(--lv-surface);
  border-top: 1px solid var(--lv-border);
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
}
```

**Visual desktop:**

```text
+----------------------------------------------------------+
|  Background abu-abu #F0F1F5                              |
|                                                          |
|     +------------------------------------+               |
|     |  Container mobile (max 480px)      |               |
|     |                                    |               |
|     |  [Header navy]                     |               |
|     |  [Kartu status]                    |               |
|     |  [Quick actions]                   |               |
|     |  [Konten scroll]                   |               |
|     |                                    |               |
|     |  [Bottom nav fixed]                |               |
|     +------------------------------------+               |
|                                                          |
|     Kiri kosong          Kanan kosong                    |
+----------------------------------------------------------+
```
### 1.3 Layar Login

| Komponen | Desain |
|---|---|
| Ilustrasi | Ilustrasi centang warna brand |
| Logo | Logo e-double-check + tagline |
| Pemilih peran | Dua card selector (Admin / Pegawai) dengan ikon, border kuning saat aktif |
| Tombol Masuk | Full-width, 48px, radius 12px, background kuning, teks navy bold |
| Loading | Spinner kuning saat autentikasi |

### 1.4 Beranda Utama

Beranda mengikuti komposisi referensi beranda Livin: background biru terang, header transparan, satu kartu rekening/status utama berwarna putih, kartu aksi favorit, lalu bottom navigation putih yang menempel di bawah.

| Komponen | Desain |
|---|---|
| Background | Gradient biru dari `#35A8E8` ke `#168BE0`, dengan aksen gelombang putih transparan yang sangat halus |
| Header | Avatar lingkaran di kiri, nama pengguna dan outlet di sampingnya, ikon notifikasi, pengaturan, dan logout di kanan |
| Identitas pengguna | Nama maksimal dua baris; outlet/role ditampilkan sebagai teks kecil putih dengan chevron |
| Kartu status utama | Kartu putih radius 24px; judul `Checklist Hari Ini`, badge shift, outlet, progres, dan status sesi |
| Ringkasan progres | Progress ring atau progress bar biru; angka `12/20 item selesai` ditampilkan tebal |
| Tombol utama | Tombol biru `Buka Checklist` atau kuning `Mulai Shift`, full-width pada area kartu |
| Aksi favorit | Kartu putih radius 24px dengan grid ikon bulat: Mulai Shift, Insiden, Riwayat, Laporan, Outlet, Pegawai |
| Ikon aksi | Lingkaran biru muda dengan ikon biru/navy dan aksen kuning kecil bila aksi membutuhkan perhatian |
| Banner informasi | Banner horizontal radius 16px untuk pengumuman shift, aturan penting, atau peringatan checklist |
| Bottom nav | White floating sheet radius atas 24px; tab aktif berwarna biru dan indikator kuning kecil |

### 1.5 Detail Outlet dan Sesi

Layar detail menggunakan pola referensi rekening Livin: header putih, tombol kembali, judul terpusat, konten dalam kartu dan daftar aktivitas yang sederhana.

| Komponen | Desain |
|---|---|
| Header detail | Background putih, tombol back biru di kiri, judul bold di tengah, aksi informasi di kanan |
| Hero outlet | Nama outlet, kapten aktif, shift, dan status sesi dalam satu kartu putih dengan shadow tipis |
| Quick actions | Ikon lingkaran untuk Checklist, Insiden, Riwayat, dan Tutup Shift |
| Daftar aktivitas | Row dengan ikon biru, judul tebal, deskripsi abu-abu, waktu/status di sisi kanan |
| Separator | Garis horizontal sangat tipis antar row; tanpa border berat |
| Status | `Lengkap` hijau, `Perlu tindakan` kuning, `Terlambat` merah, `Belum dimulai` abu-abu |

### 1.6 Layar Checklist

| Komponen | Desain |
|---|---|
| Header sticky | Header putih dengan tombol back, judul `Checklist`, outlet/shift sebagai subtitle, dan ikon bantuan |
| Progress bar | Kartu progres putih radius 20px di bawah header; bar biru dengan angka persentase |
| Tab kategori | Horizontal scroll chip putih/abu; chip aktif biru dengan teks putih |
| Card item | Row/card putih dengan ikon kategori biru, judul tebal, deskripsi abu-abu, badge layanan, waktu cek, dan chevron |
| Checkbox | Tombol lingkaran 28px; checked = biru dengan centang putih; item penting dapat memakai aksen kuning |
| Status warna | Default abu, complete hijau-soft, skipped kuning-soft |
| Swipe | Kanan = selesai; kiri = skip (buka bottom sheet alasan) |
| FAB | Tombol aksi utama berbentuk lingkaran biru atau kuning di atas bottom nav untuk tambah insiden |
| Bottom sheet cek ganda | Pilih aktor dropdown, konfirmasi 'Simpan Cek' |
| Pull-to-refresh | Tarik ke bawah untuk refresh |
| Skeleton | Shimmer placeholder saat loading |

### 1.7 Layar Transaksi dan Riwayat Aktivitas

Pola ini mengikuti referensi layar `Transaksi`: header putih dengan judul tebal, tautan aksi di kanan, tab periode horizontal, tombol pencarian, dan daftar aktivitas yang dipisahkan tanggal.

| Komponen | Desain |
|---|---|
| Header | Background putih, tombol back bila berasal dari detail, judul `Riwayat`/`Transaksi`, aksi kanan seperti `e-Statement` diganti `Ekspor` atau `Filter` |
| Tab periode | Tab horizontal: Bulan berjalan, bulan sebelumnya, atau rentang tanggal; tab aktif memakai underline biru tebal |
| Search | Ikon search di sisi kanan header/tab; tap membuka input pencarian penuh |
| Group tanggal | Label tanggal abu-abu kecil, misalnya `23 September 2026`, sebagai pemisah aktivitas |
| Activity row | Ikon kategori biru dalam area 40px, judul bold, deskripsi dua baris, metadata kecil, nilai/status rata kanan |
| Nilai | Angka/status rata kanan dengan bobot tebal; warna merah untuk masalah, hijau untuk selesai, navy untuk aktivitas biasa |
| Divider | Garis tipis antar aktivitas; tidak menggunakan card berat untuk setiap row |
| Empty | Area kosong dengan ilustrasi sederhana, teks `Belum ada riwayat`, dan aksi filter/reset |

### 1.8 Layar Filter

Pola filter mengikuti referensi `Filter`: halaman putih bersih, judul terpusat, field abu-abu terang berukuran besar, dan tombol `Terapkan` fixed di bawah.

| Komponen | Desain |
|---|---|
| Header | Tombol kembali kiri, judul `Filter` di tengah, tanpa header berwarna |
| Date range | Dua field berdampingan `Dari` dan `Sampai`, radius 18px, background `#F7F7F8`, tanggal bold, ikon kalender biru |
| Select field | Field full-width untuk `Outlet`, `Shift`, `Status`, `Kategori`, dan `Jenis Insiden`; label kecil abu-abu di atas, nilai bold di bawah, chevron kanan |
| Search field | Field rounded besar dengan placeholder `Cari checklist apa?` atau `Cari transaksi apa?` |
| Bottom action | Tombol `Terapkan` full-width, tinggi 52px, radius 28px, background biru `#168BE0`, teks putih bold |
| Reset | Link/tombol `Reset` di header atau tepat di atas tombol Terapkan |
| Keyboard | Saat field search aktif, konten tetap dapat discroll dan tombol Terapkan tetap terlihat di atas keyboard |

### 1.9 Bottom Sheet Modal

| Komponen | Desain |
|---|---|
| Handle | Bar abu-abu 4px, draggable |
| Header | Judul bold + tombol X kanan |
| Konten | Form fields label atas, input radius 8px |
| Tombol | Full-width primary (kuning) + secondary (outline navy) |
| Animasi | Slide up 300ms, backdrop fade 200ms |
| Dismiss | Tap backdrop, swipe down, tombol close |

### 1.10 Layar Master (Admin)

| Komponen | Desain |
|---|---|
| Tab bar | Segmented control: Kategori, Pertanyaan, Layanan, Outlet, Pegawai |
| Search | Rounded input dengan ikon kaca pembesar |
| List | Card: avatar, judul, subtitle, chevron kanan |
| Aksi | Tap = detail; long-press/swipe = edit/arsip/hapus |
| FAB | '+' kuning kanan bawah |
| Form | Bottom sheet, field vertikal, validasi inline merah |
| Kapten | Detail outlet: kapten aktif card + riwayat list |

### 1.11 Riwayat & Laporan

| Komponen | Desain |
|---|---|
| Periode | Chip: Hari Ini, 7 Hari, 30 Hari, Custom |
| Summary | Grid 2 kolom: Total Sesi, Komplain, Insiden, Kelengkapan |
| Chart | Bar horizontal per item (nasi/sambal/ayam/ganje) |
| List | Card per sesi: tanggal, shift, outlet, status, tap detail |
| Export | Tombol header, bottom sheet pilih format (PDF/Excel) |

### 1.12 Feedback & Status

| Pola | Desain |
|---|---|
| Success | Full-screen animasi centang, auto-dismiss 2s |
| Error | Snackbar merah bawah, ikon X, swipe dismiss |
| Warning | Bar kuning-soft di atas list, ikon peringatan |
| Empty | Ilustrasi abu-abu + teks + tombol aksi |
| Skeleton | Shimmer abu-abu bentuk card |

### 1.13 Interaksi & Animasi

| Pola | Spesifikasi |
|---|---|
| Card tap | Scale 0.98 + shadow, 150ms |
| Bottom sheet | Slide up 300ms ease-out, backdrop fade 200ms |
| Checkbox | Scale bounce, 200ms |
| Page | Slide horizontal (push detail), fade (tab) |
| Swipe | Card ikut jari, snap back jika tidak threshold |
| Pull-refresh | Overscroll bounce, spinner saat threshold |
| FAB | Scale 0-1 bounce |
| Progress | Animasi lebar 400ms ease-in-out |

### 1.14 Responsive

| Breakpoint | Perilaku |
|---|---|
| < 768px | Mobile: bottom nav, full-width, bottom sheet |
| 768-1024px | Tablet: bottom nav, max 480px terpusat |
| > 1024px | Desktop: tetap menggunakan mobile viewport max-width 480px di tengah; kanan-kiri kosong, bottom nav tetap, tidak ada sidebar |

### 1.15 Prinsip Kesesuaian Referensi

- Gunakan hirarki visual seperti referensi: background biru untuk beranda, sheet putih untuk konten, dan layar putih penuh untuk detail/filter.
- Gunakan ikon sebagai affordance utama; teks pendukung tetap singkat dan mudah dipindai.
- Gunakan radius besar (16–24px) pada kartu utama, radius pill pada filter/chip, dan shadow tipis.
- Gunakan warna biru untuk navigasi dan aksi utama, kuning sebagai aksen status/brand, hijau untuk selesai, dan merah hanya untuk error/logout.
- Jangan menyalin logo, ilustrasi, atau aset proprietary Livin; terapkan pola interaksi dan komposisi visualnya pada identitas e-double-check.
---
