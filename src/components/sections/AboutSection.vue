<script setup>
import { Phone, CheckCircle2 } from 'lucide-vue-next'
import BaseButton from '../common/BaseButton.vue'
import SectionTitle from '../common/SectionTitle.vue'

defineProps({
  aboutData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section id="about" class="py-20 lg:py-28 bg-brand-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <SectionTitle 
        tagline="TENTANG KAMI"
        title="Tentang Kami"
        align="center"
      />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12">
        <!-- Left Image Composition with Floating Badge -->
        <div class="lg:col-span-5 relative flex justify-center">
          <div class="relative inline-block w-full max-w-sm">
            <div class="relative overflow-hidden bg-transparent">
              <img 
                :src="aboutData.image" 
                alt="Teknisi dan Tenaga Ahli Titan Konstruksi"
                class="w-full h-auto object-contain"
              />
            </div>

            <!-- Floating Experience Badge -->
            <div class="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 bg-brand-white shadow-xl border border-brand-gray-100 p-4 sm:p-5 text-center min-w-[130px]">
              <div class="font-serif text-3xl sm:text-4xl font-extrabold text-brand-accent">
                {{ aboutData.experienceYears }}
              </div>
              <div class="text-[11px] uppercase tracking-wider text-brand-dark-700 font-semibold mt-1">
                {{ aboutData.experienceLabel }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div class="lg:col-span-7 space-y-6">
          <div class="text-xs uppercase tracking-widest text-brand-accent font-semibold flex items-center gap-2">
            <span class="w-4 h-[2px] bg-brand-accent"></span>
            {{ aboutData.tagline }}
          </div>

          <h3 class="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark-700 leading-snug">
            {{ aboutData.title }}
          </h3>

          <p class="text-sm text-brand-gray-500 leading-relaxed">
            {{ aboutData.description }}
          </p>

          <!-- Checkmark Features -->
          <ul class="space-y-3 pt-2">
            <li 
              v-for="feat in aboutData.features" 
              :key="feat"
              class="flex items-center gap-3 text-sm font-semibold text-brand-dark-700"
            >
              <div class="w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                <CheckCircle2 class="w-4 h-4 text-brand-accent" />
              </div>
              <span>{{ feat }}</span>
            </li>
          </ul>

          <!-- Mini Feature Card (Roof Image + Description) -->
          <div class="p-4 bg-brand-light-bg border-l-4 border-brand-accent flex flex-col sm:flex-row items-center gap-4 mt-6">
            <img 
              :src="aboutData.featureCard.image" 
              alt="Garansi Mutu Atap"
              class="w-24 h-20 object-cover rounded shrink-0"
            />
            <div>
              <div class="font-serif text-sm font-bold text-brand-dark-700">
                {{ aboutData.featureCard.title }}
              </div>
              <p class="text-xs text-brand-gray-500 mt-1 leading-relaxed">
                {{ aboutData.featureCard.description }}
              </p>
            </div>
          </div>

          <!-- Bottom Action Buttons & Phone -->
          <div class="flex flex-wrap items-center gap-6 pt-4">
            <BaseButton href="#services" variant="primary" size="md">
              {{ aboutData.cta }}
            </BaseButton>

            <a :href="`tel:${aboutData.phone}`" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-full border border-brand-accent/40 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-white transition-all">
                <Phone class="w-4 h-4" />
              </div>
              <div>
                <div class="text-[10px] text-brand-gray-400 uppercase tracking-wider font-semibold">Hubungi Kami</div>
                <div class="text-sm font-bold text-brand-dark-700 group-hover:text-brand-accent transition-colors">
                  {{ aboutData.phone }}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
