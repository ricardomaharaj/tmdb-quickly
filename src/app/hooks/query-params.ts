import { useLocation } from 'preact-iso'

export function useQueryParams<T extends Record<string, string>>(defaults: T) {
  const location = useLocation()
  const query = location.query

  const queryParams = (() => {
    const tmp: Record<string, string> = {}
    for (const key in defaults) {
      tmp[key] = query[key] || defaults[key]
    }
    return tmp as T
  })()

  function setQueryParams(upd: Partial<T>) {
    const newParams = new URLSearchParams({
      ...queryParams,
      ...(upd as Record<string, string>),
    })

    location.route(`${location.path}?${newParams}`, true)
  }

  return [queryParams, setQueryParams] as const
}
