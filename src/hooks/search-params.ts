import { useRouter } from 'next/router'

export function useSp<T extends Record<string, string>>(defaults: T) {
  const router = useRouter()
  const routerQuery = router.query as Record<string, string | undefined>

  const val = (() => {
    const rec: Record<string, string> = {}
    for (const key in defaults) rec[key] = routerQuery[key] || defaults[key]
    return rec as T
  })()

  function rpl(upd: Partial<T>) {
    router.replace({ query: { ...val, ...upd } })
  }

  return [val, rpl] as const
}
