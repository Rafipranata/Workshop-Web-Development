<script setup>
import TopBar from './components/layout/TopBar.vue'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import PortfolioSection from './components/sections/PortfolioSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import ScrollToTop from './components/common/ScrollToTop.vue'

import { mockData } from './data/mockData.js'
</script>

<template>
  <div class="min-h-screen bg-brand-white text-brand-dark-700 flex flex-col font-sans">
    <!-- Top Contact Bar -->
    <TopBar :contact-info="mockData.topBar" />

    <!-- Sticky Main Navigation -->
    <Navbar :navigation="mockData.navigation" />

    <main class="flex-grow">
      <!-- 1. Hero Section -->
      <HeroSection :hero-data="mockData.hero" />

      <!-- 2. About Section -->
      <AboutSection :about-data="mockData.about" />

      <!-- 3. Services Section -->
      <ServicesSection 
        :services="mockData.services" 
        :section-info="mockData.servicesSection" 
      />

      <!-- 4. Portfolio & Testimonial Section -->
      <PortfolioSection :portfolio-data="mockData.portfolio" />

      <!-- 5. Contact Section -->
      <ContactSection :contact-data="mockData.contact" />
    </main>

    <!-- Footer -->
    <Footer :footer-data="mockData.footer" />

    <!-- Rounded Floating Scroll Up Button -->
    <ScrollToTop />
  </div>
</template>
