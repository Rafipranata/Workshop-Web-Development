<script setup>
import { ref, onMounted } from 'vue'
import { contentService } from '../../services/api'

const contacts = ref([])
const loading = ref(true)
const actionError = ref('')
const actionSuccess = ref('')

// Modal Detail State
const selectedContact = ref(null)
const showDetailModal = ref(false)

const fetchContacts = async () => {
  loading.value = true
  actionError.value = ''
  try {
    const res = await contentService.getAllContacts()
    contacts.value = res.data.data || []
  } catch (err) {
    console.error('Gagal mengambil data kontak:', err)
    actionError.value = 'Gagal memuat pesan kontak. Pastikan server backend Go aktif di port 8080.'
  } finally {
    loading.value = false
  }
}

const openDetail = (item) => {
  selectedContact.value = item
  showDetailModal.value = true
}

const closeDetail = () => {
  selectedContact.value = null
  showDetailModal.value = false
}

const handleDelete = async (item) => {
  const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus pesan dari "${item.name}"?`)
  if (!confirmed) return

  actionError.value = ''
  actionSuccess.value = ''
  try {
    await contentService.deleteContact(item.id)
    actionSuccess.value = `Pesan dari "${item.name}" berhasil dihapus!`
    contacts.value = contacts.value.filter(c => c.id !== item.id)
    if (selectedContact.value && selectedContact.value.id === item.id) {
      closeDetail()
    }
    setTimeout(() => {
      actionSuccess.value = ''
    }, 4000)
  } catch (err) {
    console.error('Gagal menghapus pesan kontak:', err)
    actionError.value = 'Gagal menghapus pesan kontak dari SQLite backend.'
  }
}

onMounted(() => {
  fetchContacts()
})
</script>

<template>
  <div class="contacts-cms">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold mb-1 text-dark">
          Manajemen Pesan Kontak & Penawaran Masuk
        </h4>
        <p class="text-muted mb-0 small">
          Data pesan dari formulir kontak landing page publik yang tersimpan di SQLite database.
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary d-flex align-items-center gap-1" @click="fetchContacts" :disabled="loading">
          <i class="bx bx-refresh" :class="{ 'bx-spin': loading }"></i> Segarkan Data
        </button>
        <a href="/#contact" target="_blank" class="btn btn-outline-primary d-flex align-items-center gap-1">
          <i class="bx bx-window-open"></i> Buka Form Kontak Web
        </a>
      </div>
    </div>

    <!-- Alert Notifications -->
    <div v-if="actionSuccess" class="alert alert-success alert-dismissible fade show d-flex align-items-center mb-4">
      <i class="bx bx-check-circle fs-4 me-2"></i>
      <div>{{ actionSuccess }}</div>
    </div>

    <div v-if="actionError" class="alert alert-danger d-flex align-items-center mb-4">
      <i class="bx bx-error-circle fs-4 me-2"></i>
      <div>{{ actionError }}</div>
    </div>

    <!-- Table Card Sneat Style -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
          <i class="bx bx-envelope text-primary"></i>
          Daftar Pesan Kontak Masuk ({{ contacts.length }} Pesan)
        </h5>
        <span class="badge bg-label-primary px-3 py-1 text-primary fw-semibold" style="background-color: #ebedff;">
          Total: {{ contacts.length }}
        </span>
      </div>

      <div class="table-responsive text-nowrap">
        <table class="table table-hover mb-0 align-middle">
          <thead class="table-light">
            <tr>
              <th style="width: 70px;">ID</th>
              <th style="width: 180px;">Nama Pengirim</th>
              <th style="width: 200px;">Alamat Email</th>
              <th style="width: 180px;">Jenis Layanan</th>
              <th>Pesan / Rencana Proyek</th>
              <th style="width: 150px;">Tanggal Masuk</th>
              <th class="text-center" style="width: 160px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="text-center py-4 text-muted">
                <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                Mengambil data pesan dari database SQLite...
              </td>
            </tr>
            <tr v-else-if="contacts.length === 0">
              <td colspan="7" class="text-center py-5 text-muted">
                <i class="bx bx-inbox fs-1 d-block mb-2 text-secondary"></i>
                Belum ada pesan kontak yang masuk dari formulir landing page.
              </td>
            </tr>
            <tr v-else v-for="item in contacts" :key="item.id">
              <td>
                <span class="badge bg-label-secondary text-dark fw-bold">#{{ item.id }}</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="avatar bg-primary text-white rounded-circle p-2 small d-inline-flex align-items-center justify-content-center" style="width: 32px; height: 32px; font-size: 0.75rem;">
                    {{ item.name.charAt(0).toUpperCase() }}
                  </span>
                  <span class="fw-semibold text-dark">{{ item.name }}</span>
                </div>
              </td>
              <td>
                <a :href="`mailto:${item.email}`" class="text-primary text-decoration-none">
                  {{ item.email }}
                </a>
              </td>
              <td>
                <span class="badge bg-label-info text-primary fw-normal" style="background-color: #ebedff;">
                  {{ item.service || 'Umum / Belum Dipilih' }}
                </span>
              </td>
              <td style="max-width: 280px; white-space: normal;">
                <span class="text-muted small" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">
                  {{ item.message }}
                </span>
              </td>
              <td class="text-muted small">
                {{ new Date(item.created_at).toLocaleString('id-ID') }}
              </td>
              <td class="text-center">
                <div class="d-inline-flex gap-1">
                  <!-- Tombol Detail -->
                  <button 
                    type="button" 
                    class="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 shadow-sm px-2.5"
                    @click="openDetail(item)"
                    title="Lihat Detail Pesan"
                  >
                    <i class="bx bx-show"></i> Detail
                  </button>
                  <!-- Tombol Delete -->
                  <button 
                    type="button" 
                    class="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1 shadow-sm px-2.5"
                    @click="handleDelete(item)"
                    title="Hapus Pesan"
                  >
                    <i class="bx bx-trash"></i> Hapus
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Pop-up Detail Pesan -->
    <div v-if="showDetailModal && selectedContact" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-white border-bottom py-3">
            <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i class="bx bx-envelope-open text-primary"></i> Detail Pesan Kontak #{{ selectedContact.id }}
            </h5>
            <button type="button" class="btn-close" @click="closeDetail"></button>
          </div>
          <div class="modal-body p-4">
            <div class="row g-3 mb-3">
              <div class="col-sm-6">
                <label class="form-label text-muted small text-uppercase fw-bold mb-1">Nama Pengirim</label>
                <div class="fw-bold text-dark fs-6">{{ selectedContact.name }}</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label text-muted small text-uppercase fw-bold mb-1">Alamat Email</label>
                <div>
                  <a :href="`mailto:${selectedContact.email}`" class="text-primary fw-semibold fs-6">
                    {{ selectedContact.email }}
                  </a>
                </div>
              </div>
              <div class="col-sm-6">
                <label class="form-label text-muted small text-uppercase fw-bold mb-1">Pilihan Jenis Layanan</label>
                <div>
                  <span class="badge bg-primary px-3 py-1.5 fs-7">
                    {{ selectedContact.service || 'Tidak spesifik' }}
                  </span>
                </div>
              </div>
              <div class="col-sm-6">
                <label class="form-label text-muted small text-uppercase fw-bold mb-1">Waktu Masuk</label>
                <div class="text-muted">
                  {{ new Date(selectedContact.created_at).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' }) }}
                </div>
              </div>
            </div>

            <hr />

            <div>
              <label class="form-label text-muted small text-uppercase fw-bold mb-2">Detail Rencana Proyek / Pesan</label>
              <div class="p-3 bg-light rounded border text-dark" style="white-space: pre-wrap; line-height: 1.6; font-size: 0.9rem;">
                {{ selectedContact.message }}
              </div>
            </div>
          </div>
          <div class="modal-footer bg-light border-top d-flex justify-content-between">
            <button 
              type="button" 
              class="btn btn-outline-danger d-inline-flex align-items-center gap-1"
              @click="handleDelete(selectedContact)"
            >
              <i class="bx bx-trash"></i> Hapus Pesan Ini
            </button>
            <div class="d-flex gap-2">
              <a :href="`mailto:${selectedContact.email}?subject=Tanggapan%20Permintaan%20Layanan%20Titan%20Konstruksi`" class="btn btn-primary d-inline-flex align-items-center gap-1">
                <i class="bx bx-reply"></i> Balas Email
              </a>
              <button type="button" class="btn btn-secondary" @click="closeDetail">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
