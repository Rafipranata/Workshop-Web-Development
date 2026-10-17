# Blueprint Arsitektur CMS: Go, SQLite, Vue 3 & Sneat Admin (Tanpa Login)

Dokumen ini merupakan spesifikasi teknis dan rencana implementasi bagi autonomous agent (Antigravity IDE) untuk menghubungkan backend Go dengan database SQLite ke frontend Vue 3, serta mengintegrasikan template admin Sneat sebagai panel pengelolaan konten langsung untuk 4 halaman/section: Beranda, About, Layanan, dan Portofolio.

---

## 1. Ringkasan Eksekutif & Karakteristik Sistem

- Backend Go mandiri terhubung ke basis data lokal SQLite.
- CMS bersifat terbuka tanpa modul otentikasi/login; URL `/admin` langsung membuka dashboard manajemen section.
- Konten teks, gambar, dan detail pada 4 halaman/section publik (`/beranda`, `/about`, `/layanan`, `/portofolio`) dikelola penuh secara dinamis melalui dashboard admin Sneat.
- Template Sneat diadaptasi menjadi panel kendali menu-menu section yang responsif dan terintegrasi dengan REST API.

---

## 2. Struktur Direktori & Alokasi Peran

- `backend/`
  - Inisialisasi modul Go dan koneksi basis data SQLite.
  - Lapisan entitas model untuk skema tabel konten 4 section utama.
  - Lapisan repository untuk penanganan query baca dan pembaruan data SQLite.
  - Lapisan controller/handler untuk penyajian response JSON REST API.
  - Konfigurasi middleware CORS publik untuk menerima request dari origin frontend Vite.
  - Entry point server HTTP.

- `frontend/`
  - Konfigurasi Vue Router yang membagi rute publik dan rute panel admin Sneat.
  - Modul client HTTP untuk pemanggilan endpoint API backend.
  - Halaman publik pengunjung: Beranda, About, Layanan, dan Portofolio.
  - Layout admin Sneat lengkap dengan navigasi sidebar yang mengarah langsung ke menu 4 section.
  - Halaman form editor untuk masing-masing section:
    - Editor Beranda
    - Editor About
    - Editor Layanan
    - Editor Portofolio

- `sneat-1.0.0/`
  - Sumber aset visual (CSS Bootstrap/Sneat, icon Boxicons, modul tata letak UI).
  - Referensi konstruksi layout sidebar, header, dan card container form.

---

## 3. Desain Basis Data SQLite

### Tabel: contents
Tabel tunggal terpusat untuk menyimpan konfigurasi dan data setiap section:

- `id`: Tipe integer, primary key, auto-increment.
- `section_key`: Tipe string/text, unik, indeks utama pencarian. Nilai tetap:
  - `beranda`
  - `about`
  - `layanan`
  - `portofolio`
- `section_name`: Tipe string/text, label tampilan menu (contoh: "Konten Beranda", "Tentang Kami", "Layanan Kami", "Portofolio").
- `title`: Tipe string/text, menampung judul utama section.
- `subtitle`: Tipe string/text, menampung subjudul, tagline, atau deskripsi singkat.
- `body`: Tipe text, menampung deskripsi detail, narasi artikel, atau daftar data berformat teks.
- `image_url`: Tipe string/text, menampung path atau URL gambar banner/ilustrasi.
- `is_active`: Tipe integer (0 atau 1), status aktivasi section pada halaman publik.
- `updated_at`: Tipe timestamp/datetime, waktu pembaruan terakhir data.

---

## 4. Spesifikasi Kontrak REST API

Seluruh endpoint bersifat publik tanpa token autentikasi:

- `GET /api/v1/contents`
  - Mengambil data seluruh section sekaligus untuk kebutuhan rendering halaman publik dan ringkasan menu admin.

- `GET /api/v1/contents/:section_key`
  - Parameter URL: `beranda`, `about`, `layanan`, atau `portofolio`.
  - Mengambil data spesifik section untuk mengisi form input di admin Sneat.

- `PUT /api/v1/contents/:section_key`
  - Parameter URL: `beranda`, `about`, `layanan`, atau `portofolio`.
  - Memperbarui atribut `title`, `subtitle`, `body`, `image_url`, dan `is_active` berdasarkan masukan dari form admin Sneat.

---

## 5. Struktur Menu Navigasi Admin Sneat (Langsung Tanpa Login)

Akses rute `/admin` langsung menampilkan sidebar Sneat dengan struktur navigasi terarah:

- **Navigasi Utama Panel:**
  - **Dashboard Ringkasan** (`/admin`): Menampilkan status keaktifan dan ringkasan 4 section.
  - **Kelola Beranda** (`/admin/sections/beranda`): Form edit hero banner, judul utama, dan gambar latar beranda.
  - **Kelola About** (`/admin/sections/about`): Form edit profil, cerita singkat, dan media pendukung halaman tentang kami.
  - **Kelola Layanan** (`/admin/sections/layanan`): Form edit judul layanan, deskripsi fitur, dan cakupan servis yang ditawarkan.
  - **Kelola Portofolio** (`/admin/sections/portofolio`): Form edit judul galeri, deskripsi ringkas karya, dan tautan gambar portofolio.

- **Pembersihan Modul Autentikasi:**
  - Mengeliminasi seluruh form login, register, reset password, dan tombol aksi logout dari template Sneat.
  - Navbar atas difokuskan sebagai breadcrumb penunjuk section aktif dan tombol cepat untuk melihat halaman depan (live preview).

---

## 6. Pemetaan Halaman Publik

- Rute publik `/` atau `/beranda`: Menampilkan section beranda yang terhubung dengan data `section_key: beranda`.
- Rute publik `/about`: Menampilkan halaman profil yang terhubung dengan data `section_key: about`.
- Rute publik `/layanan`: Menampilkan daftar penawaran layanan yang terhubung dengan data `section_key: layanan`.
- Rute publik `/portofolio`: Menampilkan etalase karya/proyek yang terhubung dengan data `section_key: portofolio`.

---

## 7. Rencana Aksi Eksekusi Bertahap (Instruksi Kerja Agent)

1. **Fase Backend & Database:**
   - Inisialisasi modul Go pada direktori backend.
   - Buat skema SQLite murni tanpa CGO eksternal untuk tabel `contents`.
   - Jalankan seeding data awal berisi 4 baris data baku (`beranda`, `about`, `layanan`, `portofolio`).
   - Buat handler REST API untuk endpoint `GET` semua section, `GET` per key, dan `PUT` per key.
   - Aktifkan middleware CORS terbuka untuk akses lokal frontend.

2. **Fase Integrasi Template Sneat:**
   - Pindahkan aset CSS, library vendor, dan ikon Sneat ke folder proyek frontend.
   - Susun komponen `AdminLayout.vue` menggunakan struktur sidebar Sneat dengan link langsung ke 4 menu section.
   - Buat komponen form editor serbaguna yang menggunakan elemen card dan input form gaya Sneat.

3. **Fase Routing & Integrasi Data Frontend:**
   - Konfigurasi Vue Router:
     - Daftarkan 4 rute publik (`/beranda`, `/about`, `/layanan`, `/portofolio`).
     - Daftarkan rute admin (`/admin` dan `/admin/sections/:key`) yang dibungkus oleh `AdminLayout.vue`.
   - Hubungkan masing-masing halaman publik untuk membaca data dari API Go secara asinkron.
   - Hubungkan form submit admin ke endpoint pembaruan backend.

4. **Fase Uji Coba & Verifikasi:**
   - Jalankan server Go dan frontend Vite.
   - Buka `/admin/sections/beranda`, ubah judul teks, lalu simpan.
   - Buka halaman publik `/beranda` dan pastikan judul teks baru telah tampil tanpa restart aplikasi.
   - Ulangi pengujian verifikasi data pada halaman About, Layanan, dan Portofolio.