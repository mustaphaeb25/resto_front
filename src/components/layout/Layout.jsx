import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'
import BackToTop from '../ui/BackToTop'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <TopBar />
      <Header />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
