import { useEffect, useRef, useState } from 'react'

export function useDebounce<T>(initialVal: T) {
  const [val, setVal] = useState<T>(initialVal)
  const [dbVal, setDbVal] = useState<T>(initialVal)

  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    intervalRef.current = setTimeout(() => {
      if (dbVal === val) return
      setVal(dbVal)
    }, 800)
    return () => {
      clearTimeout(intervalRef.current)
    }
  }, [dbVal])

  return { val, setVal, dbVal, setDbVal }
}
