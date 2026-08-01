import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const directionClasses = {
  up: 'animate-fade-in',
  left: 'animate-fade-in-left',
  right: 'animate-fade-in-right',
}

export default function FadeIn({ children, direction = 'up', delay = 0, className = '' }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? directionClasses[direction] : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
