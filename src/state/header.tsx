import { useState } from "react"

export function useNavBar() {
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  return { menu, setMenu, search, setSearch }
}
