import { useEffect, useRef } from 'react'

export function useTimeout<T>(cb: () => void, deps: T[], ms?: number) {
  const ref = useRef<NodeJS.Timeout>()

  useEffect(() => {
    ref.current = setTimeout(cb, ms ?? 600)
    return () => clearTimeout(ref.current)
  }, deps)
}
