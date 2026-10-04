# LensaKita Studio — Template Landing Page Fotografer

Landing page satu halaman yang modern dan elegan untuk bisnis fotografer,
dibangun dengan **Vite + React + TypeScript + Tailwind CSS**. Seluruh konten
berasal dari satu file sehingga mudah diganti saat template dijual ke klien.

## Menjalankan proyek

```bash
npm install
npm run dev      # server pengembangan
npm run build    # build produksi (tsc -b && vite build)
npm run preview  # pratinjau hasil build
npm run test     # menjalankan unit test (Vitest)
npm run lint     # pemeriksaan lint (oxlint)
```

## Cara mengganti konten

Semua konten diatur di **`src/lib/data.ts`**. Anda tidak perlu menyentuh
komponen untuk mengganti isinya. Berikut daftar yang perlu diperbarui:

| Bagian | Field / Objek | Keterangan |
| --- | --- | --- |
| Identitas bisnis | `siteConfig.businessName`, `siteConfig.shortName` | Nama studio di navbar & footer |
| Tagline & deskripsi | `siteConfig.tagline`, `siteConfig.description` | Kalimat singkat bisnis |
| **Nomor WhatsApp** | `siteConfig.whatsappNumber` | Format internasional tanpa `+`, contoh `6281234567890`. Semua tombol WhatsApp memakai nilai ini |
| Pesan WhatsApp default | `siteConfig.whatsappDefaultMessage` | Teks yang otomatis terisi saat klien membuka chat |
| Kontak | `siteConfig.email`, `phoneDisplay`, `address`, `mapsUrl`, `businessHours` | Info kontak di footer & CTA |
| Media sosial | `siteConfig.socials` | `label`, `href`, dan `icon` (instagram/facebook/tiktok/youtube/whatsapp) |
| Menu navigasi | `siteConfig.navLinks` | Tiap entri: `{ label, sectionId }` (menu biasa) atau `{ label, links: [...] }` (dropdown yang mengelompokkan beberapa menu, mis. "Info") |
| Tombol melayang | `siteConfig.showWhatsAppFab` | `true`/`false` untuk menampilkan tombol WhatsApp melayang |
| **Mode animasi** | `siteConfig.motion` | `'full'` (default: selalu animasikan penuh), `'auto'` (ikut preferensi OS), `'reduced'` (tanpa gerakan) |
| Video intro | `siteConfig.intro` | `videoSrc` (file di `public/videos/`) dan `oncePerSession` |
| Hero | `hero` | Headline, deskripsi, foto utama, label tombol, statistik |
| Tentang | `about` | Narasi, tahun pengalaman, keunggulan |
| Layanan | `services` | Judul, deskripsi, ikon, harga mulai |
| Portofolio | `portfolioCategories`, `portfolioItems` | Kategori filter + foto galeri |
| Harga | `pricingPackages` | Nama, harga, fitur, penanda paket populer |
| Testimoni | `testimonials` | Nama, peran, kutipan, rating, avatar |
| Alur pemesanan | `processSteps` | Langkah-langkah pemesanan |
| FAQ | `faqItems` | Pertanyaan & jawaban |
| CTA penutup | `closingCta` | Judul, deskripsi, label tombol |

### Mengganti gambar

URL gambar contoh ada di **`src/lib/images.ts`**. Ganti nilai `src` dengan URL
foto Anda sendiri (misalnya dari penyimpanan gambar atau folder `public/`).
Setiap gambar punya `fallbackLabel` yang tampil otomatis bila gambar gagal
dimuat, sehingga tata letak tidak pernah rusak.

### Efek & animasi

Template ini memakai Lenis (smooth scroll) + Framer Motion. Semua efek
menghormati preferensi "reduce motion" pengunjung, kecuali Anda mengubahnya:

```ts
// src/lib/data.ts
motion: 'full', // 'full' | 'auto' | 'reduced'
```

- `'full'` — animasi **selalu** dimainkan penuh, termasuk bila OS pengunjung
  meminta mengurangi gerakan (default, agar semua efek pasti terlihat).
- `'auto'` — ikut setelan OS pengunjung (paling aman secara aksesibilitas).
- `'reduced'` — tidak ada animasi gerak; efek visual (grain, vignette, cahaya)
  tetap tampil.

Efek sinematik bisa disetel di `src/index.css` (`.film-grain`, `.sheen`,
`.shimmer-text`, `.glow-pulse`, `@keyframes marquee`) dan di
`src/components/ui/CinematicOverlay.tsx` serta `CursorSpotlight.tsx`.
Untuk mematikan salah satunya, hapus komponennya dari `src/App.tsx`.

### Video intro

Intro menampilkan klip pendek sebagai latar:

```ts
// src/lib/data.ts
intro: {
  videoSrc: '/videos/intro-camera.mp4',
  oncePerSession: false,
},
```

- **Mengganti video** — taruh file Anda di `public/videos/` lalu ubah
  `videoSrc` (boleh juga URL penuh). Paling aman: MP4 (H.264), tanpa audio,
  1280×720, durasi 5–10 detik.
- **`oncePerSession: true`** — intro hanya tampil sekali per sesi browser,
  sehingga klip tidak diunduh ulang setiap halaman dimuat. Cocok untuk
  produksi. Nilai `false` membuat intro selalu tampil (enak untuk demo).
- Intro menunggu klip siap sebelum diputar, lalu menahannya sekitar 3,6 detik
  (`duration` pada `<IntroReveal />` di `src/App.tsx`).
- Ada batas tunggu 2,5 detik: bila video lambat atau gagal, intro tetap
  berjalan dan jatuh kembali ke tampilan teks polos — halaman tidak pernah
  terkunci di intro. Tombol **Lewati intro** selalu tersedia.

**Lisensi klip contoh** — `public/videos/intro-camera.mp4` berasal dari
[Mixkit](https://mixkit.co/free-stock-video/photographer/) ("View of a camera
lens held by a photographer"). Mixkit Free Stock Video License: gratis untuk
penggunaan komersial, tanpa atribusi. Untuk template yang dijual, sebaiknya
ganti dengan rekaman Anda sendiri.

### Daftar id section

Daftar `sectionId` yang valid untuk `siteConfig.navLinks`:
`home`, `about`, `services`, `portfolio`, `pricing`, `testimonials`,
`process`, `faq`, `contact`.

### Mengelompokkan menu

Menu yang terlalu panjang bisa diringkas lewat `links` (dropdown). Contoh di
`src/lib/data.ts`:

```ts
{ label: 'Info', links: [
  { label: 'Testimoni', sectionId: 'testimonials' },
  { label: 'FAQ', sectionId: 'faq' },
]},
```

## Struktur proyek

```
src/
├─ lib/          # data.ts (konten), images.ts, types.ts, whatsapp.ts
├─ hooks/        # useActiveSection, useSmoothScroll
├─ components/
│  ├─ ui/        # Button, SectionHeading, SmartImage, Reveal, Icon
│  ├─ layout/    # Navbar, Footer
│  ├─ sections/  # Hero, About, Services, Portfolio, Pricing,
│  │             # Testimonials, Process, Faq, CtaClosing
│  └─ WhatsAppFab.tsx
├─ App.tsx       # menyusun seluruh section
└─ main.tsx
```

## Catatan teknis

- Mengganti seluruh isi `src/lib/data.ts` cukup untuk memakai template ini
  untuk bisnis lain; id harus unik di setiap koleksi (diperiksa oleh test).
- Tidak ada backend: situs sepenuhnya statis dan dapat di-hosting di
  layanan statis apa pun (Netlify, Vercel, GitHub Pages, dll).
