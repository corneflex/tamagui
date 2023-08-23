import { useEffect } from 'react'

export const useEndOfScroll = (callback) => {
  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      const windowHeight = window.innerHeight
      const fullDocumentHeight = document.documentElement.offsetHeight

      if (scrollTop + windowHeight >= fullDocumentHeight) {
        callback()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback])
}
