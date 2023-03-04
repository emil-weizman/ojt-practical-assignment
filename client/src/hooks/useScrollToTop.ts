import { useCallback } from 'react'

export const useScrollToTop = () => {
  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 200)
  }, [])

  return { scrollToTop }
}
