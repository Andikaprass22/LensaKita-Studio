import { images } from './images'
import type {
  AboutContent,
  ClosingCta,
  FaqItem,
  HeroContent,
  PortfolioCategory,
  PortfolioItem,
  PricingPackage,
  ProcessStep,
  Service,
  SiteConfig,
  Testimonial,
} from './types'

export const siteConfig: SiteConfig = {
  businessName: 'LensaKita Studio',
  shortName: 'LensaKita',
  tagline: 'Momen berharga, dikenang selamanya',
  description:
    'LensaKita Studio adalah jasa fotografi profesional di Sekarteja untuk pernikahan, wisuda, keluarga, acara, dan foto produk. Kami menangkap setiap emosi dengan cahaya dan komposisi yang hangat.',
  whatsappNumber: '6281234567890',
  whatsappDefaultMessage:
    'Halo LensaKita Studio! Saya ingin bertanya tentang jadwal dan paket sesi foto.',
  motion: 'full',
  intro: {
    videoSrc: '/videos/intro-camera.mp4',
    oncePerSession: false,
  },
  email: 'hello@lensakita.studio',
  phoneDisplay: '+62 812-3456-7890',
  address: 'Jl. Raya Sekarteja No. 24, Sekarteja, Indonesia',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sekarteja',
  businessHours: 'Senin–Sabtu, 09.00–18.00 WIB',
  navLinks: [
    { label: 'Beranda', sectionId: 'home' },
    { label: 'Tentang', sectionId: 'about' },
    { label: 'Layanan', sectionId: 'services' },
    { label: 'Portofolio', sectionId: 'portfolio' },
    { label: 'Harga', sectionId: 'pricing' },
    {
      label: 'Info',
      links: [
        { label: 'Testimoni', sectionId: 'testimonials' },
        { label: 'Alur Pemesanan', sectionId: 'process' },
        { label: 'FAQ', sectionId: 'faq' },
      ],
    },
    { label: 'Kontak', sectionId: 'contact' },
  ],
  socials: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/lensakita.studio',
      icon: 'instagram',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/lensakita.studio',
      icon: 'facebook',
    },
    { label: 'TikTok', href: 'https://www.tiktok.com/@lensakita.studio', icon: 'tiktok' },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@lensakita.studio',
      icon: 'youtube',
    },
  ],
  showWhatsAppFab: true,
}

export const hero: HeroContent = {
  eyebrow: 'Fotografi Profesional di Sekarteja',
  headline: 'Abadikan Momen Berharga dengan Hasil yang Tak Terlupakan',
  description:
    'Dari janji suci pernikahan hingga tawa hangat keluarga, kami hadir untuk merekam cerita Anda dengan sentuhan artistik dan hasil berkualitas tinggi.',
  primaryCta: { label: 'Lihat Portofolio', targetSectionId: 'portfolio' },
  secondaryCta: { label: 'Hubungi Kami' },
  image: images.heroMain,
  imageAlt: 'Pasangan pengantin berfoto di bawah cahaya senja',
  stats: [
    { value: '500+', label: 'Sesi Foto' },
    { value: '8 Tahun', label: 'Pengalaman' },
    { value: '4,9/5', label: 'Rating Klien' },
  ],
}

export const about: AboutContent = {
  eyebrow: 'Tentang Kami',
  heading: 'Studio foto yang tumbuh bersama cerita Anda',
  paragraphs: [
    'LensaKita Studio lahir dari kecintaan pada cerita manusia. Sejak 2018, kami telah mendampingi ratusan keluarga, pasangan, dan bisnis untuk mengabadikan momen yang paling berarti.',
    'Kami percaya foto yang baik bukan sekadar gambar tajam, tetapi mampu mengembalikan perasaan saat momen itu terjadi. Karena itu setiap sesi kami rancang dengan pendekatan personal, mulai dari pemilihan lokasi hingga arah gaya.',
  ],
  experienceYears: 8,
  image: images.aboutStudio,
  imageAlt: 'Fotografer LensaKita Studio sedang mengatur sesi pemotretan',
  advantages: [
    {
      title: 'Fotografer Berpengalaman',
      description:
        'Tim kami telah menangani lebih dari 500 sesi dengan beragam tema dan lokasi.',
      icon: 'award',
    },
    {
      title: 'Editing Profesional',
      description:
        'Setiap foto melalui proses retouching warna dan detail agar hasilnya konsisten.',
      icon: 'sparkles',
    },
    {
      title: 'Pengerjaan Cepat',
      description:
        'Hasil seleksi siap dalam 7 hari kerja dan versi siap cetak menyusul setelahnya.',
      icon: 'clock',
    },
    {
      title: 'Harga Transparan',
      description:
        'Semua paket sudah termasuk rincian jelas tanpa biaya tersembunyi di akhir.',
      icon: 'heart',
    },
  ],
}

export const services: Service[] = [
  {
    id: 'pernikahan',
    title: 'Fotografi Pernikahan',
    description:
      'Dokumentasi akad, resepsi, dan sesi prewedding dengan momen candid yang jujur.',
    icon: 'heart',
    startingPrice: 'Mulai Rp3.500.000',
  },
  {
    id: 'wisuda',
    title: 'Fotografi Wisuda',
    description:
      'Sesi foto wisuda personal maupun keluarga di kampus atau studio favorit Anda.',
    icon: 'graduation',
    startingPrice: 'Mulai Rp350.000',
  },
  {
    id: 'keluarga',
    title: 'Fotografi Keluarga',
    description:
      'Potret keluarga hangat di rumah, taman, atau studio dengan arahan yang santai.',
    icon: 'users',
    startingPrice: 'Mulai Rp750.000',
  },
  {
    id: 'acara',
    title: 'Fotografi Acara',
    description:
      'Liputan seminar, ulang tahun, gathering, dan acara perusahaan secara menyeluruh.',
    icon: 'calendar',
    startingPrice: 'Mulai Rp1.500.000',
  },
  {
    id: 'produk',
    title: 'Fotografi Produk',
    description:
      'Foto produk bersih untuk katalog, marketplace, dan konten media sosial bisnis.',
    icon: 'package',
    startingPrice: 'Mulai Rp500.000',
  },
]

export const portfolioCategories: PortfolioCategory[] = [
  { id: 'all', label: 'Semua' },
  { id: 'wedding', label: 'Pernikahan' },
  { id: 'graduation', label: 'Wisuda' },
  { id: 'family', label: 'Keluarga' },
  { id: 'event', label: 'Acara' },
  { id: 'product', label: 'Produk' },
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'porto-01',
    title: 'Akad di Pendopo Klasik',
    categoryId: 'wedding',
    image: images.portfolio.wedding1,
    alt: 'Pasangan pengantin saat prosesi akad',
  },
  {
    id: 'porto-02',
    title: 'Prewedding Senja Pantai',
    categoryId: 'wedding',
    image: images.portfolio.wedding2,
    alt: 'Pasangan berfoto prewedding di tepi pantai saat senja',
  },
  {
    id: 'porto-03',
    title: 'Resepsi Penuh Tawa',
    categoryId: 'wedding',
    image: images.portfolio.wedding3,
    alt: 'Momen bahagia tamu di resepsi pernikahan',
  },
  {
    id: 'porto-04',
    title: 'Wisuda Sarjana Teknik',
    categoryId: 'graduation',
    image: images.portfolio.graduation1,
    alt: 'Wisudawan tersenyum memakai toga',
  },
  {
    id: 'porto-05',
    title: 'Potret Wisuda Bersama Keluarga',
    categoryId: 'graduation',
    image: images.portfolio.graduation2,
    alt: 'Keluarga berfoto bersama wisudawan',
  },
  {
    id: 'porto-06',
    title: 'Sesi Keluarga di Taman',
    categoryId: 'family',
    image: images.portfolio.family1,
    alt: 'Keluarga berfoto bersama di taman',
  },
  {
    id: 'porto-07',
    title: 'Potret Keluarga di Studio',
    categoryId: 'family',
    image: images.portfolio.family2,
    alt: 'Potret keluarga dengan latar studio',
  },
  {
    id: 'porto-08',
    title: 'Seminar Nasional',
    categoryId: 'event',
    image: images.portfolio.event1,
    alt: 'Pembicara di atas panggung seminar',
  },
  {
    id: 'porto-09',
    title: 'Gathering Perusahaan',
    categoryId: 'event',
    image: images.portfolio.event2,
    alt: 'Peserta gathering perusahaan berinteraksi',
  },
  {
    id: 'porto-10',
    title: 'Katalog Produk Kulit',
    categoryId: 'product',
    image: images.portfolio.product1,
    alt: 'Foto produk aksesori kulit di atas meja',
  },
  {
    id: 'porto-11',
    title: 'Foto Produk Elektronik',
    categoryId: 'product',
    image: images.portfolio.product2,
    alt: 'Foto produk perangkat audio dengan latar bersih',
  },
  {
    id: 'porto-12',
    title: 'Sepatu Edisi Terbatas',
    categoryId: 'product',
    image: images.portfolio.product3,
    alt: 'Foto produk sepatu edisi terbatas',
  },
]

export const pricingPackages: PricingPackage[] = [
  {
    id: 'personal',
    name: 'Paket Personal',
    price: 'Rp750.000',
    priceNote: 'per sesi',
    description: 'Cocok untuk sesi wisuda, potret diri, atau keluarga kecil.',
    features: [
      'Durasi sesi 1 jam',
      '1 lokasi foto',
      '25 foto hasil seleksi',
      'Semua file resolusi tinggi',
      'Editing warna dasar',
    ],
    highlighted: false,
    ctaLabel: 'Tanya Paket Ini',
  },
  {
    id: 'signature',
    name: 'Paket Signature',
    price: 'Rp2.500.000',
    priceNote: 'per sesi',
    description: 'Paling populer untuk prewedding dan dokumentasi acara setengah hari.',
    features: [
      'Durasi sesi 4 jam',
      '2 lokasi foto',
      '75 foto hasil seleksi',
      'Cetak album 20 halaman',
      'Editing warna penuh',
      'Fotografer pendamping',
    ],
    highlighted: true,
    ctaLabel: 'Tanya Paket Ini',
  },
  {
    id: 'premium',
    name: 'Paket Premium',
    price: 'Rp6.500.000',
    priceNote: 'per acara',
    description: 'Dokumentasi penuh untuk pernikahan dan acara besar sepanjang hari.',
    features: [
      'Durasi sesi 10 jam',
      'Lokasi bebas',
      '200+ foto hasil seleksi',
      'Album premium + kotak kayu',
      'Editing warna penuh',
      '2 fotografer',
      'Video highlight 3 menit',
    ],
    highlighted: false,
    ctaLabel: 'Tanya Paket Ini',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'testi-01',
    name: 'Siti Rahmawati',
    role: 'Pengantin, Sekarteja',
    quote:
      'Hasil fotonya melebihi ekspektasi kami. Tim LensaKita sabar mengarahkan dan berhasil menangkap momen haru yang tidak kami sadari.',
    rating: 5,
    avatar: images.avatars.siti,
    avatarAlt: 'Foto Siti Rahmawati',
  },
  {
    id: 'testi-02',
    name: 'Budi Santoso',
    role: 'Wisudawan, UGM',
    quote:
      'Proses cepat dan hasil rapi. Foto wisuda saya bersama orang tua jadi kenangan paling berharga tahun ini.',
    rating: 5,
    avatar: images.avatars.budi,
    avatarAlt: 'Foto Budi Santoso',
  },
  {
    id: 'testi-03',
    name: 'Maya Kusuma',
    role: 'Ibu dua anak',
    quote:
      'Anak-anak sulit diatur, tapi fotografernya sabar dan membuat sesi terasa seperti bermain. Hasilnya natural sekali.',
    rating: 5,
    avatar: images.avatars.maya,
    avatarAlt: 'Foto Maya Kusuma',
  },
  {
    id: 'testi-04',
    name: 'Rizky Pratama',
    role: 'Manajer Event',
    quote:
      'Dokumentasi acara perusahaan kami lengkap dan tepat waktu. Koordinasi sebelum acara juga sangat profesional.',
    rating: 4,
    avatar: images.avatars.rizky,
    avatarAlt: 'Foto Rizky Pratama',
  },
  {
    id: 'testi-05',
    name: 'Dewi Anggraini',
    role: 'Pemilik Brand Kulit',
    quote:
      'Foto produk meningkatkan konversi toko online saya. Latar bersih dan detail tekstur terlihat jelas.',
    rating: 5,
    avatar: images.avatars.dewi,
    avatarAlt: 'Foto Dewi Anggraini',
  },
  {
    id: 'testi-06',
    name: 'Arif Nugroho',
    role: 'Wisudawan, UNY',
    quote:
      'Harga transparan, tidak ada biaya tambahan mendadak. Hasil editnya halus dan tidak berlebihan.',
    rating: 5,
    avatar: images.avatars.arif,
    avatarAlt: 'Foto Arif Nugroho',
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: 'konsultasi',
    title: 'Konsultasi',
    description:
      'Kami berdiskusi tentang tema, lokasi, jadwal, dan kebutuhan Anda melalui WhatsApp atau tatap muka.',
  },
  {
    id: 'booking',
    title: 'Booking & DP',
    description:
      'Tanggal dikunci setelah pembayaran uang muka, lalu kami kirim panduan persiapan sesi foto.',
  },
  {
    id: 'sesi',
    title: 'Sesi Foto',
    description:
      'Hari-H kami datang lebih awal, mengatur pencahayaan, dan memandu pose agar Anda tetap nyaman.',
  },
  {
    id: 'editing',
    title: 'Editing & Seleksi',
    description:
      'Foto terbaik dipilih dan diedit warnanya, lalu dikirim sebagai pratinjau untuk Anda setujui.',
  },
  {
    id: 'serah-terima',
    title: 'Foto Diterima',
    description:
      'File resolusi tinggi dan album dikirim melalui tautan unduhan serta versi cetak bila termasuk paket.',
  },
]

export const faqItems: FaqItem[] = [
  {
    id: 'faq-01',
    question: 'Berapa lama durasi satu sesi foto?',
    answer:
      'Durasi menyesuaikan paket yang dipilih, mulai dari 1 jam untuk paket personal hingga 10 jam untuk dokumentasi acara penuh. Anda dapat menambah waktu dengan biaya tambahan per jam.',
  },
  {
    id: 'faq-02',
    question: 'Apakah saya mendapatkan semua file mentah?',
    answer:
      'Kami menyerahkan foto terbaik yang telah melalui seleksi dan editing. File mentah tersedia sebagai tambahan berbayar bila Anda membutuhkannya.',
  },
  {
    id: 'faq-03',
    question: 'Berapa lama proses pengerjaan hasil foto?',
    answer:
      'Pratinjau dikirim maksimal 3 hari kerja, sedangkan hasil akhir yang sudah diedit siap dalam 7 hari kerja. Pada musim sibuk, kami akan memberi tahu estimasi lebih awal.',
  },
  {
    id: 'faq-04',
    question: 'Bagaimana cara pembayaran dan apakah ada uang muka?',
    answer:
      'Pembayaran dilakukan melalui transfer bank dengan uang muka 30 persen untuk mengunci jadwal. Pelunasan dilakukan paling lambat pada hari sesi foto.',
  },
  {
    id: 'faq-05',
    question: 'Bisakah sesi dilakukan di luar Sekarteja?',
    answer:
      'Bisa. Untuk lokasi di luar Sekarteja, akan ada penyesuaian biaya transportasi dan akomodasi yang kami informasikan sebelum pemesanan.',
  },
  {
    id: 'faq-06',
    question: 'Bagaimana jika saya perlu mengubah jadwal?',
    answer:
      'Penjadwalan ulang dapat dilakukan maksimal 3 hari sebelum tanggal sesi tanpa biaya tambahan, tergantung ketersediaan jadwal pengganti.',
  },
]

export const closingCta: ClosingCta = {
  heading: 'Siap mengabadikan cerita Anda?',
  description:
    'Ceritakan rencana sesi foto Anda dan tim kami akan membantu memilih paket yang paling sesuai.',
  ctaLabel: 'Pesan Sesi Foto',
}
