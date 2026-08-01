import { useState, useEffect } from 'react'
import { api } from '../../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getDashboard()
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorState message={error} />
  if (!stats) return null

  const cards = [
    { label: 'Total Rooms', value: stats.roomCount, color: 'from-emerald-500/20 to-emerald-500/5', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { label: 'Menu Items', value: stats.menuItemCount, color: 'from-amber-500/20 to-amber-500/5', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { label: 'Experiences', value: stats.experienceCount, color: 'from-violet-500/20 to-violet-500/5', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { label: 'Gallery Items', value: stats.galleryCount, color: 'from-sky-500/20 to-sky-500/5', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Room Bookings', value: stats.roomReservationCount, color: 'from-teal-500/20 to-teal-500/5', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Dining Bookings', value: stats.diningReservationCount, color: 'from-rose-500/20 to-rose-500/5', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
    { label: 'Experience Bkgs', value: stats.experienceBookingCount, color: 'from-purple-500/20 to-purple-500/5', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Inquiries', value: stats.inquiryCount, color: 'from-blue-500/20 to-blue-500/5', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Users', value: stats.userCount, color: 'from-cyan-500/20 to-cyan-500/5', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { label: 'Subscribers', value: stats.subscriberCount, color: 'from-pink-500/20 to-pink-500/5', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-dark-green">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">Overview of your Saffron House property</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-border p-5 hover:shadow-sm transition-shadow">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
              <svg className="w-5 h-5 text-dark-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
              </svg>
            </div>
            <p className="text-2xl font-bold text-dark-green">{card.value}</p>
            <p className="text-xs text-text-muted mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {stats.recentExperienceBookings?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-serif text-dark-green mb-4">Recent Experience Bookings</h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {stats.recentExperienceBookings.slice(0, 5).map((bk) => (
              <div key={bk.id} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-text-dark">{bk.name || bk.user?.name || 'Guest'}</p>
                  <p className="text-xs text-text-muted">{bk.experience?.name || bk.experience?.title || '—'} · {new Date(bk.date).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  bk.status === 'CONFIRMED' || bk.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                  bk.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{bk.status.charAt(0) + bk.status.slice(1).toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.recentRoomReservations?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-serif text-dark-green mb-4">Recent Room Bookings</h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {stats.recentRoomReservations.slice(0, 5).map((bk) => (
              <div key={bk.id} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-text-dark">{bk.guestName || bk.user?.name || 'Guest'}</p>
                  <p className="text-xs text-text-muted">{bk.room?.title || '—'} · {new Date(bk.checkIn).toLocaleDateString()} - {new Date(bk.checkOut).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  bk.status === 'CONFIRMED' || bk.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                  bk.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{bk.status.charAt(0) + bk.status.slice(1).toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.recentDiningReservations?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-serif text-dark-green mb-4">Recent Dining Bookings</h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {stats.recentDiningReservations.slice(0, 5).map((bk) => (
              <div key={bk.id} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-text-dark">{bk.name || 'Guest'}</p>
                  <p className="text-xs text-text-muted">{new Date(bk.date).toLocaleDateString()} at {bk.time} · {bk.guests} guests</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  bk.status === 'CONFIRMED' || bk.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                  bk.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{bk.status.charAt(0) + bk.status.slice(1).toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.recentInquiries?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-serif text-dark-green mb-4">Recent Inquiries</h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {stats.recentInquiries.slice(0, 5).map((inq) => (
              <div key={inq.id} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-text-dark">{inq.name}</p>
                  <p className="text-xs text-text-muted">{inq.email} · {inq.subject}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${inq.read ? 'bg-card text-text-muted' : 'bg-gold/20 text-gold font-medium'}`}>
                  {inq.read ? 'Read' : 'New'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-8 w-48 bg-card rounded-lg animate-pulse" />
        <div className="h-4 w-64 bg-card rounded-lg mt-2 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-border p-5">
            <div className="w-10 h-10 rounded-lg bg-card animate-pulse mb-3" />
            <div className="h-8 w-16 bg-card rounded animate-pulse" />
            <div className="h-3 w-20 bg-card rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <svg className="w-12 h-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <p className="text-text-muted text-sm">{message}</p>
      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-dark-green rounded-lg hover:bg-dark-green-hover transition-colors">
        Retry
      </button>
    </div>
  )
}
