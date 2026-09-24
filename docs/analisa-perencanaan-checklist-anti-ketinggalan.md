- http://localhost:5173/checklist
- http://localhost:5173/checklist/persiapan-shift

# Analisis, Perencanaan, dan Implementasi
## Digitalisasi Checklist Anti Ketinggalan Nasi, Sambal, Ayam, dan Ganje

> Sumber: `docs/Checklist_Anti_Ketinggalan_Nasi_Sambal_Ayam_Ganje.pdf` (4 halaman)
> Aplikasi target: e-double-check (Vue 3 + Vite + TypeScript + Pinia + Bootstrap)

### Revisi Arah Produk

- Sesi checklist dihapus dari lingkup saat ini.
- Menu utama menjadi **Daftar Pertanyaan** pada `/checklist`.
- Halaman daftar pertanyaan menampilkan kategori checklist.
- Klik **detail kategori** untuk membuka daftar pertanyaan di dalam kategori tersebut.
- Data seed mengikuti PDF sumber: 48 item pertanyaan (A=15, B=9, C=8, D=8, E=3, F=5) dan kolom per kategori sesuai tabel PDF (bukan kolom yang diseragamkan).

---

## 1. Analisis Dokumen Sumber

### 1.1 Profil Dokumen

| Aspek | Deskripsi |
|---|---|
| Judul | Checklist Anti Ketinggalan Nasi, Sambal, Ayam, dan Ganje |
| Cakupan layanan | Dine In (DI) dan Take Away (TA) |
| Identitas sesi | Outlet, tanggal, shift (pagi / siang / malam), kapten ditetapkan saat sesi dimulai |
| Kategori awal | 6 kategori dari PDF sebagai data awal yang dapat diedit; pengguna dapat membuat, mengganti nama, mengurutkan ulang, mengarsipkan, dan menghapus kategori melalui CRUD |
| Item awal | 48 item ditambah tabel log insiden; jumlah item bersifat dinamis setelah implementasi |
| Administrasi | Admin dapat membuat, mengedit, mengarsipkan, mengurutkan ulang, dan menghapus kategori serta pertanyaan; pegawai hanya mengisi sesi checklist |

### 1.2 Struktur Checklist

| Bagian | Waktu eksekusi | Jumlah item | Kolom utama |
|---|---|---:|---|
| A. Prepare Awal Shift (30-60 menit sebelum buka) | 30-60 menit sebelum buka | 15 | Layanan, item, ya/tidak, pelaksana, kontrol |
| B. Cek Ulang Sebelum Jam Ramai | Sebelum jam ramai | 9 | Layanan, item, ya/tidak, jam cek |
| C. Saat Pesanan Masuk dan Diproses | Saat pesanan aktif | 8 | Layanan, langkah, penyelesaian |
| D. Pesanan Banyak / Jam Ramai | Saat jam ramai | 8 | Layanan, item, ya/tidak |
| E. Jika Terjadi Ketinggalan atau Item Kurang/Salah | Insidental | 3 | Layanan, tindakan, penyelesaian |
| F. Penutupan Shift | Akhir shift | 5 | Layanan, item, ya/tidak |

Nama A-F, waktu, dan jumlah item awal hanya menjelaskan PDF sumber. Mereka adalah data awal, bukan bagian aplikasi yang tetap atau konstanta sistem. Kategori harus sepenuhnya dinamis: pengguna yang berwenang dapat membuat, membaca, memperbarui, mengurutkan ulang, mengarsipkan, dan menghapusnya melalui layar CRUD kategori, dengan memperhatikan penjagaan referensi dan riwayat. Perilaku checklist harus menggunakan ID kategori dan konfigurasi, bukan label atau posisi A-F yang di-hard-code.

### 1.3 Entitas dan Peran

**Entitas**

- **Outlet**: lokasi fisik/tempat shift checklist dijalankan. Data master yang dikelola melalui CRUD.
- **Pegawai**: staf yang dapat ditugaskan ke outlet sebagai kapten atau kru. Data master yang dikelola melalui CRUD.
- **Penugasan kapten**: catatan bertanggal yang menghubungkan outlet dengan pegawai sebagai kapten. Satu outlet maksimal memiliki satu kapten aktif; mengganti kapten mengarsipkan penugasan sebelumnya agar riwayat terjaga.
- **Sesi checklist**: kombinasi unik outlet + tanggal + shift.
- **Kategori checklist**: kelompok pertanyaan, seperti persiapan shift, jam sibuk, atau penutupan shift.
- **Pertanyaan checklist**: baris/item checklist yang dapat dikonfigurasi dengan nilai yang ditentukan kategori, referensi master layanan, urutan, status aktif, dan aturan validasi.
- **Template checklist**: kategori dan pertanyaan aktif yang digunakan untuk membuat sesi.
- **Service**: `all` (DI + TA), `di` (dine-in only), or `ta` (take-away/online only).
- **Insiden**: catatan terstruktur untuk item yang hilang, tidak lengkap, atau salah: waktu, layanan, jenis item (nasi/sambal/ayam/ganje), nomor pesanan, staf, dan penyebab.

**Peran operasional**

| Peran | Tanggung jawab |
|---|---|
| Kru stasiun nasi | Kesiapan nasi berdasarkan porsi dan estimasi penjualan |
| Kru stasiun sambal | Ketersediaan dan pembagian porsi awal per varian sambal |
| Kru stasiun ayam | Marinasi ayam/bebek/ikan, pemisahan potongan, dan persiapan kangkung |
| Kru stasiun ganje | Bumbu ganje, peralatan menggoreng/membakar, minyak/arang |
| Kru dine-in | Area penyajian, wadah sambal meja, dan pengemasan kangkung take-away |
| Kru pengemasan | Pembagian porsi awal kotak nasi dan persiapan pengemasan |
| Kru shift | Menjaga area kerja tetap tertata |
| Kapten outlet | Memeriksa semua item dan bertindak sebagai pemeriksa akhir di titik penyajian/pengemasan. Ditugaskan per outlet dan dapat diganti seiring waktu; riwayat penugasan terjaga. |

**Peran sistem**

| Peran | Akses | Perilaku login |
|---|---|---|
| Admin | Akses penuh ke semua fitur: sesi checklist, kategori, pertanyaan, tipe jawaban, layanan, outlet, pegawai, dan penugasan kapten | Memilih Admin saat login, klik Masuk |
| Pegawai | Hanya membaca dan mengisi sesi checklist; tidak ada akses ke layar data master | Memilih Pegawai saat login, klik Masuk |

Saat login, pengguna memilih peran dari dropdown (Admin atau Pegawai) dan mengklik tombol Masuk. Aplikasi memfilter item navigasi berdasarkan peran yang dipilih: admin melihat semua entri sidebar; pegawai hanya melihat /checklist. Pilihan peran disimpan di auth state dan diperiksa oleh view model sebelum menampilkan aksi. View model data master menolak panggilan baca/tulis dari peran non-admin.

**Relasi data master**

``text
Outlet 1 --- n CaptainAssignment n --- 1 Employee
Outlet 1 --- n ChecklistSession
Employee 1 --- n ChecklistSession (as captain at session start)
Employee 1 --- n CheckRecord (as actor)
```
Kapten aktif sebuah outlet adalah penugasan dengan `assignedAt` terbaru tanpa `releasedAt`. Ketika kapten diganti, penugasan sebelumnya ditutup (`releasedAt` diisi) dan penugasan baru dibuat. Riwayat penugasan tidak pernah dihapus, sehingga selalu dapat diketahui siapa kapten outlet X pada tanggal Y dari riwayat penugasan. Sesi checklist juga mencatat identitas kapten saat sesi dimulai sehingga laporan shift tetap akurat meskipun kapten sudah diganti.

### 1.4 Aturan Bisnis Utama

1. **Cek ganda TA**: Cek 1 dilakukan oleh kru pengemasan terhadap struk. Cek 2 dilakukan oleh orang yang berbeda, yang membacakan isi pesanan kembali kepada pelanggan atau driver.
2. **Pengemasan ganje**: kemas ganje terpisah dari nasi agar tidak lembek; tutup kemasan dan tempel stiker segel.
3. **Pesanan besar**: Pesanan TA yang berisi lebih dari 20 kotak memerlukan pemeriksa akhir yang ditugaskan.
4. **Posisi kapten**: selama jam sibuk kapten berada di titik penyajian/pengemasan, bukan di kasir.
5. **Ambang stok**: sebelum jam sibuk, stok nasi dan sambal harus di atas sepertiga dari jumlah target yang relevan.
6. **Penanganan komplain**: untuk DI, segera kirimkan item yang kurang; untuk TA, hubungi pelanggan/driver dan atur pengiriman ulang atau kompensasi. Catat setiap kasus dalam laporan komplain.
7. **Penutupan shift**: rangkum komplain per jenis item (nasi/sambal/ayam/ganje), catat sampel cek kapten dan sisa ayam, kangkung, serta ganje, lalu laporkan ke manajer area/administrator operasional.
8. **Pesanan meja besar dine-in**: kirimkan pesanan secara bersamaan dan verifikasi kelengkapan di meja.
9. **Urutan kerja TA**: susun pesanan berdasarkan nomor/nama dan selesaikan satu pesanan sebelum memulai yang lain; masak ganje dalam batch antrean.

### 1.5 Keterbatasan Checklist Kertas

| Keterbatasan kertas | Dampak | Peluang digital |
|---|---|---|
| Tanda centang manual dapat terlewat | Kelalaian tidak terdeteksi secara real time | Status item tervalidasi dan indikator progres |
| Tidak ada jejak audit otomatis | Sulit mengidentifikasi siapa yang memeriksa dan kapan | Merekam aktor, waktu, dan status secara otomatis |
| Total shift dihitung manual | Pelaporan lambat dan rentan kesalahan | Hasilkan ringkasan shift secara otomatis |
| Tabel insiden tidak terstruktur | Komplain sulit dianalisis | Log insiden terstruktur dan filter laporan |
| Salinan kertas disimpan per outlet dan shift | Catatan menumpuk dan sulit diaudit | Riwayat yang dapat dicari dan ekspor |
| Aturan dua orang hanya tertulis sebagai panduan | Aturan dapat terlewat saat jam sibuk | Tolak Cek 2 ketika orang yang sama melakukan Cek 1 |

### 1.6 Kesesuaian dengan Aplikasi

Nama proyek **e-double-check** selaras dengan alur cek ganda di bagian C (Cek 1 dan Cek 2). Aplikasi saat ini menggunakan fitur modular, view model Pinia, router berbasis navigasi, dan komponen shell bersama. Fitur checklist harus mengikuti arah dependensi berikut:

```text
Screen (Vue) -> ViewModel (Pinia) -> State
                              ViewModel -> Repository -> Remote or Local data source
```

Screens render state and forward user actions to view models. Every view model is a Pinia store, defined with `defineStore`, and each store has its own file. Each state object also has its own file; do not combine multiple states or view models in one file. View models own all business rules, validation, orchestration, and transformations. State files contain initial/in-memory state only; they must not contain business logic or perform persistence. View models access data through repositories, whose implementations can use a remote API or local storage. PDF content is seed data only and must not constrain future checklist configuration.

Setiap pengerjaan pada file `.vue` wajib menggunakan skill **`$vue`** terlebih dahulu. Aturan ini berlaku untuk analisa, perubahan, refactor, dan review fitur Vue agar logika bisnis tetap berada di VM Pinia, state tetap terpisah, dan screen/modal tetap presentational.

---

## 2. Perencanaan

### 2.1 Visi Fitur

> **Checklist Pencegahan Kelalaian**: modul operasional outlet harian yang menggantikan checklist kertas. Admin mengonfigurasi kategori, kolom kategori, baris checklist, tipe jawaban, dan catatan master layanan. Enam kategori dan tata letak kolomnya dari PDF hanya sebagai data awal yang dapat diedit; pengguna dapat melakukan CRUD dan menentukan struktur yang sesuai dengan operasional mereka. Setiap shift berjalan dari snapshot template yang tidak dapat diubah dengan validasi cek ganda, pencatatan insiden, dan pelaporan penutupan shift.

### 2.2 Model Data: Kategori dan Pertanyaan Dinamis

```ts
type ShiftId = 'morning' | 'afternoon' | 'evening'
type UserRole = 'admin' | 'employee'
type CompletionStatus = 'pending' | 'complete' | 'not-applicable' | 'skipped'
type ColumnMode = 'input' | 'read-only'
type QuestionType = 'yes-no' | 'text' | 'number' | 'time' | 'choice'
type QuestionTypeId = 'qtype-yes-no' | 'qtype-text' | 'qtype-number' | 'qtype-time' | 'qtype-choice'

interface Outlet {
  id: string
  name: string
  address: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface Employee {
  id: string
  name: string
  position: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface CaptainAssignment {
  id: string
  outletId: string
  employeeId: string
  employeeName: string // Denormalized for display in history views.
  assignedAt: string // ISO date-time
  releasedAt?: string // ISO date-time; undefined means this is the current captain.
  assignedBy: string // User who made the assignment.
}

interface AnswerType {
  id: QuestionTypeId | string
  code: QuestionType
  name: string
  description: string
  hasOptions: boolean
  isSystem: boolean
  isActive: boolean
}

interface ChecklistCategory {
  id: string
  name: string
  description: string
  columns: ChecklistColumn[]
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Column definitions belong to a category and are fully user-configurable.
interface ChecklistColumn {
  id: string
  categoryId: string
  name: string
  dataTypeId: string
  mode: ColumnMode
  isRequired: boolean
  options?: string[]
  serviceMasterId?: string // Used when the column references the service master.
  order: number
  isActive: boolean
}

interface ServiceMasterItem {
  id: string
  code: string
  name: string
  description: string
  isSystem: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface ChecklistQuestion {
  id: string
  categoryId: string
  name: string
  answerTypeId: string
  type: QuestionType // Resolved by the ViewModel from answerTypeId.
  options?: string[]
  serviceIds: string[] // References user-managed service master records.
  executor?: string
  controller?: string
  requiresCheckTime?: boolean
  requiresDoubleCheck?: boolean
  requiresFinalChecker?: boolean
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface CheckRecord {
  value: string | number | boolean
  actorId: string
  actorName: string
  checkedAt: string
}

// Immutable question snapshot plus mutable answers for a session.
interface SessionItem {
  questionId: string
  categoryId: string
  categoryName: string
  name: string
  columns: ChecklistColumn[] // Immutable category-column snapshot.
  columnValues: Record<string, string | number | boolean | null>
  answerTypeId: string
  type: QuestionType
  options?: string[]
  serviceIds: string[]
  requiresCheckTime?: boolean
  requiresDoubleCheck?: boolean
  requiresFinalChecker?: boolean
  order: number
  status: CompletionStatus
  check1?: CheckRecord
  check2?: CheckRecord
  finalChecker?: CheckRecord
  checkTime?: string
  skipReason?: string
}

interface ChecklistSession {
  id: string
  templateVersion: string
  outletId: string
  outletName: string
  date: string // ISO date
  shift: ShiftId
  captainId: string // Captured from the active CaptainAssignment at session start.
  captainName: string
  items: SessionItem[]
  incidents: ChecklistIncident[]
  closure?: ShiftClosure
  startedAt: string
  closedAt?: string
}

interface ChecklistIncident {
  id: string
  occurredAt: string
  service: 'di' | 'ta'
  itemType: 'rice' | 'sambal' | 'chicken' | 'ganje'
  orderNo: string
  officerName: string
  cause: string
  resolution: string
  resolved: boolean
}

interface ShiftClosure {
  complaintCount: Record<'rice' | 'sambal' | 'chicken' | 'ganje', number>
  taSampleChecked: number
  diSampleChecked: number
  leftoverNotes: string
  reportedTo: string
  captainSignOff: string
  closedAt: string
}
```

Category columns are configured by users rather than fixed in the application. A column definition includes its label, data type, value owner (`input` untuk Admin atau `read-only` untuk Karyawan), required flag, order, and any type-specific options. `No` pada PDF tidak dijadikan kolom konfigurasi karena nomor hanya dibuat saat rendering laporan/checklist; kolom seed yang dapat dikonfigurasi meliputi `Layanan`, `Item yang dicek`, `Ya`, `Tidak`, `Pelaksana`, `Kontrol`, dan `Jam cek`. Users can add, edit, reorder, archive, or delete columns subject to snapshot/history guards. `Layanan` is a separate user-managed master, seeded initially with `Semua`, `DI`, and `TA`; category columns and checklist items reference service records by ID, not hard-coded enum values. These Indonesian labels are shown to users and may remain Indonesian.

Kebijakan penentuan nilai kolom: pada form kolom, admin memilih **Nilai ditentukan oleh** dengan dua pilihan, yaitu **Admin** (`input`) atau **Karyawan** (`read-only`). Jika dipilih Admin, nilai kolom dapat diinput dan divalidasi sesuai tipe datanya pada form pertanyaan kategori seperti `/checklist/persiapan-shift`. Jika dipilih Karyawan, kontrol pada form pertanyaan kategori ditampilkan read-only dengan keterangan **di isi oleh karyawan**; nilai kolom tersebut tidak diubah melalui form konfigurasi/pertanyaan dan perilakunya tetap disimpan dalam snapshot kolom sesi.

Kebijakan data awal PDF: semua kolom operasional ditentukan oleh **Karyawan**, kecuali kolom pertanyaan utama—`Item yang dicek`, `Langkah`, `Item`, dan `Tindakan`—yang tetap ditentukan oleh **Admin**. Artinya admin mengelola redaksi pertanyaan, sedangkan kolom operasional seperti `Layanan`, jawaban, status, waktu, pelaksana, dan kontrol menjadi bagian input/read-only milik karyawan sesuai konteks penggunaannya. Kolom `No` tidak disimpan sebagai kolom master karena nomor hanya dihasilkan pada laporan.

Completion status is separate from answer values so each data type can be validated correctly. A `not-applicable` or `skipped` item requires a reason. Required Check 1, Check 2, and final-checker records are stored separately with actor identity and timestamps. Session snapshots retain category column definitions, service labels/IDs, question wording, and validation configuration used when the session began. Read-only columns are rendered as display values and cannot be edited through the session UI; input columns are validated by their configured data type.

### 2.3 Arsitektur dan Struktur Fitur

```text
src/features/outlet/
  README.md
  type/outletTypes.ts
  state/outletState.ts
  repository/
    outletRepository.ts              # repository contract
    localOutletRepository.ts         # local implementation for prototype
    remoteOutletRepository.ts        # API implementation when available
  vm/
    useOutletVm.ts                   # shared outlet domain operations
    useOutletScreenVm.ts             # OutletScreen state and orchestration
    useOutletFormVm.ts               # OutletFormModal state and validation
    useCaptainHistoryVm.ts           # CaptainHistorySection state and history queries
  screen/
    OutletScreen.vue
    OutletFormModal.vue
    CaptainHistorySection.vue

src/features/employee/
  README.md
  type/employeeTypes.ts
  state/employeeState.ts
  repository/
    employeeRepository.ts            # repository contract
    localEmployeeRepository.ts       # local implementation for prototype
    remoteEmployeeRepository.ts      # API implementation when available
  vm/
    useEmployeeVm.ts                 # shared employee domain operations
    useEmployeeScreenVm.ts           # EmployeeScreen state and orchestration
    useEmployeeFormVm.ts             # EmployeeFormModal state and validation
  screen/
    EmployeeScreen.vue
    EmployeeFormModal.vue

src/features/checklist/
  README.md
  type/checklistTypes.ts
  state/
    checklistMasterState.ts
    checklistAnswerTypeState.ts
    checklistServiceState.ts
    checklistSessionState.ts
  repository/
    checklistRepository.ts
    localChecklistRepository.ts
    remoteChecklistRepository.ts
  vm/
    useChecklistMasterVm.ts          # shared category/question domain operations
    useChecklistCategoryScreenVm.ts  # ChecklistCategoryScreen state and orchestration
    useCategoryFormVm.ts             # CategoryFormModal state and validation
    useChecklistQuestionScreenVm.ts # ChecklistQuestionScreen state and orchestration
    useQuestionFormVm.ts             # QuestionFormModal state and validation
    useChecklistAnswerTypeVm.ts     # shared answer-type domain operations
    useAnswerTypeScreenVm.ts        # ChecklistAnswerTypesScreen state and orchestration
    useAnswerTypeFormVm.ts           # AnswerTypeFormModal state and validation
    useChecklistServiceVm.ts         # shared service domain operations
    useServiceScreenVm.ts            # ChecklistServicesScreen state and orchestration
    useServiceFormVm.ts              # ServiceFormModal state and validation
    useChecklistVm.ts                # shared session domain operations
    useChecklistScreenVm.ts          # ChecklistScreen state and orchestration
    useChecklistIncidentFormVm.ts   # ChecklistIncidentModal state and validation
    useChecklistClosureFormVm.ts    # ChecklistClosureModal state and validation
  screen/
    ChecklistScreen.vue
    ChecklistIncidentModal.vue
    ChecklistClosureModal.vue
    ChecklistCategoryScreen.vue
    CategoryFormModal.vue
    ChecklistQuestionScreen.vue
    QuestionFormModal.vue
    ChecklistAnswerTypesScreen.vue
    AnswerTypeFormModal.vue
    ChecklistServicesScreen.vue
    ServiceFormModal.vue
```

Fitur auth (src/features/auth/) mengelola login, pemilihan peran, dan state sesi. Ini bukan bagian dari folder fitur checklist; ini adalah concern lintas-fitur yang sudah ada yang dibaca oleh checklist.

Aturan dependensi bersifat wajib:

- Layar Vue hanya boleh memanggil view model dan merender state yang diekspos; tidak boleh memanggil repository atau data source secara langsung.
- Setiap view model adalah Pinia store yang dibuat dengan `defineStore`. Satu screen atau form tidak boleh berbagi file VM dengan screen atau form lain.
- VM screen memiliki state tampilan, filter, loading, pagination, dialog visibility, dan orkestrasi aksi layar.
- VM form memiliki state field, dirty state, validasi input, submit state, dan transformasi payload form.
- VM domain/shared memiliki operasi bisnis dan akses repository yang dapat digunakan oleh VM screen dan VM form.
- Setiap state dan setiap view model memiliki file sumber sendiri. Satu file tidak boleh mendefinisikan beberapa objek state atau beberapa view model.
- View model membaca dan menulis melalui antarmuka repository, tidak pernah langsung melalui local storage atau HTTP client.
- Repository hanya menangani akses data dan serialisasi; tidak menentukan aturan bisnis.
- State menyediakan nilai awal dan bentuk state in-memory; tidak mengimplementasikan aksi atau persistensi.
- Pemilihan/konfigurasi repository berada di balik repository provider atau dependency factory sehingga sumber lokal dan remote dapat ditukar tanpa mengubah layar atau aturan bisnis.

Entri navigasi:

| ID | Label user | Bagian | Rute |
|---|---|---|---|
| `checklist` | Checklist Harian | Operasional | `/checklist` |
| `checklist-categories` | Kategori Checklist | Master | `/checklist-kategori` |
| `checklist-questions` | Pertanyaan Checklist | Master | `/checklist-pertanyaan` |
| `checklist-answer-types` | Tipe Jawaban | Master | `/checklist-tipe-jawaban` |
| `checklist-services` | Master Layanan | Master | `/checklist-layanan` |
| `outlets` | Master Warung | Master | `/outlets` |
| `employees` | Master Pegawai | Master | `/employees` |

Label-label ini dalam bahasa Indonesia karena ditampilkan kepada pengguna. Semua identifier kode sumber, komentar, dokumentasi, terminologi commit, dan deskripsi teknis dalam bahasa Inggris. URL dan string lain yang terlihat oleh pengguna boleh tetap dalam bahasa Indonesia.

Alur data: view model master memuat kategori, kolom kategori yang dapat dikonfigurasi, pertanyaan, tipe jawaban, dan catatan layanan dari repository. Ketika pengguna memulai sesi, `useChecklistVm` memperoleh template aktif melalui repository dan membuat snapshot kategori, kolom, pertanyaan, dan layanan yang tidak dapat diubah. Perubahan master selanjutnya tidak mengubah sesi yang aktif atau historis.

Alur data untuk screen dan form:

```text
Screen.vue -> useScreenVm.ts -> useDomainVm.ts -> Repository
FormModal.vue -> useFormVm.ts -> useDomainVm.ts -> Repository
```

`useScreenVm.ts` dan `useFormVm.ts` wajib berada di file yang berbeda dari komponen Vue dan dari VM komponen lain. Screen VM tidak boleh menampung state form; form VM tidak boleh menampung state daftar atau filter screen.


---


Spesifikasi lengkap desain UI/UX (Livin' by Mandiri style) dipindahkan ke docs/perencanaan-tema.md.

### 2.4 Validasi dan Aturan Sistem

1. Untuk item cek ganda TA, Cek 2 wajib dilakukan dan harus oleh aktor yang berbeda dari Cek 1.
2. A `no` answer in the pre-peak section displays a warning; stock below the one-third threshold displays a critical indicator. Stock threshold checks require an explicit measured quantity and target quantity, or must remain an operator-confirmed checklist answer.
3. Pesanan TA dengan lebih dari 20 kotak memerlukan pemeriksa akhir yang teridentifikasi. Jumlah kotak pesanan harus dicatat melalui kolom checklist atau catatan pesanan tertaut sebelum aturan ini dapat ditegakkan secara otomatis.
4. Nama kategori wajib dan unik setelah trimming dan normalisasi huruf. Teks pertanyaan wajib diisi.
5. Pertanyaan harus mereferensikan kategori aktif, menggunakan kolom kategori yang dikonfigurasi, memiliki urutan yang valid, dan mereferensikan catatan master layanan aktif bila berlaku.
6. Pertanyaan pilihan memerlukan minimal dua opsi yang tidak kosong dan unik.
7. Kategori dengan pertanyaan tidak dapat dihapus permanen. Dapat diarsipkan setelah pertanyaan aktif diarsipkan atau dipindahkan.
8. Pertanyaan yang dirujuk snapshot sesi tidak dapat dihapus permanen; arsipkan sebagai gantinya.
9. Setiap item pending harus diselesaikan, ditandai tidak berlaku, atau dilewati dengan alasan sebelum penutupan shift.
10. Hanya satu sesi terbuka yang boleh ada untuk kombinasi outlet + tanggal + shift.
11. Total insiden dihitung dari insiden sesi untuk penutupan dan pelaporan; tidak boleh dipelihara sebagai hitungan manual yang diedit terpisah.
12. Perubahan master tidak mengubah snapshot sesi yang aktif atau historis.
13. Nilai jawaban divalidasi berdasarkan tipe jawaban; status penyelesaian tidak disimpulkan dari truthiness jawaban (misalnya, angka nol adalah valid).
14. Sesi yang sudah ditutup tidak dapat diubah kecuali melalui alur koreksi/audit yang diotorisasi secara eksplisit.
15. Kolom kategori, catatan master layanan, dan data kategori/pertanyaan dikelola melalui CRUD oleh pengguna. Tidak ada kolom PDF atau nilai layanan yang menjadi enum sistem tetap.
16. Kolom kategori read-only tidak dapat diubah melalui aksi sesi checklist. Kolom input wajib harus valid dan lengkap sebelum barisnya dapat ditandai selesai.
17. Nama outlet wajib dan unik setelah trimming dan normalisasi huruf.
18. An outlet can have at most one active captain at a time. Assigning a new captain closes the previous assignment by setting `releasedAt`.
19. Penugasan kapten tidak pernah dihapus. Menonaktifkan pegawai yang saat ini menjadi kapten memerlukan penugasan ulang outlet terlebih dahulu.
20. Outlet yang dirujuk sesi tidak dapat dihapus permanen; arsipkan sebagai gantinya.
21. Checklist sessions capture the captain at session start from the active `CaptainAssignment`; changing the captain mid-shift does not alter an already-started session.
22. Role is selected at login from `Admin` or `Pegawai`; the `Masuk` button triggers authentication and navigation.
23. Admin memiliki akses penuh ke semua entri navigasi dan CRUD data master.
24. Employee has access only to `/checklist`; sidebar navigation hides all other entries.
25. View model harus memeriksa peran pengguna saat ini sebelum mengeksekusi mutasi data master atau menampilkan aksi khusus admin.
26. Auth state menyimpan peran yang dipilih dan mengeksposnya ke view model untuk pemeriksaan izin.

### 2.5 Fase Implementasi

| Fase | Lingkup | Estimasi |
|---|---|---:|
| 1 | Tipe, state awal, kontrak repository dan adapter lokal, template awal, view model Pinia, navigasi | 1 hari |
| 2 | Layar CRUD kategori, pertanyaan, dan tipe jawaban dengan validasi dan penjagaan di VM | 2 hari |
| 3 | Layar sesi dinamis, pembuatan snapshot, jawaban bertipe, dan progres | 2 hari |
| 4 | Validasi cek ganda/pemeriksa akhir, pencatatan insiden, dan penutupan shift | 2 hari |
| 5 | Persistensi lokal yang tahan lama, riwayat sesi, ekspor, dan laporan komplain | 2 hari |

### 2.6 Strategi Persistensi dan Repository

| Tahap | Perilaku repository |
|---|---|
| Prototype | `LocalChecklistRepository` persists master data and sessions in local storage. View models still use only the repository contract. |
| API integration | `RemoteChecklistRepository` implements the same contract using the REST API. Repository/provider configuration selects local or remote implementation. |
| Migrasi | Migrasi repository memetakan versi skema tersimpan sebelum mengembalikan data ke view model. Snapshot sesi mempertahankan versi skema/template masing-masing. |

Suggested local storage records are versioned collections, for example `checklist.master.v1` and `checklist.sessions.v1`, rather than one key per session. This supports listing history, migrations, and retention policy. If a 30-session retention limit is required, apply it only to closed sessions and document/export before removing older records. Do not silently remove active sessions.

Kontrak API potensial:

```text
GET/POST/PATCH/DELETE /checklist-categories
GET/POST/PATCH/DELETE /checklist-questions
GET/POST/PATCH/DELETE /checklist-answer-types
GET/POST/PATCH/DELETE /outlets
GET/POST/PATCH/DELETE /employees
GET/POST /outlets/:outletId/captain-assignments
POST /checklist-sessions
PATCH /checklist-sessions/:sessionId/items/:itemId
POST /checklist-sessions/:sessionId/incidents
POST /checklist-sessions/:sessionId/close
GET /checklist-reports
```

### 2.7 Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| Transkripsi manual 48 item dapat menimbulkan kesalahan | Bandingkan setiap bagian awal dengan PDF sumber |
| Kru mungkin lupa memulai sesi | Tambahkan pengingat pra-shift 30 menit di fase berikutnya |
| Kapasitas local storage terbatas | Definisikan retensi sesi tertutup dan ekspor; pertahankan sesi aktif |
| Sesi duplikat dapat tercipta saat retry API | Tegakkan batasan unik outlet + tanggal + shift di server dan gunakan idempotency key |
| Edit master dapat mengubah makna sesi lama | Simpan snapshot pertanyaan yang tidak dapat diubah dan versi skema/template |
| Pengguna mungkin menghapus data yang masih digunakan riwayat | Terapkan penjagaan arsip/hapus di view model dan tegakkan referensi di batasan repository/API |
| Penyimpanan hanya di klien dapat terhapus atau berbeda antar perangkat | Perlakukan local storage sebagai persistensi prototipe; gunakan repository server untuk penggunaan operasional bersama |

---

## 3. Spesifikasi Implementasi

### 3.1 Rencana File

| # | File | Aksi | Fase |
|---:|---|---|---:|
| 1 | `src/features/checklist/README.md` | Buat dokumentasi fitur | 1 |
| 2 | `src/features/checklist/type/checklistTypes.ts` | Buat tipe domain dan repository | 1 |
| 3 | `src/features/checklist/state/checklistMasterState.ts` | Buat state awal kategori, kolom, dan pertanyaan/data awal PDF | 1 |
| 4 | `src/features/checklist/state/checklistAnswerTypeState.ts` | Buat state awal tipe jawaban dan data awal sistem | 1 |
| 5 | `src/features/checklist/state/checklistServiceState.ts` | Buat state awal master layanan dan data awal | 1 |
| 6 | `src/features/checklist/state/checklistSessionState.ts` | Buat state awal sesi | 1 |
| 7 | `src/features/checklist/repository/checklistRepository.ts` | Buat kontrak repository | 1 |
| 8 | `src/features/checklist/repository/localChecklistRepository.ts` | Buat adapter local storage | 1 |
| 9 | `src/features/checklist/repository/remoteChecklistRepository.ts` | Buat adapter API ketika API tersedia | 5 |
| 10 | `src/features/checklist/vm/useChecklistMasterVm.ts` | Buat logika bisnis dan orkestrasi kategori/kolom/pertanyaan | 1 |
| 11 | `src/features/checklist/vm/useChecklistAnswerTypeVm.ts` | Buat logika bisnis tipe jawaban dan penjagaan | 1 |
| 12 | `src/features/checklist/vm/useChecklistServiceVm.ts` | Buat logika bisnis master layanan dan penjagaan | 1 |
| 13 | `src/features/checklist/vm/useChecklistVm.ts` | Buat logika sesi, jawaban, insiden, penutupan, dan laporan | 1 |
| 14 | `src/core/vm/appState.ts` | Tambahkan entri navigasi | 1 |
| 15 | `src/features/checklist/screen/ChecklistCategoryScreen.vue` | Buat layar manajemen kategori dan kolom | 2 |
| 16 | `src/features/checklist/screen/CategoryFormModal.vue` | Buat form kategori | 2 |
| 17 | `src/features/checklist/screen/ChecklistQuestionScreen.vue` | Buat layar manajemen pertanyaan | 2 |
| 18 | `src/features/checklist/screen/QuestionFormModal.vue` | Buat form pertanyaan | 2 |
| 19 | `src/features/checklist/screen/ChecklistAnswerTypesScreen.vue` | Buat layar manajemen tipe jawaban | 2 |
| 20 | `src/features/checklist/screen/AnswerTypeFormModal.vue` | Buat form tipe jawaban | 2 |
| 21 | `src/features/checklist/screen/ChecklistServicesScreen.vue` | Buat layar manajemen master layanan | 2 |
| 22 | `src/features/checklist/screen/ServiceFormModal.vue` | Buat form layanan | 2 |
| 23 | `src/features/outlet/vm/useOutletVm.ts` | Buat CRUD outlet, penugasan kapten, dan logika riwayat | 1 |
| 24 | `src/features/employee/vm/useEmployeeVm.ts` | Buat CRUD pegawai dan validasi bisnis | 1 |
| 25 | `src/features/outlet/screen/OutletScreen.vue` | Buat layar manajemen outlet dengan penugasan kapten | 2 |
| 26 | `src/features/outlet/screen/OutletFormModal.vue` | Buat form outlet dengan pemilih kapten | 2 |
| 27 | `src/features/employee/screen/EmployeeScreen.vue` | Buat layar manajemen pegawai | 2 |
| 28 | `src/features/employee/screen/EmployeeFormModal.vue` | Buat form pegawai | 2 |
| 29 | `src/features/checklist/screen/ChecklistScreen.vue` | Buat layar sesi dinamis | 3 |
| 30 | `src/features/checklist/screen/ChecklistIncidentModal.vue` | Buat form insiden | 4 |
| 31 | `src/features/checklist/screen/ChecklistClosureModal.vue` | Buat form penutupan shift | 4 |
| 32 | `src/features/outlet/vm/useOutletScreenVm.ts` | Buat VM untuk `OutletScreen.vue` | 2 |
| 33 | `src/features/outlet/vm/useOutletFormVm.ts` | Buat VM untuk `OutletFormModal.vue` | 2 |
| 34 | `src/features/outlet/vm/useCaptainHistoryVm.ts` | Buat VM untuk `CaptainHistorySection.vue` | 2 |
| 35 | `src/features/employee/vm/useEmployeeScreenVm.ts` | Buat VM untuk `EmployeeScreen.vue` | 2 |
| 36 | `src/features/employee/vm/useEmployeeFormVm.ts` | Buat VM untuk `EmployeeFormModal.vue` | 2 |
| 37 | `src/features/checklist/vm/useChecklistCategoryScreenVm.ts` | Buat VM untuk `ChecklistCategoryScreen.vue` | 2 |
| 38 | `src/features/checklist/vm/useCategoryFormVm.ts` | Buat VM untuk `CategoryFormModal.vue` | 2 |
| 39 | `src/features/checklist/vm/useChecklistQuestionScreenVm.ts` | Buat VM untuk `ChecklistQuestionScreen.vue` | 2 |
| 40 | `src/features/checklist/vm/useQuestionFormVm.ts` | Buat VM untuk `QuestionFormModal.vue` | 2 |
| 41 | `src/features/checklist/vm/useAnswerTypeScreenVm.ts` | Buat VM untuk `ChecklistAnswerTypesScreen.vue` | 2 |
| 42 | `src/features/checklist/vm/useAnswerTypeFormVm.ts` | Buat VM untuk `AnswerTypeFormModal.vue` | 2 |
| 43 | `src/features/checklist/vm/useServiceScreenVm.ts` | Buat VM untuk `ChecklistServicesScreen.vue` | 2 |
| 44 | `src/features/checklist/vm/useServiceFormVm.ts` | Buat VM untuk `ServiceFormModal.vue` | 2 |
| 45 | `src/features/checklist/vm/useChecklistScreenVm.ts` | Buat VM untuk `ChecklistScreen.vue` | 3 |
| 46 | `src/features/checklist/vm/useChecklistIncidentFormVm.ts` | Buat VM untuk `ChecklistIncidentModal.vue` | 4 |
| 47 | `src/features/checklist/vm/useChecklistClosureFormVm.ts` | Buat VM untuk `ChecklistClosureModal.vue` | 4 |

### 3.2 Pekerjaan per Fase

**Fase 1 - Fondasi**

1. Define domain, session, repository, and state types in `checklistTypes.ts`.
2. Seed six editable categories, their PDF-derived columns and 48 questions in `checklistMasterState.ts`; seed `Semua`, `DI`, and `TA` service records in `checklistServiceState.ts` and system answer types in `checklistAnswerTypeState.ts`; keep session state in `checklistSessionState.ts`.
3. Definisikan operasi repository untuk memuat/menyimpan data master dan sesi; implementasikan adapter lokal tanpa keputusan bisnis.
4. Implementasikan view model Pinia. Semua aturan CRUD, pembuatan snapshot, pemeriksaan penyelesaian, dan orkestrasi berada di view model.
5. Add navigation entries in `appState.ts` for the checklist, categories, questions, answer types, service master, outlet, and employee.
6. Implementasikan view model Pinia outlet dan pegawai dengan CRUD dan logika penugasan kapten.
7. Perbarui layar auth dengan pemilih peran (Admin / Pegawai) dan tombol Masuk; simpan peran yang dipilih di auth state.

**Fase 2 - Manajemen master**

1. Bangun layar daftar dan form kategori.
2. Bangun desainer kolom kategori untuk kolom dinamis, tipe data, mode input/read-only, flag wajib, pengurutan, dan opsi.
3. Bangun layar daftar dan form pertanyaan, termasuk opsi jawaban dinamis dan referensi master layanan.
4. Bangun layar daftar/form tipe jawaban, master layanan, outlet, dan pegawai.
5. Bangun tampilan penugasan dan riwayat kapten outlet.
6. Implementasikan penjagaan keunikan, referensi, arsip, penghapusan, dan data master di view model.

**Fase 3 - Sesi dinamis**

1. Bangun judul checklist, detail sesi, dan tampilan progres.
2. Render kategori dan item berurutan dari snapshot sesi.
3. Render kontrol berdasarkan tipe jawaban dan ekspos aksi yang mendelegasikan ke view model.
4. Simpan perubahan melalui panggilan repository yang diinisiasi view model.

**Fase 4 - Validasi dan dialog**

1. Tegakkan catatan Cek 1 dan Cek 2 terpisah dan tolak identitas aktor yang sama.
2. Catat identitas pemeriksa akhir pesanan besar bila berlaku.
3. Bangun pencatatan insiden dan hitung total komplain penutupan dari insiden.
4. Bangun penutupan shift dan tolak penutupan selama masih ada item pending.
5. Tegakkan akses berbasis peran: sembunyikan navigasi non-checklist untuk peran pegawai dan tolak mutasi data master dari panggilan view model non-admin.

**Fase 5 - Riwayat dan laporan**

1. Tambahkan persistensi lokal berversi dan migrasi repository.
2. Tambahkan riwayat sesi dan ekspor.
3. Tambahkan ringkasan komplain per outlet dan rentang tanggal.
4. Tambahkan implementasi repository remote ketika endpoint API tersedia.

### 3.3 Kriteria Penerimaan

- [ ] Data master awal berisi enam kategori yang dapat diedit, tata letak kolom yang dapat diedit dari PDF, dan 48 pertanyaan; tidak ada nama kategori, jumlah, huruf, kolom, atau posisi yang di-hard-code sebagai aturan sistem.
- [ ] Pengguna dapat melakukan CRUD kolom kategori dan mengonfigurasi tipe data, mode input/read-only, status wajib, urutan, dan opsi setiap kolom.
- [ ] Kolom read-only tidak dapat diedit di sesi; kolom input memvalidasi nilai berdasarkan tipe data yang dikonfigurasi.
- [ ] Master layanan dikelola melalui CRUD oleh pengguna dan diinisialisasi dengan `Semua`, `DI`, dan `TA`; kategori/pertanyaan mereferensikan layanan berdasarkan ID.
- [ ] Pengguna dapat membuat, mengedit, mengurutkan ulang, mengarsipkan, dan menghapus kategori sesuai penjagaan referensi.
- [ ] Pengguna dapat membuat, mengedit, mengurutkan ulang, mengarsipkan, dan menghapus pertanyaan sesuai penjagaan riwayat sesi.
- [ ] Tipe jawaban sistem tersedia; tipe jawaban yang dikelola pengguna mengikuti penjagaan tipe sistem.
- [ ] Form pertanyaan memilih tipe jawaban dari data master, bukan dari daftar UI yang di-hard-code.
- [ ] Layar hanya memanggil view model; view model memiliki logika bisnis dan menggunakan repository untuk akses data.
- [ ] Setiap view model diimplementasikan sebagai Pinia store sendiri menggunakan `defineStore`.
- [ ] Setiap screen memiliki VM screen tersendiri; tidak ada dua screen yang berbagi file VM.
- [ ] Setiap form/modal memiliki VM form tersendiri; tidak ada dua form/modal yang berbagi file VM.
- [ ] Screen VM hanya mengelola state tampilan dan orkestrasi screen; form VM hanya mengelola field, validasi, dan submit form.
- [ ] VM domain/shared hanya mengelola operasi bisnis bersama dan akses repository.
- [ ] File state hanya berisi state awal dan tidak berisi logika bisnis atau persistensi.
- [ ] Setiap state dan setiap view model didefinisikan dalam file terpisah.
- [ ] Sumber data lokal dan remote dapat dipilih di balik batasan repository.
- [ ] Sesi baru dibangun dari data master aktif dan mempertahankan snapshot pertanyaan yang tidak dapat diubah.
- [ ] Sesi terkait dengan outlet, tanggal, shift, dan kapten; hanya satu sesi terbuka untuk kombinasi tersebut.
- [ ] Cek 1 dan Cek 2 TA memerlukan identitas aktor yang berbeda.
- [ ] Pesanan TA lebih dari 20 kotak memerlukan pemeriksa akhir ketika jumlah pesanan tersedia.
- [ ] Catatan insiden menjadi sumber total penutupan dan laporan komplain.
- [ ] Penutupan shift diblokir selama masih ada item pending; item skipped/not-applicable memerlukan alasan.
- [ ] Rute navigasi user muncul di sidebar: `/checklist`, `/checklist-kategori`, `/checklist-pertanyaan`, `/checklist-tipe-jawaban`, `/checklist-layanan`, `/outlets`, dan `/employees`.
- [ ] Riwayat sesi dan ekspor tersedia ketika Fase 5 selesai.
- [ ] Laporan komplain dapat difilter per outlet dan periode ketika Fase 5 selesai.
- [ ] Master outlet dikelola melalui CRUD dengan nama unik dan status aktif.
- [ ] Master pegawai dikelola melalui CRUD dengan nama dan posisi.
- [ ] Satu outlet maksimal satu kapten aktif; penugasan ulang menutup penugasan sebelumnya.
- [ ] Riwayat penugasan kapten terjaga dan dapat dicari per outlet.
- [ ] Sesi checklist mencatat identitas kapten saat sesi dimulai.
- [ ] Layar login menampilkan pemilih peran dengan opsi `Admin` dan `Pegawai` serta tombol `Masuk`.
- [ ] Pengguna admin melihat semua entri navigasi sidebar setelah login.
- [ ] Pengguna pegawai hanya melihat `/checklist` di sidebar setelah login.
- [ ] View model menolak mutasi data master dari peran non-admin.
- [ ] `npm run typecheck` completes without errors.

### Status Implementasi Data Seed

Data seed di `src/features/checklist/state/checklistQuestionsState.ts` sudah diperbaiki agar sesuai dengan PDF sumber:

- **48 pertanyaan** dengan distribusi: A=15, B=9, C=8, D=8, E=3, F=5.
- **Label kategori mengikuti PDF**: `A. Prepare Awal Shift (30-60 menit sebelum buka)`, `B. Cek Ulang Sebelum Jam Ramai`, `C. Saat Pesanan Masuk dan Diproses`, `D. Pesanan Banyak / Jam Ramai`, `E. Jika Terjadi Ketinggalan atau Item Kurang/Salah`, dan `F. Penutupan Shift`.
- **Kolom per kategori mengikuti variasi PDF**, bukan kolom yang diseragamkan:
  - A: Layanan, Item yang dicek, Ya, Tidak, Pelaksana, Kontrol
  - B: Layanan, Item yang dicek, Ya, Tidak, Jam cek
  - C: Layanan, Langkah, Selesai
  - D: Layanan, Item, Ya, Tidak
  - E: Layanan, Tindakan, Selesai
  - F: Layanan, Item, Ya, Tidak
- Kolom dinamis dapat dikelola (CRUD) oleh admin melalui modal kelola kolom pada setiap card kategori.
- Kolom `No` tidak ikut disimpan pada konfigurasi kolom; nomor di-generate hanya pada tampilan laporan/checklist.
- Kebijakan pemilik nilai pada seed PDF: semua kolom milik **Karyawan**, kecuali kolom pertanyaan utama (`Item yang dicek`, `Langkah`, `Item`, `Tindakan`) yang milik **Admin**.

### Analisis dan Implementasi Grid Form Kolom Kategori

**Masalah sebelumnya:** form pertanyaan kategori hanya memakai satu pola lebar kolom, sehingga kolom panjang seperti layanan dan pertanyaan terpecah, sementara kontrol pendek menjadi terlalu lebar.

**Keputusan layout:** form memakai grid dua kolom sehingga satu baris maksimal memuat dua input. Setiap kolom kategori menyimpan `gridSpan` dengan hanya dua pilihan:

| Nilai `gridSpan` | Label admin | Arti tampilan |
|---:|---|---|
| `12` | Full Grid | Satu kolom memenuhi lebar form |
| `6` | Setengah (6 Grid) | Dua kolom tampil berdampingan |

**Nilai default:** kolom `Layanan` dan kolom pertanyaan utama memakai full grid; kolom lainnya memakai setengah grid. Dengan default ini, contoh PDF sumber langsung tampil sesuai kebutuhan: `Layanan` full, `Ya`/`Tidak` berdampingan, dan `Jam cek` setengah lebar.

**Dampak implementasi:**

- Admin dapat memilih lebar grid melalui modal **Kelola Kolom > Form Kolom**.
- Grid memakai `repeat(2, minmax(0, 1fr))`, sehingga tidak mungkin ada lebih dari dua input dalam satu baris.
- Full grid memakai `grid-column: 1 / -1`; setengah grid memakai satu kolom grid.
- Pada viewport di bawah `768px`, semua kolom dipaksa full agar form tetap nyaman diisi di ponsel.
### Lampiran: Perbandingan PDF Sumber vs Implementasi Sebelum Perbaikan

**Ringkasan temuan:** data seed sebelumnya tidak sesuai dengan PDF sumber pada tiga hal berikut:

**1. Jumlah pertanyaan per kategori**

| Kategori | PDF Sumber | Implementasi (seed lama) |
|---|---:|---:|
| A. Persiapan shift | 15 | 4 |
| B. Cek ulang sebelum jam ramai | 9 | 4 |
| C. Saat pesanan masuk/diproses | 8 | 4 |
| D. Pesanan banyak / jam ramai | 8 | 4 |
| E. Ketinggalan / item kurang-salah | 3 | 4 |
| F. Penutupan shift | 5 | 4 |
| **Total** | **48** | **24** |

**2. Kolom per kategori tidak sesuai PDF**

Seed lama menyeragamkan semua kategori dengan kolom yang sama (No, Layanan, Item yang dicek, Ya, Tidak, Pelaksana, Kontrol), padahal PDF memiliki variasi kolom per kategori:

- A: No, Layanan, Item yang dicek, Ya, Tidak, Pelaksana, Kontrol (cocok)
- B: No, Layanan, Item yang dicek, Ya, Tidak, Jam cek (Pelaksana/Kontrol salah)
- C: No, Layanan, Langkah, Selesai (kolom salah)
- D: No, Layanan, Item, Ya, Tidak (Pelaksana/Kontrol tidak ada di PDF)
- E: No, Layanan, Tindakan, Selesai (kolom salah)
- F: No, Layanan, Item, Ya, Tidak (kolom salah)

**3. Nama kategori sudah cocok dengan PDF** (hanya beda label minor).

Semua ketidaksesuaian di atas telah diperbaiki pada seed saat ini.

---

*Dokumen ini menganalisis PDF checklist sumber dan struktur aplikasi e-double-check.*
