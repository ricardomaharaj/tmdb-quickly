import { useState } from 'preact/hooks'

export function useBool(init?: boolean) {
  const [bool, setBool] = useState(init ?? false)

  const setTrue = () => setBool(true)
  const setFalse = () => setBool(false)

  return { bool, setTrue, setFalse }
}
