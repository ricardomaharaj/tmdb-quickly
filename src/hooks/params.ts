import { useRouter } from 'next/router'

export function useParams<T extends Record<string, string>>(defaults: T) {
  const router = useRouter()

  const params = router.query as Record<string, string>

  for (const key in defaults) {
    // @ts-ignore
    defaults[key] = params[key] ?? defaults[key]
  }

  function replace(upd: Partial<typeof defaults>) {
    router.replace({ query: { ...params, ...upd } })
  }

  return [defaults, replace] as const
}
