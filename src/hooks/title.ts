import { useEffect } from 'react'

const appName = 'TMDB Quickly'

export function useTitle(str?: string) {
  useEffect(() => {
    if (str) {
      document.title = `${str} | ${appName}`
    } else {
      document.title = `${appName}`
    }
  }, [str])
}
