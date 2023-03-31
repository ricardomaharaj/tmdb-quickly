import { useState } from "react"

export function useSearch() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  return { query, setQuery, page, setPage }
}
