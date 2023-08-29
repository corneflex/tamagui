import { useEffect } from 'react'

function useScrollRestoration() {
  useEffect(() => {
    // Disable the browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Restore scroll position when the component mounts
    const savedScrollPosition = localStorage.getItem('scrollPosition')
    if (savedScrollPosition !== null) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedScrollPosition, 0), left: 0, behavior: 'smooth' })
      }, 50)
    }

    const handleScroll = () => {
      if (window.scrollY < 1) return
      localStorage.setItem('scrollPosition', window.scrollY.toString())
      return 'are you sure'
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null // This hook doesn't return anything
}

export default useScrollRestoration
