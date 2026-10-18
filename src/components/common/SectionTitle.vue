<script setup>
defineProps({
  tagline: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'center' // 'left' | 'center'
  },
  dark: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="['max-w-3xl mb-12', align === 'center' ? 'mx-auto text-center' : 'text-left']">
    <div 
      v-if="tagline" 
      class="inline-flex items-center gap-2 mb-3 text-xs uppercase font-semibold tracking-widest text-brand-accent"
    >
      <span class="w-6 h-[2px] bg-brand-accent inline-block"></span>
      <span>{{ tagline }}</span>
      <span v-if="align === 'center'" class="w-6 h-[2px] bg-brand-accent inline-block"></span>
    </div>

    <h2 
      :class="[
        'font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4',
        dark ? 'text-brand-white' : 'text-brand-dark-700'
      ]"
    >
      {{ title }}
    </h2>

    <p 
      v-if="subtitle" 
      :class="[
        'text-sm sm:text-base leading-relaxed',
        dark ? 'text-brand-gray-300' : 'text-brand-gray-500'
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
