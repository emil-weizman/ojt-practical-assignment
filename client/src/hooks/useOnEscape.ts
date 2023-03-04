import { useCallback, useEffect, useState } from 'react'

export const useOnEscape = () => {
  const [escapeClicked, setEscapeClicked] = useState(0)

  const checkEscapeClicked = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEscapeClicked(Math.floor(Math.random() * 2) + 1)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', checkEscapeClicked, false)

    return () => {
      document.removeEventListener('keydown', checkEscapeClicked, false)
    }
  }, [checkEscapeClicked])

  return { escapeClicked }
}
