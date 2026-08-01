import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/ui/ProtectedRoute'
import Home from './pages/Home'
import Stay from './pages/Stay'
import Dine from './pages/Dine'
import Experiences from './pages/Experiences'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

// Admin pages
import Dashboard from './pages/admin/Dashboard'
import AdminRooms from './pages/admin/Rooms'
import AdminMenuItems from './pages/admin/MenuItems'
import AdminExperiences from './pages/admin/Experiences'
import AdminGallery from './pages/admin/Gallery'
import AdminRoomReservations from './pages/admin/RoomReservations'
import AdminDiningReservations from './pages/admin/DiningReservations'
import AdminExperienceBookings from './pages/admin/ExperienceBookings'
import AdminInquiries from './pages/admin/Inquiries'
import AdminSubscribers from './pages/admin/Subscribers'
import AdminUploads from './pages/admin/Uploads'

function PublicLayout() {
  return <Layout><Outlet /></Layout>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/dine" element={<Dine />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="rooms" element={<AdminRooms />} />
              <Route path="menu-items" element={<AdminMenuItems />} />
              <Route path="experiences" element={<AdminExperiences />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="room-reservations" element={<AdminRoomReservations />} />
              <Route path="dining-reservations" element={<AdminDiningReservations />} />
              <Route path="experience-bookings" element={<AdminExperienceBookings />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="subscribers" element={<AdminSubscribers />} />
              <Route path="uploads" element={<AdminUploads />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
