<script setup>
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Twitter, 
  Facebook, 
  MessageCircle, 
  Linkedin 
} from 'lucide-vue-next'
import { ref } from 'vue'
import logoFooter from '../../images/logofooter.png'

defineProps({
  footerData: {
    type: Object,
    required: true
  }
})

const emailInput = ref('')
const subscribeSuccess = ref(false)

const handleSubscribe = () => {
  if (emailInput.value) {
    subscribeSuccess.value = true
    setTimeout(() => {
      emailInput.value = ''
      subscribeSuccess.value = false
    }, 3000)
  }
}
</script>

<template>
  <footer class="bg-brand-dark-900 text-brand-white pt-16 pb-8 border-t border-brand-dark-800">
    <!-- Top Contact Bar inside Footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-brand-dark-800">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <!-- Brand / Phone -->
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full border border-brand-accent/30 bg-brand-dark-800 flex items-center justify-center text-brand-accent shrink-0">
            <Phone class="w-5 h-5" />
          </div>
          <div>
            <div class="text-xs text-brand-gray-400">Telepon</div>
            <div class="text-sm font-semibold text-brand-white">{{ footerData.contacts.phone }}</div>
          </div>
        </div>

        <!-- Email -->
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full border border-brand-accent/30 bg-brand-dark-800 flex items-center justify-center text-brand-accent shrink-0">
            <Mail class="w-5 h-5" />
          </div>
          <div>
            <div class="text-xs text-brand-gray-400">Email</div>
            <div class="text-sm font-semibold text-brand-white">{{ footerData.contacts.email }}</div>
          </div>
        </div>

        <!-- Address -->
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full border border-brand-accent/30 bg-brand-dark-800 flex items-center justify-center text-brand-accent shrink-0">
            <MapPin class="w-5 h-5" />
          </div>
          <div>
            <div class="text-xs text-brand-gray-400">Kantor Pusat</div>
            <div class="text-sm font-semibold text-brand-white">{{ footerData.contacts.address }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Columns -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Col 1: About -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <img 
              :src="logoFooter" 
              alt="Titan Logo" 
              class="h-8 w-auto object-contain brightness-200"
            />
            <div class="font-serif font-bold text-lg tracking-wider text-brand-white">
              {{ footerData.brandName }} <span class="text-brand-accent">{{ footerData.brandSub }}</span>
            </div>
          </div>
          <p class="text-xs leading-relaxed text-brand-gray-400">
            {{ footerData.aboutText }}
          </p>
          <div class="flex items-center gap-3 pt-2">
            <a href="#" class="w-8 h-8 rounded border border-brand-dark-700 bg-brand-dark-800 flex items-center justify-center text-brand-gray-400 hover:text-brand-accent hover:border-brand-accent transition-all">
              <Twitter class="w-4 h-4" />
            </a>
            <a href="#" class="w-8 h-8 rounded border border-brand-dark-700 bg-brand-dark-800 flex items-center justify-center text-brand-gray-400 hover:text-brand-accent hover:border-brand-accent transition-all">
              <Facebook class="w-4 h-4" />
            </a>
            <a href="#" class="w-8 h-8 rounded border border-brand-dark-700 bg-brand-dark-800 flex items-center justify-center text-brand-gray-400 hover:text-brand-accent hover:border-brand-accent transition-all">
              <MessageCircle class="w-4 h-4" />
            </a>
            <a href="#" class="w-8 h-8 rounded border border-brand-dark-700 bg-brand-dark-800 flex items-center justify-center text-brand-gray-400 hover:text-brand-accent hover:border-brand-accent transition-all">
              <Linkedin class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Col 2: Services Links -->
        <div>
          <h4 class="font-serif text-base font-semibold text-brand-white mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-brand-accent">
            Layanan Kami
          </h4>
          <ul class="space-y-2.5 text-xs text-brand-gray-400">
            <li v-for="link in footerData.servicesLinks" :key="link.name">
              <a :href="link.href" class="hover:text-brand-accent transition-colors flex items-center gap-1.5">
                <span class="text-brand-accent text-sm">›</span> {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Quick Links -->
        <div>
          <h4 class="font-serif text-base font-semibold text-brand-white mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-brand-accent">
            Akses Cepat
          </h4>
          <ul class="space-y-2.5 text-xs text-brand-gray-400">
            <li v-for="link in footerData.quickLinks" :key="link.name">
              <a :href="link.href" class="hover:text-brand-accent transition-colors flex items-center gap-1.5">
                <span class="text-brand-accent text-sm">›</span> {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 4: Newsletter -->
        <div>
          <h4 class="font-serif text-base font-semibold text-brand-white mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-brand-accent">
            Berlangganan Kabar Terbaru
          </h4>
          <p class="text-xs text-brand-gray-400 mb-4 leading-relaxed">
            Dapatkan wawasan seputar dunia arsitektur modern, tips perawatan atap, dan penawaran proyek berkala.
          </p>
          <form @submit.prevent="handleSubscribe" class="space-y-3">
            <input
              v-model="emailInput"
              type="email"
              required
              placeholder="Masukkan alamat email"
              class="w-full bg-brand-dark-800 border border-brand-dark-700 text-xs text-brand-white px-4 py-3 placeholder:text-brand-gray-500 focus:outline-none focus:border-brand-accent"
            />
            <button
              type="submit"
              class="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-white text-xs font-semibold py-3 transition-colors tracking-wider uppercase cursor-pointer"
            >
              Langganan
            </button>
            <div v-if="subscribeSuccess" class="text-emerald-400 text-xs mt-1">
              ✓ Terima kasih sudah berlangganan newsletter!
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Copyright Bar -->
    <div class="border-t border-brand-dark-800/80 pt-6 text-center text-[11px] text-brand-gray-500">
      {{ footerData.copyright }}
    </div>
  </footer>
</template>
