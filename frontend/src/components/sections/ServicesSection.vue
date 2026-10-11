<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SectionTitle from '../common/SectionTitle.vue'

defineProps({
  services: {
    type: Array,
    required: true
  },
  sectionInfo: {
    type: Object,
    required: true
  }
})

const selectedService = ref(null)

const openModal = (service) => {
  selectedService.value = service
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedService.value = null
  document.body.style.overflow = ''
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && selectedService.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="services" class="py-20 lg:py-28 bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle 
        :tagline="sectionInfo.tagline"
        :title="sectionInfo.tagline"
        :subtitle="sectionInfo.subtitle"
        align="center"
      />

      <!-- 4 Columns Grid matching the screenshot (2 rows of 4 cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <div 
          v-for="service in services" 
          :key="service.id"
          @click="openModal(service)"
          :class="[
            'bg-brand-white p-5 border transition-all duration-300 flex flex-col justify-between group cursor-pointer',
            service.highlighted 
              ? 'border-brand-accent shadow-md ring-1 ring-brand-accent' 
              : 'border-brand-gray-200 hover:border-brand-accent hover:ring-1 hover:ring-brand-accent hover:shadow-lg'
          ]"
        >
          <div>
            <!-- Card Image -->
            <div class="overflow-hidden aspect-[4/3] bg-brand-light-bg mb-4">
              <img 
                :src="service.image" 
                :alt="service.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <!-- Card Title -->
            <h4 class="font-serif font-bold text-sm text-brand-dark-700 tracking-wide mb-2 uppercase min-h-[40px] flex items-center leading-snug">
              {{ service.title }}
            </h4>

            <!-- Card Description -->
            <p class="text-xs text-brand-gray-500 leading-relaxed line-clamp-4 mb-6">
              {{ service.description }}
            </p>
          </div>

          <!-- Bottom Action Button -->
          <button
            type="button"
            @click.stop="openModal(service)"
            :class="[
              'w-full text-center py-2.5 px-3 text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer',
              service.highlighted
                ? 'bg-brand-accent text-brand-white hover:bg-brand-accent-hover'
                : 'bg-brand-accent/90 text-brand-white hover:bg-brand-accent'
            ]"
          >
            {{ service.cta }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Pop-up Card Detail Layanan -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="selectedService"
          class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          @click.self="closeModal"
          role="dialog"
          aria-modal="true"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div 
              v-if="selectedService"
              class="relative bg-white w-full max-w-2xl rounded-none border border-brand-accent/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <!-- Close Button -->
              <button
                type="button"
                @click="closeModal"
                class="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 hover:bg-brand-dark-900 text-brand-dark-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md focus:outline-none"
                aria-label="Tutup Detail"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- Modal Scrollable Content -->
              <div class="overflow-y-auto flex-1">
                <!-- Modal Banner Image -->
                <div class="relative h-60 sm:h-72 w-full overflow-hidden bg-brand-light-bg">
                  <img 
                    :src="selectedService.image" 
                    :alt="selectedService.title"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <!-- Tag & Title in Banner -->
                  <div class="absolute bottom-4 left-6 right-6 text-white">
                    <span class="inline-block text-[10px] font-bold tracking-widest uppercase bg-brand-accent px-2.5 py-1 mb-2 text-white shadow-sm">
                      Layanan Konstruksi
                    </span>
                    <h3 class="font-serif text-xl sm:text-2xl font-bold tracking-wide uppercase leading-tight drop-shadow-sm">
                      {{ selectedService.title }}
                    </h3>
                  </div>
                </div>

                <!-- Modal Body Details -->
                <div class="p-6 sm:p-8 space-y-6">
                  <!-- Ringkasan Singkat -->
                  <div class="border-l-4 border-brand-accent pl-4 py-1 bg-amber-50/50">
                    <p class="text-xs sm:text-sm text-brand-dark-700 font-medium leading-relaxed italic">
                      "{{ selectedService.description }}"
                    </p>
                  </div>

                  <!-- Penjelasan Detail -->
                  <div>
                    <h5 class="text-xs font-bold tracking-widest text-brand-accent uppercase mb-2">
                      Deskripsi Lengkap
                    </h5>
                    <p class="text-xs sm:text-sm text-brand-gray-500 leading-relaxed text-justify">
                      {{ selectedService.fullDescription || selectedService.description }}
                    </p>
                  </div>

                  <!-- Keunggulan & Spesifikasi -->
                  <div v-if="selectedService.features && selectedService.features.length">
                    <h5 class="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3">
                      Keunggulan & Spesifikasi Layanan
                    </h5>
                    <ul class="space-y-2.5">
                      <li 
                        v-for="(feature, idx) in selectedService.features" 
                        :key="idx"
                        class="flex items-start text-xs sm:text-sm text-brand-dark-700"
                      >
                        <span class="mr-2.5 mt-0.5 text-brand-accent flex-shrink-0">
                          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </span>
                        <span>{{ feature }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Modal Footer Action -->
              <div class="p-4 sm:p-6 bg-brand-light-bg/70 border-t border-brand-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p class="text-xs text-brand-gray-500 hidden sm:block">
                  Ingin estimasi biaya untuk {{ selectedService.title }}?
                </p>
                <div class="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    @click="closeModal"
                    class="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-dark-700 hover:bg-brand-gray-200 transition-colors"
                  >
                    Tutup
                  </button>
                  <a
                    href="#contact"
                    @click="closeModal"
                    class="flex-1 sm:flex-none text-center px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-brand-accent text-brand-white hover:bg-brand-accent-hover transition-colors shadow-sm"
                  >
                    Konsultasi Layanan Ini
                  </a>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
