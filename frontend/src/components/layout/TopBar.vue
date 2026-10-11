<script setup>
import { Phone, MapPin, Mail } from 'lucide-vue-next'

defineProps({
  contactInfo: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-brand-dark-900 text-brand-gray-300 text-xs border-b border-brand-dark-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
      <!-- Left: Phone -->
      <div class="flex items-center gap-2">
        <Phone class="w-3.5 h-3.5 text-brand-accent" />
        <a :href="`tel:${contactInfo.phone}`" class="hover:text-brand-white transition-colors">
          {{ contactInfo.phone }}
        </a>
      </div>

      <!-- Right: Address & Email -->
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <div class="flex items-center gap-1.5">
          <MapPin class="w-3.5 h-3.5 text-brand-accent" />
          <span>{{ contactInfo.address }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Mail class="w-3.5 h-3.5 text-brand-accent" />
          <a :href="`mailto:${contactInfo.email}`" class="hover:text-brand-white transition-colors">
            {{ contactInfo.email }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
