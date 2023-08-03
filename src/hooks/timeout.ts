import { useEffect, useRef } from 'react'

export function useTimeout<T>(
  callback: () => void,
  dependents: T[],
  ms?: number,
) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timeoutRef.current = setTimeout(callback, ms ?? 600)

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, dependents)
}
