<script setup>
import { ref } from 'vue'
import SectionTitle from '../common/SectionTitle.vue'
import { contentService } from '../../services/api'

defineProps({
  contactData: {
    type: Object,
    required: true
  }
})

const formData = ref({
  name: '',
  email: '',
  service: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  isSubmitted.value = false

  try {
    await contentService.createContact({
      name: formData.value.name,
      email: formData.value.email,
      service: formData.value.service,
      message: formData.value.message
    })

    isSubmitted.value = true
    formData.value = {
      name: '',
      email: '',
      service: '',
      message: ''
    }

    setTimeout(() => {
      isSubmitted.value = false
    }, 5000)
  } catch (err) {
    console.error('Failed to submit contact:', err)
    errorMessage.value = 'Gagal mengirim pesan. Pastikan koneksi server backend menyala.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="py-20 lg:py-28 bg-brand-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        :tagline="contactData.tagline"
        :title="contactData.title"
        align="center"
      />

      <!-- Form matching the reference screenshot -->
      <form @submit.prevent="handleSubmit" class="space-y-4 mt-8">
        <!-- 2 Columns: Nama & Email -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            v-model="formData.name"
            type="text"
            required
            :placeholder="contactData.placeholders.name"
            class="w-full bg-brand-light-bg border border-brand-gray-200 px-4 py-3.5 text-xs text-brand-dark-700 placeholder:text-brand-gray-400 focus:outline-none focus:border-brand-accent focus:bg-white transition-all"
          />
          <input
            v-model="formData.email"
            type="email"
            required
            :placeholder="contactData.placeholders.email"
            class="w-full bg-brand-light-bg border border-brand-gray-200 px-4 py-3.5 text-xs text-brand-dark-700 placeholder:text-brand-gray-400 focus:outline-none focus:border-brand-accent focus:bg-white transition-all"
          />
        </div>

        <!-- Single Column: Service / Subject -->
        <div>
          <input
            v-model="formData.service"
            type="text"
            :placeholder="contactData.placeholders.service"
            class="w-full bg-brand-light-bg border border-brand-gray-200 px-4 py-3.5 text-xs text-brand-dark-700 placeholder:text-brand-gray-400 focus:outline-none focus:border-brand-accent focus:bg-white transition-all"
          />
        </div>

        <!-- Message Textarea -->
        <div>
          <textarea
            v-model="formData.message"
            rows="5"
            required
            :placeholder="contactData.placeholders.message"
            class="w-full bg-brand-light-bg border border-brand-gray-200 px-4 py-3.5 text-xs text-brand-dark-700 placeholder:text-brand-gray-400 focus:outline-none focus:border-brand-accent focus:bg-white transition-all resize-none"
          ></textarea>
        </div>

        <!-- Submit Button centered -->
        <div class="text-center pt-2">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full sm:w-auto min-w-[200px] bg-brand-accent hover:bg-brand-accent-hover text-brand-white text-xs font-bold py-3.5 px-8 transition-colors tracking-widest uppercase cursor-pointer shadow-sm hover:shadow-md disabled:opacity-50"
          >
            {{ isSubmitting ? 'MENGIRIM PESAN...' : contactData.cta }}
          </button>
        </div>

        <div v-if="isSubmitted" class="text-center p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded mt-4">
          ✓ Pesan Anda telah berhasil terkirim dan tersimpan ke sistem Titan Konstruksi!
        </div>

        <div v-if="errorMessage" class="text-center p-3 bg-red-50 text-red-700 border border-red-200 text-xs rounded mt-4">
          ✕ {{ errorMessage }}
        </div>
      </form>
    </div>
  </section>
</template>
