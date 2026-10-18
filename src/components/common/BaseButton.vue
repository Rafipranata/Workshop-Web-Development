<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary' // 'primary' | 'outline' | 'dark'
  },
  size: {
    type: String,
    default: 'md' // 'sm' | 'md' | 'lg'
  },
  href: {
    type: String,
    default: null
  }
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-none cursor-pointer tracking-wider text-xs uppercase',
      size === 'sm' ? 'px-4 py-2' : size === 'lg' ? 'px-8 py-4 text-sm' : 'px-6 py-3',
      variant === 'primary' 
        ? 'bg-brand-accent hover:bg-brand-accent-hover text-brand-white shadow-sm hover:shadow-md'
        : variant === 'outline'
        ? 'border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-white'
        : 'bg-brand-dark-900 text-brand-white hover:bg-brand-dark-700'
    ]"
  >
    <slot />
  </component>
</template>
