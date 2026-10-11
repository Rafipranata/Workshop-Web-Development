<script setup>
import { ref } from 'vue'
import { Search, Menu, X } from 'lucide-vue-next'
import BaseButton from '../common/BaseButton.vue'
import logoNavbar from '../../images/logonavbar.png'

defineProps({
  navigation: {
    type: Array,
    required: true
  }
})

const isMobileMenuOpen = ref(false)
</script>

<template>
  <nav class="bg-brand-dark-900/95 backdrop-blur sticky top-0 z-50 border-b border-brand-dark-800 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Brand Logo -->
        <a href="#hero" class="flex items-center gap-3 group">
          <img 
            :src="logoNavbar" 
            alt="Titan Logo" 
            class="h-10 w-auto object-contain"
          />
          <div>
            <div class="font-serif tracking-wider font-extrabold text-lg text-brand-white leading-none">
              TITAN
            </div>
            <div class="text-[10px] tracking-widest text-brand-accent uppercase font-semibold">
              KONSTRUKSI
            </div>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-sm font-medium text-brand-gray-300 hover:text-brand-accent transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-accent hover:after:w-full after:transition-all"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- Right Action Items -->
        <div class="hidden md:flex items-center gap-5">
          <button class="text-brand-gray-300 hover:text-brand-white p-2 transition-colors cursor-pointer" aria-label="Search">
            <Search class="w-5 h-5" />
          </button>
          
          <BaseButton href="#contact" variant="primary" size="md">
            MINTA PENAWARAN
          </BaseButton>
        </div>

        <!-- Mobile Menu Trigger -->
        <div class="flex md:hidden items-center gap-2">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="text-brand-gray-300 hover:text-brand-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <component :is="isMobileMenuOpen ? X : Menu" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div 
      v-show="isMobileMenuOpen" 
      class="md:hidden bg-brand-dark-800 border-b border-brand-dark-700 px-4 pt-2 pb-6 space-y-3"
    >
      <a
        v-for="item in navigation"
        :key="item.name"
        :href="item.href"
        @click="isMobileMenuOpen = false"
        class="block py-2 text-base font-medium text-brand-gray-300 hover:text-brand-accent"
      >
        {{ item.name }}
      </a>
      <div class="pt-4 border-t border-brand-dark-700">
        <BaseButton href="#contact" variant="primary" size="md" class="w-full">
          MINTA PENAWARAN
        </BaseButton>
      </div>
    </div>
  </nav>
</template>
