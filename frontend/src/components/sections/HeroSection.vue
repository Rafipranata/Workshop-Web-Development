<script setup>
import BaseButton from '../common/BaseButton.vue'

defineProps({
  heroData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section id="hero" class="relative overflow-hidden bg-brand-white min-h-[580px] lg:min-h-[660px] flex items-center">
    <!-- Background Image with diagonal split matching the design -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="heroData.image" 
        alt="Titan Konstruksi Proyek"
        class="w-full h-full object-cover object-right lg:object-center"
      />
      <!-- Soft gradient overlay on left for sharp readable typography -->
      <div class="absolute inset-0 bg-gradient-to-r from-brand-white via-brand-white/85 to-transparent lg:w-[60%]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
      <div class="max-w-xl bg-white/70 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-sm">
        <!-- Tagline with dots/square icon -->
        <div class="inline-flex items-center gap-2 mb-4 text-xs tracking-widest font-bold uppercase text-brand-accent">
          <span class="inline-block w-2.5 h-2.5 bg-brand-accent"></span>
          <span>{{ heroData.tagline }}</span>
        </div>

        <!-- Headline -->
        <h1 class="font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-brand-dark-700 leading-tight tracking-tight mb-6">
          {{ heroData.title }}
        </h1>

        <!-- Description -->
        <p class="text-sm sm:text-base text-brand-gray-500 mb-8 leading-relaxed max-w-lg">
          {{ heroData.description }}
        </p>

        <!-- CTA Button -->
        <div class="flex flex-wrap items-center gap-4">
          <BaseButton href="#contact" variant="primary" size="lg">
            {{ heroData.cta }}
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
