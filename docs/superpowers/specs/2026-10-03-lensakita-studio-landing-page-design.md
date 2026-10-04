# LensaKita Studio — Landing Page Fotografi (Design Spec)

Tanggal: 2026-10-03
Status: Disetujui untuk masuk tahap implementation plan

## 1. Ringkasan

Landing page profesional untuk bisnis fotografer, dibangun **frontend-only** dengan
Vite + React + TypeScript, yang dirancang sebagai **template yang bisa dijual** ke
fotografer lain. Nama contoh: **LensaKita Studio**. Semua konten (nama bisnis, foto,
layanan, harga, testimoni, kontak, nomor WhatsApp) berasal dari **satu file konfigurasi**
`src/lib/data.ts` sehingga penggantian konten untuk klien = edit satu file.

Gaya visual: modern, elegan, berfokus pada foto, responsif desktop & mobile, navigasi
rapi, hierarki informasi jelas.

## 2. Goals

- Landing page satu halaman yang menarik secara visual dan berfokus pada fotografi.
- Semua section yang diminta hadir dan berfungsi penuh:
  Navbar, Hero, Tentang, Layanan, Portofolio (dengan filter), Harga, Testimoni,
  Alur Pemesanan, FAQ, CTA penutup, Footer.
- Tombol WhatsApp ke nomor contoh, **mudah diganti lewat satu konfigurasi**.
- Menu navigasi, filter portofolio, FAQ, dan semua CTA benar-benar berfungsi.
- Komponen React terstruktur & mudah dirawat; data terpisah dari tampilan.
- Tidak ada tautan kosong (`#`), teks placeholder, atau error di browser.
- Gambar berkualitas tinggi sebagai contoh, dengan fallback yang tidak merusak layout.
- `npm run build` lolos tanpa error dan situs siap dikembangkan lebih lanjut.

## 3. Non-Goals (eksplisit di luar cakupan)

- **Tanpa backend, tanpa database, tanpa CRUD.** Keputusan user: "landing page statis saja".
  Semua konten statis di `src/lib/data.ts`.
- Tanpa autentikasi / panel admin.
- Tanpa formulir kontak (permintaan user: jangan buat fitur yang hanya terlihat aktif
  tapi tidak merespons). Semua jalur "hubungi" diarahkan ke WhatsApp.
- Tanpa CMS eksternal.
- Tanpa i18n multi-bahasa (bahasa Indonesia saja).
- Tanpa e-commerce / pembayaran.

## 4. Tech Stack

| Area | Pilihan |
|------|---------|
| Build tool | Vite (`react-ts` template) |
| UI | React 18+ + TypeScript (strict) |
| Styling | Tailwind CSS (+ PostCSS, Autoprefixer) |
| Animasi | Framer Motion (motion) + transisi CSS/Tailwind |
| Testing | Vitest + @testing-library/react + jsdom |
| Lint | ESLint (config bawaan Vite react-ts) |
| Package manager | npm |

## 5. Arsitektur (Pendekatan A — Content-driven modular sections)

`src/lib/data.ts` adalah satu-satunya sumber kebenaran konten. Setiap bagian halaman =
satu komponen section mandiri yang membaca dari `data.ts`. `App.tsx` hanya menyusun
section. Tidak ada komponen yang menulis konten hardcoded.

### Struktur file

```
LensaKita-Studio/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json / tsconfig.node.json
├─ eslint.config.js
├─ vitest.config.ts (atau config di vite.config.ts)
├─ README.md
├─ docs/superpowers/specs/2026-10-03-lensakita-studio-landing-page-design.md
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ index.css
   ├─ vite-env.d.ts
   ├─ lib/
   │  ├─ types.ts        # tipe konten
   │  ├─ data.ts         # seluruh konten contoh (LensaKita Studio)
   │  ├─ whatsapp.ts     # buildWhatsAppUrl()
   │  └─ images.ts       # helper URL gambar contoh + placeholder fallback
   ├─ components/
   │  ├─ ui/
   │  │  ├─ Button.tsx
   │  │  ├─ SectionHeading.tsx
   │  │  ├─ SmartImage.tsx
   │  │  ├─ Reveal.tsx          # wrapper animasi scroll (Framer Motion)
   │  │  └─ Icon.tsx            # ikon SVG inline (tanpa dependency ikon)
   │  ├─ layout/
   │  │  ├─ Navbar.tsx
   │  │  └─ Footer.tsx
   │  ├─ sections/
   │  │  ├─ Hero.tsx
   │  │  ├─ About.tsx
   │  │  ├─ Services.tsx
   │  │  ├─ Portfolio.tsx
   │  │  ├─ Pricing.tsx
   │  │  ├─ Testimonials.tsx
   │  │  ├─ Process.tsx
   │  │  ├─ Faq.tsx
   │  │  └─ CtaClosing.tsx
   │  └─ WhatsAppFab.tsx
   └─ hooks/
      ├─ useActiveSection.ts
      └─ useSmoothScroll.ts
```

## 6. Data Model (`src/lib/types.ts`)

```ts
export type SectionId =
  | 'home' | 'about' | 'services' | 'portfolio'
  | 'pricing' | 'testimonials' | 'process' | 'faq' | 'contact';

export interface NavLink { label: string; sectionId: SectionId; }

export interface SocialLink { label: string; href: string; icon: SocialIcon; }

export type SocialIcon = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'whatsapp';

export interface SiteConfig {
  businessName: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsappNumber: string;        // format internasional tanpa '+', mis. "6281234567890"
  whatsappDefaultMessage: string;
  email: string;
  phoneDisplay: string;
  address: string;
  mapsUrl: string;
  mapsEmbedUrl?: string;
  businessHours: string;
  navLinks: NavLink[];
  socials: SocialLink[];
  showWhatsAppFab: boolean;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: { label: string; targetSectionId: SectionId };
  secondaryCta: { label: string };
  image: ImageAsset;
  imageAlt: string;
  stats: { value: string; label: string }[];
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  experienceYears: number;
  image: ImageAsset;
  imageAlt: string;
  advantages: { title: string; description: string; icon: IconName }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  startingPrice?: string;
}

export interface PortfolioCategory { id: string; label: string; }

export interface PortfolioItem {
  id: string;
  title: string;
  categoryId: string;
  image: ImageAsset;
  alt: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar: ImageAsset;
  avatarAlt: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface FaqItem { id: string; question: string; answer: string; }

export interface ClosingCta {
  heading: string;
  description: string;
  ctaLabel: string;
}

export interface ImageAsset {
  src: string;                 // URL gambar contoh / lokal
  fallbackLabel: string;       // teks pada fallback bila gambar gagal
}

export type IconName =
  | 'camera' | 'heart' | 'users' | 'calendar' | 'package' | 'graduation'
  | 'sparkles' | 'star' | 'check' | 'arrow-right' | 'award' | 'clock';
```

## 7. Content Inventory (`src/lib/data.ts`)

Konten contoh nyata (bukan placeholder) untuk LensaKita Studio:

- **siteConfig**: nama "LensaKita Studio", tagline "Momen berharga, dikenang selamanya",
  WhatsApp `6281234567890` (contoh), email `hello@lensakita.studio`,
  alamat contoh di Sekarteja, jam operasional, 5 sosial media.
- **navLinks**: Beranda, Tentang, Layanan, Portofolio, Harga, Testimoni, FAQ, Kontak.
- **hero**: headline kuat, deskripsi, foto utama, tombol "Lihat Portofolio" &
  "Hubungi Kami", statistik (mis. 500+ sesi, 8 tahun, 1.2k foto).
- **about**: cerita studio, 8 tahun pengalaman, 3–4 keunggulan (fotografer berpengalaman,
  editing profesional, hasil cepat, harga transparan).
- **services** (5): Pernikahan, Wisuda, Keluarga, Acara, Foto Produk — masing-masing
  deskripsi + harga mulai.
- **portfolio**: kategori (Semua, Pernikahan, Wisuda, Keluarga, Acara, Produk) dan
  9–12 item contoh dengan gambar berkualitas tinggi.
- **pricing**: 3 paket (mis. Paket Personal, Paket Signature/highlighted, Paket Premium)
  dengan daftar fitur dan tombol "Tanya Paket Ini".
- **testimonials** (4–6): nama, peran, kutipan, rating, avatar.
- **process** (5 langkah): Konsultasi → Booking & DP → Sesi Foto → Editing → Foto Diterima.
- **faq** (6): pertanyaan umum (durasi sesi, revisi, file mentah, pembayaran, lokasi,
  cara reschedule) dengan jawaban lengkap.
- **closingCta**: ajakan memesan sesi.

Gambar contoh: URL Unsplash (fotografi berkualitas tinggi) yang stabil & relevan.
Setiap `ImageAsset` punya `fallbackLabel` untuk `SmartImage`.

## 8. Spesifikasi Komponen

**UI**
- `Button` — varian `primary` / `secondary` / `ghost`; mendukung `as` link (`<a>`) atau
  `<button>`; ikon opsional; ukuran `md`/`lg`; state focus/hover/active; `disabled` nyata
  (tidak dipakai untuk tombol yang harus berfungsi).
- `SectionHeading` — eyebrow + judul + deskripsi opsional; hierarki heading konsisten.
- `SmartImage` — wrapper `<img>` dengan rasio aspek tetap, `object-cover`, skeleton saat
  memuat, `loading="lazy"`, `decoding="async"`, dan **fallback saat `onError`**.
- `Reveal` — wrapper animasi masuk saat masuk viewport via Framer Motion; menghormati
  `prefers-reduced-motion`.
- `Icon` — kumpulan ikon SVG inline (tanpa dependency).

**Layout**
- `Navbar` — sticky, transparan lalu solid saat scroll; logo (`shortName`); menu dari
  `navLinks` (anchor scroll); tombol "Konsultasi" → WhatsApp; mobile hamburger.

**Sections** — masing-masing membaca dari `data.ts`, tanpa teks hardcoded.

## 9. Perilaku Interaktif

- **Navbar**: anchor-scroll halus (`useSmoothScroll`); link aktif ditandai via
  `useActiveSection` (IntersectionObserver); mobile menu slide + auto-close + scroll-lock.
- **Hero**: "Lihat Portofolio" → scroll ke `#portfolio`; "Hubungi Kami" → WhatsApp.
- **Portofolio**: filter kategori (termasuk "Semua") dengan state client; grid responsif;
  animasi `AnimatePresence` + `layout` Framer Motion saat filter berubah; kategori tanpa
  item tidak ditampilkan.
- **Harga**: tombol per paket → WhatsApp dengan pesan menyebut nama paket.
- **FAQ**: accordion buka/tutup, animasi tinggi, `aria-expanded`/`aria-controls`,
  dapat dioperasikan keyboard.
- **CTA penutup** & tombol CTA lain → WhatsApp.
- **WhatsApp**: `buildWhatsAppUrl()` membuat `https://wa.me/<nomor>?text=<pesan>` dari
  `siteConfig`; pesan di-`encodeURIComponent`. Nomor dinormalisasi (hapus spasi/`+`).
- **Footer**: kontak (telepon, email, alamat → maps), sosial media (link nyata,
  `target="_blank"` + `rel="noopener noreferrer"`), informasi bisnis & jam operasional.
- **WhatsAppFab**: tombol melayang, hanya tampil bila `siteConfig.showWhatsAppFab`.

## 10. Ketahanan Gambar

- Semua gambar punya rasio aspek tetap (container `aspect-*` + `object-cover`) sehingga
  layout tidak bergeser saat gambar memuat atau gagal.
- `onError` pada `<img>` → tampilkan fallback gradient + ikon + `fallbackLabel`,
  bukan broken-image.
- Skeleton shimmer selama memuat.
- `alt` bermakna pada semua gambar (dari data).

## 11. Aksesibilitas

- Landmark semantik: `header`, `nav`, `main`, `section`, `footer`.
- Heading hierarkis (satu `h1` di Hero).
- Fokus terlihat; kontras warna memadai di latar terang/gelap.
- Animasi menghormati `prefers-reduced-motion`.
- Semua kontrol interaktif dapat diakses keyboard.
- Tanpa `href="#"` dan tanpa teks placeholder.

## 12. Strategi Testing (Vitest + Testing Library + jsdom)

- `whatsapp.test.ts` — normalisasi nomor, encoding pesan, format URL.
- `Portfolio.test.tsx` — filter menampilkan subset benar; "Semua" menampilkan semua;
  kategori kosong tidak dirender.
- `Faq.test.tsx` — toggle buka/tutup; `aria-expanded` berubah.
- `data.test.ts` — integritas konten: id unik (per koleksi), array tidak kosong,
  tidak ada string placeholder ("lorem", "TODO", "xxx", "placeholder"), field wajib ada.
- `App.test.tsx` (smoke) — halaman render tanpa crash & section utama ada.

## 13. Build & Scripts

`package.json` script:
- `dev` — Vite dev server.
- `build` — `tsc -b && vite build`.
- `preview` — preview build produksi.
- `test` — `vitest run`.
- `test:watch` — `vitest`.
- `lint` — ESLint.

Definisi "selesai": `npm run build` lolos tanpa error, `tsc` bersih, `npm run test`
hijau, dan dev server memuat halaman tanpa error di console.

## 14. Success Criteria

1. Semua 11 bagian (Navbar, Hero, Tentang, Layanan, Portofolio, Harga, Testimoni, Alur,
   FAQ, CTA, Footer) tampil dan berfungsi.
2. Navigasi, filter portofolio, FAQ, dan semua CTA benar-benar bekerja.
3. Nomor WhatsApp dapat diganti dari satu tempat (`siteConfig`).
4. Konten terpisah dari tampilan: mengganti bisnis = edit `src/lib/data.ts`.
5. Gambar gagal dimuat tidak merusak layout (fallback tampil).
6. Tidak ada tautan kosong / teks placeholder / error browser.
7. Responsif di desktop & mobile.
8. `npm run build` lolos; siap dikembangkan lebih lanjut.

## 15. Panduan Kustomisasi (untuk pembeli template)

`README.md` menjelaskan: cara install, menjalankan dev, build, dan **daftar field di
`src/lib/data.ts`** yang perlu diganti (nama bisnis, WhatsApp, media sosial, layanan,
paket, testimoni, foto, FAQ) beserta cara mengganti gambar.

## 16. Catatan Keputusan

- Keputusan user: **frontend-only / landing page statis saja**; permintaan DB + full CRUD
  dibatalkan (akan menjadi proyek terpisah bila diinginkan nanti).
- Formulir kontak sengaja tidak dibuat agar tidak ada kontrol yang tampil aktif tapi tidak
  merespons; semua jalur kontak lewat WhatsApp / tautan nyata.
