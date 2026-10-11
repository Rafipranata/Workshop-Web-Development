<script setup>
import { ref } from 'vue'
import { ChevronLeft, ChevronRight, Star } from 'lucide-vue-next'
import SectionTitle from '../common/SectionTitle.vue'

defineProps({
  portfolioData: {
    type: Object,
    required: true
  }
})

const activeSlide = ref(0)
const testimonials = [
  {
    quote: "Pengalaman kerja sama yang luar biasa! Pengerjaan rapi, tim komunikatif, dan hasil akhir melebihi ekspektasi.",
    author: "Hendri Kurniawan",
    role: "CEO Solusi Properti Utama",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Struktur atap baja ringan dan genteng aspal selesai tepat waktu sesuai jadwal dengan standar mutu presisi tinggi.",
    author: "Bambang Sudiro",
    role: "Project Director Citra Graha",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
]

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % testimonials.length
}

const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + testimonials.length) % testimonials.length
}
</script>

<template>
  <div>
    <!-- Portofolio Heading Section (White background) -->
    <div id="portfolio" class="pt-20 pb-12 bg-brand-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          :tagline="portfolioData.tagline"
          :title="portfolioData.tagline"
          :subtitle="portfolioData.subtitle"
          align="center"
        />
      </div>
    </div>

    <!-- Dark Contrast Testimonial & Case Study Container (brand-dark-900) -->
    <div class="bg-brand-dark-900 text-brand-white py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <!-- Left: Big Project / Team Collaboration Image -->
          <div class="lg:col-span-7 space-y-4">
            <div class="relative overflow-hidden aspect-[16/10] bg-brand-dark-800 border border-brand-dark-700 shadow-2xl">
              <img 
                :src="portfolioData.galleryImage" 
                alt="Proyek Titan Konstruksi"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Team Avatars Row -->
            <div class="flex items-center gap-2 pt-2">
              <div 
                v-for="(thumb, i) in portfolioData.teamThumbnails" 
                :key="i"
                class="w-10 h-10 rounded-full border-2 border-brand-accent overflow-hidden shadow-sm"
              >
                <img :src="thumb" alt="Tim Konstruksi" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Right: Testimonial Slider Content -->
          <div class="lg:col-span-5 space-y-6">
            <!-- Header with Slider Arrows -->
            <div class="flex items-center justify-between border-b border-brand-dark-800 pb-3">
              <span class="text-xs font-bold tracking-widest uppercase text-brand-accent">
                {{ portfolioData.badge }}
              </span>
              <div class="flex items-center gap-2">
                <button 
                  @click="prevSlide" 
                  class="w-8 h-8 rounded border border-brand-dark-700 flex items-center justify-center text-brand-gray-300 hover:text-brand-white hover:border-brand-accent transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft class="w-4 h-4" />
                </button>
                <button 
                  @click="nextSlide" 
                  class="w-8 h-8 rounded border border-brand-dark-700 flex items-center justify-center text-brand-gray-300 hover:text-brand-white hover:border-brand-accent transition-all cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Testimonial Quote -->
            <blockquote class="font-serif text-xl sm:text-2xl leading-relaxed text-brand-white">
              “{{ testimonials[activeSlide].quote }}”
            </blockquote>

            <!-- Author Info -->
            <div class="flex items-center gap-4 pt-2">
              <img 
                :src="testimonials[activeSlide].avatar" 
                :alt="testimonials[activeSlide].author" 
                class="w-12 h-12 rounded-full object-cover border-2 border-brand-accent"
              />
              <div>
                <div class="font-bold text-sm text-brand-white">
                  {{ testimonials[activeSlide].author }}
                </div>
                <div class="text-xs text-brand-gray-400">
                  {{ testimonials[activeSlide].role }}
                </div>
                <!-- Star Rating -->
                <div class="flex items-center gap-1 mt-1 text-amber-400">
                  <Star v-for="s in testimonials[activeSlide].rating" :key="s" class="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>

            <!-- Dots indicator -->
            <div class="flex items-center gap-2 pt-2">
              <span 
                v-for="(_, index) in testimonials" 
                :key="index"
                :class="[
                  'h-1.5 transition-all duration-300 rounded-full',
                  activeSlide === index ? 'w-6 bg-brand-accent' : 'w-2 bg-brand-dark-700'
                ]"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
