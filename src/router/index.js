import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/public/LandingView.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import DashboardView from '../views/admin/DashboardView.vue'
import SectionEditorView from '../views/admin/SectionEditorView.vue'
import ContactMessagesView from '../views/admin/ContactMessagesView.vue'

const routes = [
  // Rute Publik Sesuai Blueprint
  {
    path: '/',
    name: 'Home',
    component: LandingView
  },
  {
    path: '/beranda',
    name: 'Beranda',
    component: LandingView
  },
  {
    path: '/about',
    name: 'About',
    component: LandingView
  },
  {
    path: '/layanan',
    name: 'Layanan',
    component: LandingView
  },
  {
    path: '/portofolio',
    name: 'Portofolio',
    component: LandingView
  },

  // Rute Panel CMS Sneat (Tanpa Login)
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: DashboardView
      },
      {
        path: 'sections/:key',
        name: 'AdminSectionEditor',
        component: SectionEditorView
      },
      {
        path: 'contacts',
        name: 'AdminContacts',
        component: ContactMessagesView
      }
    ]
  },

  // Fallback redirect ke Home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // Jika ada hash atau rute publik tentang/layanan/portofolio, auto scroll ke section terkait
    if (to.path === '/beranda') {
      return { el: '#hero', behavior: 'smooth' }
    }
    if (to.path === '/about') {
      return { el: '#about', behavior: 'smooth' }
    }
    if (to.path === '/layanan') {
      return { el: '#services', behavior: 'smooth' }
    }
    if (to.path === '/portofolio') {
      return { el: '#portfolio', behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
