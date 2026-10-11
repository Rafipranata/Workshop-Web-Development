import heroBgImage from '../images/background-herosection.png'
import aboutImage from '../images/gambar-tentangkami1.png'
import atapMetalImage from '../images/atapmetal.png'
import atapAspalImage from '../images/atapaspal.png'
import portofolioImage from '../images/gambarportofolio.png'
import pemasanganAtapBaruImage from '../images/pemasanganatapbaru.png'
import perbaikanperawatanImage from '../images/perbaikanperawatan.png'

export const mockData = {
  topBar: {
    phone: "+62 812-3456-7890",
    address: "Jl. Jendral Sudirman No. 45, Jakarta Selatan",
    email: "info@titankonstruksi.com"
  },
  navigation: [
    { name: "Beranda", href: "#hero" },
    { name: "Tentang Kami", href: "#about" },
    { name: "Layanan", href: "#services" },
    { name: "Portofolio", href: "#portfolio" },
    { name: "Kontak", href: "#contact" },
  ],
  hero: {
    tagline: "SOLUSI BANGUNAN TERPERCAYA",
    title: "Membangun Fondasi Masa Depan dengan Presisi dan Kualitas",
    description: "Kami mewujudkan visi arsitektur dan hunian impian Anda melalui standar pengerjaan konstruksi terbaik, material premium, dan tenaga ahli berpengalaman.",
    cta: "Konsultasi Sekarang",
    image: heroBgImage
  },
  about: {
    tagline: "TENTANG TITAN KONSTRUKSI",
    title: "Membangun Hunian untuk Kenyamanan dan Masa Depan Anda",
    description: "Kami adalah kontraktor terkemuka yang bergerak di bidang konstruksi sipil, renovasi bangunan, dan fabrikasi atap modern dengan komitmen garansi pengerjaan berkualitas tinggi dan material berstandar internasional.",
    features: [
      "Integritas & Transparansi",
      "Tenaga Ahli Berkualifikasi",
      "Pengerjaan Tepat Waktu"
    ],
    experienceYears: "26+",
    experienceLabel: "Tahun Pengalaman",
    image: aboutImage,
    featureCard: {
      title: "Garansi Mutu 100%",
      description: "Setiap proyek dilindungi sertifikat jaminan konstruksi dan inspeksi struktural berkala.",
      image: atapMetalImage
    },
    cta: "Pelajari Lebih Lanjut",
    phone: "(+62) 812 3456 7890"
  },
  servicesSection: {
    tagline: "Layanan Kami",
    subtitle: "Solusi Konstruksi Menyeluruh dari Konsep hingga Serah Terima"
  },
  services: [
    {
      id: 1,
      title: "ATAP METAL",
      description: "Instalasi sistem atap metal presisi tinggi dengan ketahanan cuaca ekstrem, anti karat, dan bobot struktural ringan.",
      fullDescription: "Layanan instalasi sistem atap metal presisi tinggi kami dirancang untuk memberikan perlindungan maksimal bagi bangunan komersial maupun residensial. Menggunakan material baja galvanis/galvalum berkualitas prima berlapisan anti karat mutakhir, atap metal memiliki ketahanan luar biasa terhadap terpaan cuaca ekstrem tropis seperti hujan lebat, terik matahari panas, dan angin kencang.",
      features: [
        "Material tahan karat & korosi berkepanjangan",
        "Bobot struktural ringan tidak membebani rangka utama",
        "Presisi interlocking mencegah rembesan dan kebocoran",
        "Pilihan profil dan warna elegan sesuai konsep arsitektur",
        "Garansi pemasangan resmi hingga 10 tahun"
      ],
      image: atapMetalImage,
      cta: "BACA SELENGKAPNYA",
      highlighted: false
    },
    {
      id: 2,
      title: "ATAP GENTENG ASPAL",
      description: "Aplikasi genteng aspal artistik bertaraf premium memberikan nilai estetika mewah, peredam suara bising, dan daya tahan puluhan tahun.",
      fullDescription: "Genteng aspal (bitumen shingles) adalah solusi atap premium yang menyatukan keanggunan estetika arsitektur modern dengan ketahanan tinggi. Terbuat dari serat fiberglas bermutu yang dilapisi aspal alami dan butiran mineral berwarna, genteng aspal mampu meredam suara tetesan hujan dengan efektif dan tahan terhadap goncangan struktural.",
      features: [
        "Meredam kebisingan air hujan hingga lebih dari 80%",
        "Tampilan mewah bertekstur dimensi 3D arsitektural",
        "Fleksibel untuk berbagai kemiringan dan bentuk atap kubah/curam",
        "Tahan lumut, jamur, serta perubahan cuaca drastis",
        "Ringan dan tidak memerlukan struktur penyangga berat"
      ],
      image: atapAspalImage,
      cta: "BACA SELENGKAPNYA",
      highlighted: false
    },
    {
      id: 3,
      title: "PEMASANGAN ATAP BARU",
      description: "Proteksi waterproofing atap datar komprehensif menggunakan membran bakar bermutu tinggi tahan sinar UV.",
      fullDescription: "Pengerjaan pemasangan sistem atap baru menyeluruh mulai dari perencanaan struktur, leveling bidang, hingga lapisan isolasi waterproofing berstandar internasional. Dikerjakan oleh teknisi bersertifikat demi memastikan setiap sambungan dan sudut pertemuan terlindungi sempurna tanpa risiko rembes atau kebocoran di masa depan.",
      features: [
        "Perhitungan kemiringan presisi untuk aliran air lancar",
        "Aplikasi membran waterproofing bakar bermutu premium",
        "Pemasangan flashing, talang, dan lisplang presisi tinggi",
        "Inspeksi uji genang air (water ponding test) sebelum serah terima",
        "Dukungan garansi pemeliharaan berkala"
      ],
      image: pemasanganAtapBaruImage,
      cta: "BACA SELENGKAPNYA",
      highlighted: false
    },
    {
      id: 4,
      title: "PERBAIKAN & PERAWATAN ATAP",
      description: "Inspeksi berkala dan penanganan cepat kebocoran struktural untuk menjaga umur pemakaian atap bangunan.",
      fullDescription: "Layanan perbaikan dan perawatan menyeluruh untuk mengatasi masalah atap bocor, genteng retak/pecah, karat pada rangka, hingga kerusakan waterproofing. Tim kami melakukan inspeksi menyeluruh untuk mendeteksi sumber kebocoran yang tak kasat mata dan memberikan perbaikan permanen yang efisien dan tepat sasaran.",
      features: [
        "Inspeksi komprehensif pendeteksian titik kebocoran tersembunyi",
        "Penggantian komponen rusak dengan material kompatibel",
        "Pembersihan lumut, sedimen talang, dan pelapisan ulang anti-bocor",
        "Respon cepat untuk penanganan darurat kebocoran",
        "Laporan detail kondisi sebelum dan sesudah pengerjaan"
      ],
      image: perbaikanperawatanImage,
      cta: "BACA SELENGKAPNYA",
      highlighted: false
    },
    {
      id: 5,
      title: "ATAP SPANDEK ZINCALUME",
      description: "Pemasangan atap spandek zincalume modern untuk bangunan komersial, gudang, maupun carport dengan kekuatan tinggi.",
      fullDescription: "Atap spandek zincalume merupakan kombinasi paduan seng dan aluminium yang menghasilkan daya tahan prima terhadap karat. Sangat ideal untuk atap pabrik, gudang, ruko komersial, kanopi, hingga perumahan modern berkat bentangannya yang panjang dan minim sambungan.",
      features: [
        "Bahan zincalume anti korosi hingga 4x lebih tahan dibanding seng biasa",
        "Bisa dipesan custom panjang sesuai ukuran tanpa sambungan",
        "Instalasi cepat dan efisien menghemat waktu proyek",
        "Dilengkapi pilihan peredam panas & suara (foil / insulasi PU)",
        "Efisiensi biaya dan perawatan jangka panjang yang ekonomis"
      ],
      image: atapMetalImage,
      cta: "BACA SELENGKAPNYA",
      highlighted: false
    },
    {
      id: 6,
      title: "ATAP BITUMEN GELOMBANG",
      description: "Material atap selulosa ramah lingkungan berbobot ringan, lentur, dan tahan korosi untuk berbagai iklim tropis.",
      fullDescription: "Atap bitumen bergelombang memadukan serat selulosa alami dengan aspal murni melalui proses pemadatan bertekanan tinggi. Solusi atap hijau yang ramah lingkungan, tidak berisik saat hujan lebat, tidak menimbulkan hawa panas berlebih, dan tidak akan berkarat.",
      features: [
        "Bebas asbes dan 100% ramah lingkungan",
        "Sangat lentur dan mudah diaplikasikan pada atap melengkung",
        "Insulasi termal alami yang menjaga suhu dalam ruangan sejuk",
        "Kekuatan menahan beban teruji dan tahan angin kencang",
        "Garansi ketahanan kebocoran pabrikan hingga belasan tahun"
      ],
      image: atapAspalImage,
      cta: "BACA SELENGKAPNYA",
      highlighted: false
    },
    {
      id: 7,
      title: "PEMASANGAN RANGKA BAJA RINGAN",
      description: "Struktur rangka baja galvanis cold-formed kokoh anti rayap dengan kalkulasi beban terkomputerisasi presisi.",
      fullDescription: "Pemasangan rangka atap baja ringan berstandar SNI dengan perhitungan perangkat lunak rekayasa struktural canggih. Menjamin kestabilan, ketepatan distribusi beban atap, serta keamanan maksimal untuk jangka panjang tanpa kekhawatiran serangan rayap maupun risiko deformasi kayu.",
      features: [
        "Baja mutu tinggi (High Tensile G-550) berstandar SNI",
        "Analisis beban terkomputerisasi sesuai standar gempa & angin",
        "Bebas rayap, anti lapuk, dan tidak memicu rambatan api",
        "Dikerjakan oleh teknisi bersertifikasi khusus baja ringan",
        "Garansi integritas struktur resmi"
      ],
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
      cta: "BACA SELENGKAPNYA",
      highlighted: false
    },
    {
      id: 8,
      title: "KONSULTASI & PERENCANAAN ATAP",
      description: "Konsultasi pemilihan arsitektur atap terbaik bersama arsitek dan insinyur struktur berpengalaman sebelum pengerjaan.",
      fullDescription: "Perencanaan tepat adalah kunci keawetan dan keindahan atap bangunan Anda. Tim konsultan dan insinyur kami siap membantu mulai dari survei lokasi, pembuatan gambar kerja 2D/3D, rekomendasi jenis material paling efisien, hingga penyusunan Rencana Anggaran Biaya (RAB) yang transparan dan akurat.",
      features: [
        "Survei lokasi komprehensif dan pengukuran akurat",
        "Visualisasi desain model atap & rekomendasi material optimal",
        "Estimasi Rencana Anggaran Biaya (RAB) transparan tanpa biaya siluman",
        "Konsultasi fleksibilitas anggaran dan efisiensi waktu kerja",
        "Dukungan pendampingan proyek dari awal hingga tuntas"
      ],
      image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=600&q=80",
      cta: "BACA SELENGKAPNYA",
      highlighted: false
    }
  ],
  portfolio: {
    tagline: "Portofolio",
    subtitle: "Membangun Reputasi Nyata Hasil Kerja dan Komitmen Kami untuk Kenyamanan dan Masa Depan Anda",
    badge: "TESTIMONI KLIEN",
    title: "Pengalaman kerja sama yang luar biasa! Pengerjaan rapi, tim komunikatif, dan hasil akhir melebihi ekspektasi.",
    author: {
      name: "Hendri Kurniawan",
      role: "CEO Solusi Properti Utama",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    galleryImage: portofolioImage,
    teamThumbnails: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    ]
  },
  contact: {
    tagline: "HUBUNGI KAMI",
    title: "Butuh Bantuan? Mari Diskusikan Proyek Anda",
    placeholders: {
      name: "Nama Lengkap",
      email: "Alamat Email",
      phone: "Nomor Telepon",
      service: "Pilih Jenis Layanan (misal: Atap Metal, Baja Ringan, Renovasi)",
      message: "Tuliskan detail rencana proyek Anda di sini..."
    },
    cta: "Kirim Pesan"
  },
  footer: {
    brandName: "TITAN",
    brandSub: "KONSTRUKSI",
    aboutText: "Mitra terpercaya solusi konstruksi, renovasi gedung, dan atap berkualitas tinggi dengan dedikasi profesionalisme tanpa kompromi.",
    contacts: {
      phone: "+62 812 3456 7890",
      email: "info@titankonstruksi.com",
      address: "Jl. Jendral Sudirman No. 45, Jakarta Selatan"
    },
    quickLinks: [
      { name: "Tentang Kami", href: "#about" },
      { name: "Layanan Kami", href: "#services" },
      { name: "Portofolio Proyek", href: "#portfolio" },
      { name: "Hubungi Tim", href: "#contact" }
    ],
    servicesLinks: [
      { name: "Instalasi Atap Metal", href: "#services" },
      { name: "Pemasangan Genteng Aspal", href: "#services" },
      { name: "Struktur Baja Ringan", href: "#services" },
      { name: "Konsultasi & Desain", href: "#services" }
    ],
    copyright: "© 2026 TITAN KONSTRUKSI. Hak Cipta Dilindungi Undang-Undang."
  }
}
