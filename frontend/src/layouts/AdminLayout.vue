<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const navSections = [
  { key: 'beranda', name: 'Kelola Beranda', icon: 'bx-home-circle', path: '/admin/sections/beranda', desc: 'Hero banner, judul & tagline' },
  { key: 'about', name: 'Kelola About', icon: 'bx-user-check', path: '/admin/sections/about', desc: 'Tentang kami, deskripsi profil' },
  { key: 'layanan', name: 'Kelola Layanan', icon: 'bx-briefcase-alt-2', path: '/admin/sections/layanan', desc: 'Layanan & cakupan servis' },
  { key: 'portofolio', name: 'Kelola Portofolio', icon: 'bx-collection', path: '/admin/sections/portofolio', desc: 'Galeri, testimoni & proyek' },
  { key: 'kontak', name: 'Pesan Kontak', icon: 'bx-envelope', path: '/admin/contacts', desc: 'Daftar pesan kontak masuk dari form web' },
]

const currentSectionName = computed(() => {
  if (route.path === '/admin') return 'Dashboard Ringkasan'
  const found = navSections.find(s => s.path === route.path)
  return found ? found.name : 'CMS Section'
})
</script>

<template>
  <div class="layout-wrapper layout-content-navbar min-vh-100 bg-light position-relative">
    <!-- Backdrop Overlay untuk Tampilan HP / Mobile saat Sidebar Terbuka -->
    <div 
      v-if="isSidebarOpen" 
      class="sidebar-backdrop position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
      style="z-index: 1040;"
      @click="closeSidebar"
    ></div>

    <div class="layout-container d-flex">
      <!-- Sidebar Sneat Responsive -->
      <aside 
        id="layout-menu" 
        class="layout-menu menu-vertical menu bg-menu-theme border-end shadow-sm"
        :class="{ 'mobile-open': isSidebarOpen }"
      >
        <div class="app-brand demo py-3 px-4 border-bottom d-flex align-items-center justify-content-between">
          <router-link to="/admin" class="app-brand-link text-decoration-none d-flex align-items-center gap-2" @click="closeSidebar">
            <span class="app-brand-logo demo">
              <span class="badge bg-primary rounded-circle p-2 d-inline-flex align-items-center justify-content-center" style="width: 36px; height: 36px; background-color: #696cff !important;">
                <i class="bx bx-cube-alt fs-4 text-white"></i>
              </span>
            </span>
            <span class="app-brand-text demo menu-text fw-bolder ms-2 text-dark fs-5">TITAN CMS</span>
          </router-link>

          <!-- Tombol Tutup Sidebar di HP -->
          <button 
            type="button" 
            class="btn btn-sm btn-icon d-xl-none text-secondary"
            @click="closeSidebar"
            aria-label="Tutup Menu"
          >
            <i class="bx bx-x fs-3"></i>
          </button>
        </div>

        <div class="menu-inner-shadow"></div>

        <ul class="menu-inner py-3 list-unstyled">
          <!-- Dashboard Ringkasan -->
          <li class="menu-item px-3 mb-1" :class="{ 'active': route.path === '/admin' }">
            <router-link 
              to="/admin" 
              class="menu-link custom-nav-link text-decoration-none d-flex align-items-center px-3 py-2 rounded-3" 
              :class="{ 'is-active': route.path === '/admin' }"
              @click="closeSidebar"
            >
              <i class="menu-icon tf-icons bx bx-home-smile me-3 fs-5"></i>
              <div class="fw-medium">Dashboard</div>
            </router-link>
          </li>

          <li class="menu-header small text-uppercase px-4 mt-4 mb-2 text-muted fw-bold" style="font-size: 0.75rem; letter-spacing: 0.05em;">
            Manajemen Konten
          </li>

          <!-- Dynamic Sections -->
          <li 
            v-for="sec in navSections" 
            :key="sec.key" 
            class="menu-item px-3 mb-1"
            :class="{ 'active': route.path === sec.path }"
          >
            <router-link 
              :to="sec.path" 
              class="menu-link custom-nav-link text-decoration-none d-flex align-items-center px-3 py-2 rounded-3"
              :class="{ 'is-active': route.path === sec.path }"
              @click="closeSidebar"
            >
              <i class="menu-icon tf-icons bx me-3 fs-5" :class="sec.icon"></i>
              <div>{{ sec.name }}</div>
            </router-link>
          </li>

          <li class="menu-header small text-uppercase px-4 mt-4 mb-2 text-muted fw-bold" style="font-size: 0.75rem; letter-spacing: 0.05em;">
            Live Preview Publik
          </li>
          <li class="menu-item px-3 mb-1">
            <router-link 
              to="/" 
              target="_blank" 
              class="menu-link custom-nav-link text-decoration-none d-flex align-items-center px-3 py-2 rounded-3 text-secondary hover-bg-light"
              @click="closeSidebar"
            >
              <i class="menu-icon tf-icons bx bx-globe me-3 fs-5 text-info"></i>
              <div>Buka Halaman Publik</div>
            </router-link>
          </li>
        </ul>
      </aside>

      <!-- Layout Page Content -->
      <div class="layout-page d-flex flex-column flex-grow-1" style="min-width: 0;">
        <!-- Top Navbar -->
        <nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme bg-white shadow-sm px-3 px-sm-4 py-2 border-bottom" id="layout-navbar">
          <div class="d-flex align-items-center justify-content-between w-100 flex-nowrap">
            <!-- Sisi Kiri: Hamburger Menu (Mobile Only) & Judul Section Sebaris -->
            <div class="d-flex align-items-center gap-2 overflow-hidden">
              <!-- Tombol Icon Sidebar Hanya Muncul di Mobile (d-xl-none) -->
              <button 
                type="button" 
                class="btn btn-outline-secondary btn-sm d-xl-none d-flex align-items-center justify-content-center p-0 flex-shrink-0"
                @click="toggleSidebar"
                aria-label="Toggle Sidebar Menu"
                style="width: 36px; height: 36px;"
              >
                <i class="bx bx-menu fs-4"></i>
              </button>

              <div class="d-flex align-items-center text-truncate">
                <i class="bx bx-chevron-right me-1 text-muted d-none d-sm-inline"></i>
                <span class="fw-bold text-dark fs-6 text-truncate">{{ currentSectionName }}</span>
              </div>
            </div>

            <!-- Sisi Kanan: Hanya Icon Globe untuk Live Preview Web -->
            <div class="d-flex align-items-center flex-shrink-0 ms-2">
              <router-link 
                to="/" 
                target="_blank" 
                class="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center shadow-sm p-0 rounded-circle"
                title="Buka Landing Page Publik"
                style="width: 36px; height: 36px;"
              >
                <i class="bx bx-globe fs-5"></i>
              </router-link>
            </div>
          </div>
        </nav>

        <!-- Content wrapper -->
        <div class="content-wrapper flex-grow-1 p-3 p-sm-4">
          <div class="container-xxl flex-grow-1 container-p-y p-0">
            <router-view />
          </div>
        </div>

        <!-- Footer -->
        <footer class="content-footer footer bg-footer-theme bg-white py-3 border-top px-4 text-center text-muted small">
          <div>
            © 2026 <strong>TITAN KONSTRUKSI</strong> CMS — Diintegrasikan dengan Sneat Template & Go Backend
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Sidebar styling bawaan & responsive desktop */
#layout-menu {
  width: 260px;
  min-height: 100vh;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
}

/* Base Nav link styling */
.custom-nav-link {
  color: #697a8d !important;
  transition: all 0.2s ease-in-out;
  background-color: transparent;
}

.custom-nav-link .menu-icon {
  color: #697a8d !important;
}

.custom-nav-link:hover:not(.is-active) {
  background-color: #f5f5f9;
  color: #696cff !important;
}

.custom-nav-link:hover:not(.is-active) .menu-icon {
  color: #696cff !important;
}

/* Nav Link ACTIVE: Warna Primary Pekat Solid (#696cff), Teks & Icon Putih Bersih */
.custom-nav-link.is-active {
  background-color: #696cff !important;
  background-image: linear-gradient(72deg, #696cff, #7e81ff) !important;
  color: #ffffff !important;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(105, 108, 255, 0.4) !important;
}

.custom-nav-link.is-active div,
.custom-nav-link.is-active .menu-icon,
.custom-nav-link.is-active i {
  color: #ffffff !important;
  opacity: 1 !important;
}

/* Override gaya bawaan core.css Sneat pada item menu aktif agar tidak ada tab biru muda/garis samping pudar */
:deep(.menu-vertical .menu-item.active > .menu-link:not(.menu-toggle)) {
  background-color: transparent !important;
  color: inherit !important;
}

:deep(.menu-vertical .menu-item.active::before) {
  display: none !important;
}

/* Responsif Mobile & HP (Layar < 1200px) */
@media (max-width: 1199.98px) {
  #layout-menu {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    bottom: 0 !important;
    z-index: 1050 !important;
    transform: translateX(-100%);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  /* Saat icon sidebar diklik, sidebar bergeser penuh ke depan konten */
  #layout-menu.mobile-open {
    transform: translateX(0) !important;
  }
}
</style>
