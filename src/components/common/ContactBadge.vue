<script setup>
defineProps({
  icon: {
    type: String,
    default: 'phone'
  },
  label: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    required: true
  },
  href: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    class="flex items-center gap-3 text-brand-dark-700 hover:text-brand-accent transition-colors group"
  >
    <div class="w-10 h-10 rounded-full border border-brand-accent/40 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-white transition-all">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </slot>
    </div>
    <div class="text-left">
      <div v-if="label" class="text-xs text-brand-gray-400 font-medium">{{ label }}</div>
      <div class="text-sm font-bold text-brand-dark-700 tracking-wide">{{ value }}</div>
    </div>
  </component>
</template>
