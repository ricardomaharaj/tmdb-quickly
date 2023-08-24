import { useEffect } from 'react'

export function useTitle(str?: string) {
  useEffect(() => {
    document.title = 'TMDB NEXT'
    if (str) document.title += ` | ${str}`
  }, [str])
}
