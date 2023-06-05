import { useEffect, useRef, useState } from 'react'

type Queries = {
  id: string
  query: string
  page: number
}

export function useDbQuery(args: {
  query: string
  replaceQueries: (update: Partial<Queries>) => void
}) {
  const { query, replaceQueries } = args

  const [dbVal, setDbVal] = useState(query)
  const ref = useRef<NodeJS.Timeout>()

  useEffect(() => {
    ref.current = setTimeout(() => {
      if (!dbVal || dbVal === query) return
      replaceQueries({ query: dbVal, page: 1 })
    }, 600)
    return () => {
      clearTimeout(ref.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbVal])

  return { setDbVal }
}
