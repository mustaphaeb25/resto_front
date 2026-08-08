const API_BASE = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
).replace(/\/+$/, '')

function getToken() {
  return localStorage.getItem('token')
}

async function request(endpoint, options = {}) {
  const { method = 'GET', body, auth = false } = options

  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const config = { method, headers }
  if (body) config.body = JSON.stringify(body)

  const res = await fetch(`${API_BASE}${endpoint}`, config)

  if (!res.ok) {
    if (res.status === 401 && auth) {
      localStorage.removeItem('token')
    }
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  if (res.status === 204) return null
  return res.json()
}


export const api = {
  // Auth
  login: (data) => request('/auth/login', { method: 'POST', body: data }),
  register: (data) => request('/auth/register', { method: 'POST', body: data }),
  getMe: () => request('/auth/me', { auth: true }),

  // Content
  getRooms: (category) => request(`/rooms${category && category !== 'all' ? `?category=${category}` : ''}`),
  getRoom: (id) => request(`/rooms/${id}`),
  getMenuItems: (category) => request(`/menu-items${category && category !== 'all' ? `?category=${category}` : ''}`),
  getExperiences: (category) => request(`/experiences${category && category !== 'all' ? `?category=${category}` : ''}`),
  getGallery: (category) => request(`/gallery${category && category !== 'all' ? `?category=${category}` : ''}`),

  // Reservations
  createDiningReservation: (data) => request('/reservations/dining', { method: 'POST', body: data, auth: !!getToken() }),
  createRoomReservation: (data) => request('/reservations/room', { method: 'POST', body: data, auth: !!getToken() }),
  createExperienceBooking: (data) => request('/reservations/experience', { method: 'POST', body: data, auth: true }),
  getMyRoomReservations: () => request('/reservations/room', { auth: true }),
  getMyDiningReservations: () => request('/reservations/dining', { auth: true }),
  getMyExperienceBookings: () => request('/reservations/experience', { auth: true }),

  // Contact & Newsletter
  submitContact: (data) => request('/contact', { method: 'POST', body: data }),
  subscribeNewsletter: (data) => request('/newsletter/subscribe', { method: 'POST', body: data }),

  // Reviews
  getReviews: (target, itemId) => request(`/reviews/${target}/${itemId}`),
  createReview: (data) => request('/reviews', { method: 'POST', body: data, auth: !!getToken() }),

  // Admin
  getDashboard: () => request('/admin/dashboard', { auth: true }),
  createRoom: (data) => request('/rooms', { method: 'POST', body: data, auth: true }),
  updateRoom: (id, data) => request(`/rooms/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteRoom: (id) => request(`/rooms/${id}`, { method: 'DELETE', auth: true }),
  createMenuItem: (data) => request('/menu-items', { method: 'POST', body: data, auth: true }),
  updateMenuItem: (id, data) => request(`/menu-items/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteMenuItem: (id) => request(`/menu-items/${id}`, { method: 'DELETE', auth: true }),
  createExperience: (data) => request('/experiences', { method: 'POST', body: data, auth: true }),
  updateExperience: (id, data) => request(`/experiences/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteExperience: (id) => request(`/experiences/${id}`, { method: 'DELETE', auth: true }),
  createGalleryItem: (data) => request('/gallery', { method: 'POST', body: data, auth: true }),
  updateGalleryItem: (id, data) => request(`/gallery/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteGalleryItem: (id) => request(`/gallery/${id}`, { method: 'DELETE', auth: true }),
  getAdminRoomReservations: () => request('/reservations/room/admin/all', { auth: true }),
  getAdminDiningReservations: () => request('/reservations/dining/admin/all', { auth: true }),
  getAdminExperienceBookings: () => request('/reservations/experience/admin/all', { auth: true }),
  updateRoomReservationStatus: (id, status) => request(`/reservations/room/${id}`, { method: 'PUT', body: { status }, auth: true }),
  updateDiningReservationStatus: (id, status) => request(`/reservations/dining/${id}`, { method: 'PUT', body: { status }, auth: true }),
  updateExperienceBookingStatus: (id, status) => request(`/reservations/experience/${id}`, { method: 'PUT', body: { status }, auth: true }),
  getInquiries: () => request('/contact', { auth: true }),
  markInquiryRead: (id) => request(`/contact/${id}/read`, { method: 'PUT', auth: true }),
  deleteInquiry: (id) => request(`/contact/${id}`, { method: 'DELETE', auth: true }),
  getSubscribers: () => request('/newsletter/subscribers', { auth: true }),
  uploadFile: async (formData) => {
    const token = getToken()
    const headers = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${API_BASE}/uploads`, { method: 'POST', headers, body: formData })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Upload failed')
    return data
  },
  getUploads: () => request('/uploads', { auth: true }),
}
