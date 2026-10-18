import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const contentService = {
  // Ambil semua section
  getAllContents() {
    return api.get('/contents')
  },
  // Ambil konten section spesifik
  getContentByKey(key) {
    return api.get(`/contents/${key}`)
  },
  // Perbarui konten section
  updateContent(key, data) {
    return api.put(`/contents/${key}`, data)
  },

  // Upload file gambar
  uploadImage(formData) {
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // Contact Messages API
  getAllContacts() {
    return api.get('/contacts')
  },
  createContact(data) {
    return api.post('/contacts', data)
  },
  deleteContact(id) {
    return api.delete(`/contacts/${id}`)
  }
}

export default api
