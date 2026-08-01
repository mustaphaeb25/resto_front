import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: '', visible: false })
  const timerRef = useRef(null)

  const showToast = useCallback((message) => {
    setToast({ message, visible: true })
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setToast({ message: '', visible: false })
      timerRef.current = null
    }, 3500)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        className={`fixed bottom-6 right-6 z-[2000] flex items-center gap-3 rounded-lg bg-dark-green px-5 py-3.5 text-sm text-white shadow-lg transition-all duration-300 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-[100px] opacity-0'
        }`}
      >
        <span className="text-gold text-base">✓</span>
        <span>{toast.message}</span>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
