<script setup>
import { ref, onMounted, computed } from 'vue'
import TopBar from '../../components/layout/TopBar.vue'
import Navbar from '../../components/layout/Navbar.vue'
import Footer from '../../components/layout/Footer.vue'
import HeroSection from '../../components/sections/HeroSection.vue'
import AboutSection from '../../components/sections/AboutSection.vue'
import ServicesSection from '../../components/sections/ServicesSection.vue'
import PortfolioSection from '../../components/sections/PortfolioSection.vue'
import ContactSection from '../../components/sections/ContactSection.vue'
import ScrollToTop from '../../components/common/ScrollToTop.vue'

import { mockData } from '../../data/mockData.js'
import { contentService } from '../../services/api'

// State konten dinamis dari SQLite
const dynamicContents = ref({})
const loading = ref(true)

const fetchContents = async () => {
  try {
    const res = await contentService.getAllContents()
    if (res.data && res.data.data) {
      const map = {}
      res.data.data.forEach(item => {
        map[item.section_key] = item
      })
      dynamicContents.value = map
    }
  } catch (err) {
    console.warn('Backend API belum terhubung / offline, menggunakan mockData default:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchContents()
})

// Data reaktif yang menggabungkan data mock dengan data dinamis SQLite
const heroData = computed(() => {
  const c = dynamicContents.value['beranda']
  if (!c) return mockData.hero
  return {
    ...mockData.hero,
    tagline: c.subtitle || mockData.hero.tagline,
    title: c.title || mockData.hero.title,
    description: c.body || mockData.hero.description,
    image: c.image_url || mockData.hero.image,
    isActive: c.is_active !== 0
  }
})

const resolveImage = (imageUrl, defaultImage) => {
  if (!imageUrl) return defaultImage
  if (imageUrl.includes('gambar-tentangkami1.png')) return mockData.about.image
  if (imageUrl.includes('background-herosection.png')) return mockData.hero.image
  if (imageUrl.includes('atapmetal.png')) return mockData.about.featureCard.image
  if (imageUrl.includes('gambarportofolio.png')) return mockData.portfolio.galleryImage
  return imageUrl
}

const aboutData = computed(() => {
  const c = dynamicContents.value['about']
  if (!c) return mockData.about
  return {
    ...mockData.about,
    tagline: c.subtitle || mockData.about.tagline,
    title: c.title || mockData.about.title,
    description: c.body || mockData.about.description,
    image: resolveImage(c.image_url, mockData.about.image),
    isActive: c.is_active !== 0
  }
})

const servicesSectionInfo = computed(() => {
  const c = dynamicContents.value['layanan']
  if (!c) return mockData.servicesSection
  return {
    tagline: c.subtitle || mockData.servicesSection.tagline,
    subtitle: c.title || mockData.servicesSection.subtitle,
    body: c.body,
    isActive: c.is_active !== 0
  }
})

const portfolioData = computed(() => {
  const c = dynamicContents.value['portofolio']
  if (!c) return mockData.portfolio
  return {
    ...mockData.portfolio,
    subtitle: c.subtitle || mockData.portfolio.subtitle,
    title: c.title || mockData.portfolio.title,
    galleryImage: c.image_url || mockData.portfolio.galleryImage,
    isActive: c.is_active !== 0
  }
})
</script>

<template>
  <div class="min-h-screen bg-brand-white text-brand-dark-700 flex flex-col font-sans">
    <!-- Top Contact Bar -->
    <TopBar :contact-info="mockData.topBar" />

    <!-- Sticky Main Navigation -->
    <Navbar :navigation="mockData.navigation" />

    <main class="flex-grow">
      <!-- 1. Hero Section (Beranda) -->
      <HeroSection 
        v-if="heroData.isActive !== false" 
        :hero-data="heroData" 
      />

      <!-- 2. About Section -->
      <AboutSection 
        v-if="aboutData.isActive !== false" 
        :about-data="aboutData" 
      />

      <!-- 3. Services Section -->
      <ServicesSection 
        v-if="servicesSectionInfo.isActive !== false"
        :services="mockData.services" 
        :section-info="servicesSectionInfo" 
      />

      <!-- 4. Portfolio & Testimonial Section -->
      <PortfolioSection 
        v-if="portfolioData.isActive !== false" 
        :portfolio-data="portfolioData" 
      />

      <!-- 5. Contact Section -->
      <ContactSection :contact-data="mockData.contact" />
    </main>

    <!-- Footer -->
    <Footer :footer-data="mockData.footer" />

    <!-- Rounded Floating Scroll Up Button -->
    <ScrollToTop />
  </div>
</template>
