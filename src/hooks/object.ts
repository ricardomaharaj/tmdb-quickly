import { useState } from 'react'

export function useStateObject<T>(init: T) {
  const [val, set] = useState(init)
  return { val, set }
}
