<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { contentService } from '../../services/api'
import aboutImage from '../../images/gambar-tentangkami1.png'
import heroImage from '../../images/background-herosection.png'
import atapMetalImage from '../../images/atapmetal.png'
import portofolioImage from '../../images/gambarportofolio.png'

const resolvePreviewImage = (url) => {
  if (!url) return ''
  if (url.includes('gambar-tentangkami1.png')) return aboutImage
  if (url.includes('background-herosection.png')) return heroImage
  if (url.includes('atapmetal.png')) return atapMetalImage
  if (url.includes('gambarportofolio.png')) return portofolioImage
  return url
}

const route = useRoute()
const router = useRouter()

const sectionKey = computed(() => route.params.key || 'beranda')

const formData = ref({
  section_key: '',
  section_name: '',
  title: '',
  subtitle: '',
  body: '',
  image_url: '',
  is_active: 1
})

const loading = ref(true)
const saving = ref(false)
const saveSuccess = ref(false)
const errorMessage = ref('')
const uploadingImage = ref(false)
const uploadSuccess = ref(false)

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploadingImage.value = true
  errorMessage.value = ''
  uploadSuccess.value = false

  const uploadData = new FormData()
  uploadData.append('image', file)

  try {
    const res = await contentService.uploadImage(uploadData)
    if (res.data && res.data.image_url) {
      formData.value.image_url = res.data.image_url
      uploadSuccess.value = true
      setTimeout(() => {
        uploadSuccess.value = false
      }, 3000)
    }
  } catch (err) {
    console.error('Upload error:', err)
    errorMessage.value = 'Gagal mengunggah gambar. Pastikan format file berupa gambar (JPG, PNG, WebP) dan server Go aktif.'
  } finally {
    uploadingImage.value = false
  }
}

const sectionHelper = computed(() => {
  switch (sectionKey.value) {
    case 'beranda':
      return {
        titleLabel: 'Judul Utama Hero Banner',
        subtitleLabel: 'Tagline / Badges Atas',
        bodyLabel: 'Deskripsi Hero Banner',
        imageLabel: 'URL / Path Gambar Latar Hero Banner',
        hint: 'Section ini mengatur tampilan paling atas ketika pengunjung pertama kali membuka web.'
      }
    case 'about':
      return {
        titleLabel: 'Judul Tentang Kami',
        subtitleLabel: 'Tagline Tentang Kami',
        bodyLabel: 'Deskripsi Profil & Pengalaman',
        imageLabel: 'URL / Path Gambar Profil Perusahaan',
        hint: 'Section ini menampilkan narasi integritas, tim ahli, serta reputasi perusahaan.'
      }
    case 'layanan':
      return {
        titleLabel: 'Judul Utama Section Layanan',
        subtitleLabel: 'Tagline Layanan',
        bodyLabel: 'Ringkasan / Cakupan Servis Layanan',
        imageLabel: 'URL Gambar Sampel Layanan Utama',
        hint: 'Section ini memuat katalog layanan konstruksi, atap metal, genteng aspal, dll.'
      }
    case 'portofolio':
      return {
        titleLabel: 'Judul / Kutipan Testimoni Utama',
        subtitleLabel: 'Tagline & Subtitle Portofolio',
        bodyLabel: 'Narasi Klien / Deskripsi Galeri Proyek',
        imageLabel: 'URL Gambar Galeri Portofolio Proyek',
        hint: 'Section ini menampilkan portofolio hasil karya dan testimoni kepuasan klien.'
      }
    default:
      return {
        titleLabel: 'Judul Section',
        subtitleLabel: 'Subjudul / Tagline',
        bodyLabel: 'Isi Deskripsi Konten',
        imageLabel: 'URL / Path Gambar',
        hint: 'Formulir pengelolaan konten section dinamis.'
      }
  }
})

const loadSectionData = async () => {
  loading.value = true
  errorMessage.value = ''
  saveSuccess.value = false
  try {
    const res = await contentService.getContentByKey(sectionKey.value)
    if (res.data && res.data.data) {
      formData.value = { ...res.data.data }
    }
  } catch (err) {
    console.error('Failed to load section:', err)
    errorMessage.value = 'Gagal memuat konten section. Pastikan backend server Go telah menyala di port 8080.'
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  saving.value = true
  errorMessage.value = ''
  saveSuccess.value = false
  try {
    await contentService.updateContent(sectionKey.value, {
      title: formData.value.title,
      subtitle: formData.value.subtitle,
      body: formData.value.body,
      image_url: formData.value.image_url,
      is_active: formData.value.is_active
    })
    saveSuccess.value = true
    setTimeout(() => {
      saveSuccess.value = false
    }, 4000)
  } catch (err) {
    console.error('Update error:', err)
    const detail = err.response?.data?.error || err.message || ''
    errorMessage.value = `Gagal menyimpan perubahan ke SQLite backend: ${detail}`
  } finally {
    saving.value = false
  }
}

watch(sectionKey, () => {
  loadSectionData()
})

onMounted(() => {
  loadSectionData()
})
</script>

<template>
  <div class="section-editor">
    <!-- Breadcrumb & Top Action -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold mb-1 text-dark">
          Kelola Section: <span class="text-primary text-capitalize">{{ formData.section_name || sectionKey }}</span>
        </h4>
        <p class="text-muted mb-0 small">{{ sectionHelper.hint }}</p>
      </div>
      <div class="d-flex gap-2">
        <router-link to="/admin" class="btn btn-outline-secondary d-flex align-items-center gap-1">
          <i class="bx bx-arrow-back"></i> Dashboard
        </router-link>
        <a :href="`/#${sectionKey === 'beranda' ? 'hero' : sectionKey}`" target="_blank" class="btn btn-outline-primary d-flex align-items-center gap-1">
          <i class="bx bx-window-open"></i> Live Preview
        </a>
      </div>
    </div>

    <!-- Alert Notifications -->
    <div v-if="saveSuccess" class="alert alert-success alert-dismissible fade show d-flex align-items-center mb-4" role="alert">
      <i class="bx bx-check-circle fs-4 me-2"></i>
      <div><strong>Berhasil!</strong> Konten section berhasil diperbarui secara langsung di database SQLite.</div>
    </div>

    <div v-if="errorMessage" class="alert alert-danger d-flex align-items-center mb-4" role="alert">
      <i class="bx bx-error-circle fs-4 me-2"></i>
      <div>{{ errorMessage }}</div>
    </div>

    <!-- Main Card Form Sneat Style: Header & Info Section -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
          <i class="bx bx-slider-alt text-primary"></i>
          Editor Konten: {{ formData.section_name || sectionKey }}
        </h5>
        <span class="badge bg-label-info px-3 py-1 text-primary fw-semibold" style="background-color: #ebedff;">
          ID Key: {{ sectionKey }}
        </span>
      </div>

      <div class="card-body p-4">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Memuat...</span>
          </div>
          <p class="mt-2 text-muted">Mengambil data dari Go SQLite...</p>
        </div>

        <form v-else @submit.prevent="handleSubmit">
          <div class="row">
            <!-- Kolom Kiri: Form Input -->
            <div class="col-lg-8">
              <!-- Subtitle / Tagline -->
              <div class="mb-3">
                <label class="form-label fw-bold text-dark">{{ sectionHelper.subtitleLabel }}</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="formData.subtitle" 
                  placeholder="Masukkan tagline atau subjudul..."
                  required
                />
                <div class="form-text">Teks penjelas singkat atau badge penanda di atas judul utama.</div>
              </div>

              <!-- Title -->
              <div class="mb-3">
                <label class="form-label fw-bold text-dark">{{ sectionHelper.titleLabel }}</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="formData.title" 
                  placeholder="Masukkan judul utama..."
                  required
                />
              </div>

              <!-- Body / Narrative -->
              <div class="mb-3">
                <label class="form-label fw-bold text-dark">{{ sectionHelper.bodyLabel }}</label>
                <textarea 
                  class="form-control" 
                  rows="5" 
                  v-model="formData.body" 
                  placeholder="Masukkan deskripsi detail..."
                  required
                ></textarea>
                <div class="form-text">Deskripsi lengkap atau narasi profil yang ditampilkan di halaman.</div>
              </div>

              <!-- File Upload Gambar Section -->
              <div class="mb-4">
                <label class="form-label fw-bold text-dark d-flex justify-content-between align-items-center">
                  <span>Upload File Gambar {{ formData.section_name || sectionKey }}</span>
                  <span v-if="uploadingImage" class="badge bg-primary text-white">
                    <i class="bx bx-loader-alt bx-spin me-1"></i> Mengunggah...
                  </span>
                  <span v-else-if="uploadSuccess" class="badge bg-success text-white">
                    <i class="bx bx-check me-1"></i> Terunggah!
                  </span>
                </label>

                <!-- Input File Upload -->
                <div class="input-group mb-2">
                  <input 
                    type="file" 
                    class="form-control" 
                    id="imageFileUpload" 
                    accept="image/png, image/jpeg, image/jpg, image/webp" 
                    @change="handleFileUpload"
                    :disabled="uploadingImage"
                  />
                  <label class="input-group-text bg-light text-primary" for="imageFileUpload">
                    <i class="bx bx-upload me-1"></i> Unggah Gambar
                  </label>
                </div>
                <div class="form-text">Pilih file gambar dari komputer (PNG, JPG, JPEG, WEBP). File otomatis tersimpan di server.</div>

                <!-- Input path/url tersimpan (readonly/terisi otomatis) -->
                <div class="mt-2">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text bg-light text-muted small">File Aktif</span>
                    <input 
                      type="text" 
                      class="form-control form-control-sm text-muted bg-light" 
                      v-model="formData.image_url" 
                      placeholder="Belum ada gambar yang diunggah" 
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Kolom Kanan: Pengaturan & Live Image Preview -->
            <div class="col-lg-4 border-start-lg ps-lg-4">
              <!-- Status Publikasi Switch -->
              <div class="card bg-light border-0 p-3 mb-4">
                <label class="form-label fw-bold text-dark d-block mb-2">Visibilitas Section</label>
                <div class="form-check form-switch mb-2">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="sectionStatus"
                    :checked="formData.is_active === 1"
                    @change="formData.is_active = $event.target.checked ? 1 : 0"
                  />
                  <label class="form-check-label fw-semibold" for="sectionStatus">
                    {{ formData.is_active === 1 ? 'Aktif (Ditampilkan Publik)' : 'Nonaktif (Disembunyikan)' }}
                  </label>
                </div>
                <small class="text-muted">
                  Bila dinonaktifkan, section ini dapat disembunyikan dari rendering publik landing page.
                </small>
              </div>

              <!-- Pratinjau Gambar -->
              <div class="card bg-light border-0 p-3 mb-4">
                <label class="form-label fw-bold text-dark mb-2">Pratinjau Media Gambar</label>
                <div class="text-center p-2 bg-white rounded border" style="min-height: 160px; display: flex; align-items: center; justify-content: center;">
                  <img 
                    v-if="formData.image_url" 
                    :src="resolvePreviewImage(formData.image_url)" 
                    alt="Preview" 
                    class="img-fluid rounded" 
                    style="max-height: 180px; object-fit: cover;"
                    @error="$event.target.src = 'https://placehold.co/400x250?text=Gambar+Tidak+Ditemukan'"
                  />
                  <span v-else class="text-muted small">Belum ada gambar disematkan</span>
                </div>
              </div>

              <div class="card bg-light border-0 p-3">
                <small class="text-muted">
                  <strong>Pembaruan Terakhir:</strong><br />
                  {{ formData.updated_at ? new Date(formData.updated_at).toLocaleString('id-ID') : '-' }}
                </small>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="border-top pt-4 mt-2 d-flex justify-content-end gap-3">
            <button type="button" class="btn btn-outline-secondary" @click="loadSectionData" :disabled="saving">
              <i class="bx bx-reset me-1"></i> Reset Data
            </button>
            <button type="submit" class="btn btn-primary d-flex align-items-center gap-2 shadow-sm" :disabled="saving">
              <i class="bx bx-save" :class="{ 'bx-spin': saving }"></i>
              <span>{{ saving ? 'Menyimpan...' : 'Simpan Perubahan Section' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
