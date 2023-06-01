import { useEffect, useRef, useState } from 'react'

export function useDbQuery<T>(args: {
  query: T
  replaceQueries: (args: Partial<{ query: T }>) => void
}) {
  const { query, replaceQueries } = args

  const [dbVal, setDbVal] = useState<T>(query)
  const ref = useRef<NodeJS.Timeout>()

  useEffect(() => {
    ref.current = setTimeout(() => {
      if (!dbVal || dbVal === query) return
      replaceQueries({ query: dbVal })
    }, 600)
    return () => {
      clearTimeout(ref.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbVal])

  return { setDbVal }
}
