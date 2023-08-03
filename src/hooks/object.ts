import { useState } from 'react'

export function useObject<T>(init: T) {
  const [val, set] = useState(init)
  return { val, set }
}
