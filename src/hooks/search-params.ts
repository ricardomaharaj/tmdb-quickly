import { useSearchParams } from 'react-router-dom'

export function useSp<T extends Record<string, string>>(defaults: T) {
  const [sp, setSp] = useSearchParams()

  const val = (() => {
    const rec: Record<string, string> = {}
    for (const key in defaults) rec[key] = sp.get(key) || defaults[key]
    return rec as T
  })()

  function rpl(upd: Partial<T>) {
    const newSp = new URLSearchParams({ ...val, ...upd })
    setSp(newSp, { replace: true })
  }

  return [val, rpl] as const
}
