<script setup>
import { ref, onMounted } from 'vue'
import { contentService } from '../../services/api'

const contents = ref([])
const loading = ref(true)
const error = ref(null)

const fetchDashboardData = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await contentService.getAllContents()
    contents.value = res.data.data || []
  } catch (err) {
    console.error('Error loading contents:', err)
    error.value = 'Gagal memuat status konten. Pastikan server Go berjalan di http://localhost:8080.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <div class="cms-dashboard">
    <!-- Header Welcome Card -->
    <div class="card mb-4 border-0 shadow-sm" style="background: linear-gradient(135deg, #696cff 0%, #3f42c2 100%);">
      <div class="card-body p-4 text-white">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h4 class="text-white fw-bold mb-1">Selamat Datang di Titan Panel CMS 🎉</h4>
            <p class="mb-0 text-white-50">
              Kelola teks, headline, dan media 4 section landing page secara langsung tanpa login.
            </p>
          </div>
          <a href="/" target="_blank" class="btn btn-light text-primary fw-semibold px-3 py-2 shadow-sm">
            <i class="bx bx-window-open me-1"></i> Preview Landing Page
          </a>
        </div>
      </div>
    </div>

    <!-- Alert jika server backend offline -->
    <div v-if="error" class="alert alert-warning d-flex align-items-center mb-4" role="alert">
      <i class="bx bx-error-circle fs-4 me-2"></i>
      <div>{{ error }}</div>
    </div>

    <!-- Overview Cards -->
    <div class="row mb-4">
      <div class="col-md-3 col-sm-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body d-flex align-items-center">
            <div class="avatar bg-primary text-white rounded p-3 me-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
              <i class="bx bx-layout fs-4"></i>
            </div>
            <div>
              <span class="d-block text-muted small">Total Section</span>
              <h5 class="card-title mb-0 fw-bold">4 Halaman</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3 col-sm-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body d-flex align-items-center">
            <div class="avatar bg-success text-white rounded p-3 me-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
              <i class="bx bx-check-double fs-4"></i>
            </div>
            <div>
              <span class="d-block text-muted small">Status Aktif</span>
              <h5 class="card-title mb-0 fw-bold">
                {{ contents.filter(c => c.is_active === 1).length }} / 4 Aktif
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3 col-sm-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body d-flex align-items-center">
            <div class="avatar bg-info text-white rounded p-3 me-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
              <i class="bx bx-data fs-4"></i>
            </div>
            <div>
              <span class="d-block text-muted small">Database</span>
              <h5 class="card-title mb-0 fw-bold">SQLite Mandiri</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3 col-sm-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body d-flex align-items-center">
            <div class="avatar bg-warning text-white rounded p-3 me-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
              <i class="bx bx-shield-quarter fs-4"></i>
            </div>
            <div>
              <span class="d-block text-muted small">Autentikasi</span>
              <h5 class="card-title mb-0 fw-bold">Open Access</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Management Table / Grid -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold text-dark">Daftar Konten Section Landing Page</h5>
        <button class="btn btn-sm btn-outline-secondary" @click="fetchDashboardData" :disabled="loading">
          <i class="bx bx-refresh" :class="{ 'bx-spin': loading }"></i> Segarkan Data
        </button>
      </div>

      <div class="table-responsive text-nowrap">
        <table class="table table-hover mb-0 align-middle">
          <thead class="table-light">
            <tr>
              <th style="width: 80px;">Key</th>
              <th>Nama Section</th>
              <th>Judul Utama Terkini</th>
              <th>Status</th>
              <th>Pembaruan Terakhir</th>
              <th class="text-center" style="width: 140px;">Aksi Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="text-center py-4 text-muted">
                <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                Memuat data section dari SQLite...
              </td>
            </tr>
            <tr v-else-if="contents.length === 0">
              <td colspan="6" class="text-center py-4 text-muted">Belum ada konten tersimpan.</td>
            </tr>
            <tr v-else v-for="item in contents" :key="item.id">
              <td>
                <span class="badge bg-label-primary px-2 py-1 text-primary fw-bold" style="background-color: #ebedff;">
                  {{ item.section_key }}
                </span>
              </td>
              <td class="fw-semibold text-dark">{{ item.section_name }}</td>
              <td style="max-width: 320px;" class="text-truncate" :title="item.title">
                {{ item.title }}
              </td>
              <td>
                <span v-if="item.is_active === 1" class="badge rounded-pill bg-success px-3 py-1">Aktif</span>
                <span v-else class="badge rounded-pill bg-secondary px-3 py-1">Nonaktif</span>
              </td>
              <td class="text-muted small">
                {{ new Date(item.updated_at).toLocaleString('id-ID') }}
              </td>
              <td class="text-center">
                <router-link :to="`/admin/sections/${item.section_key}`" class="btn btn-sm btn-primary d-inline-flex align-items-center gap-1 shadow-sm">
                  <i class="bx bx-edit-alt"></i> Kelola
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
