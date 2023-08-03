import { useRouter } from 'next/router'
import { z } from 'zod'

export function useRouterQuery<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
) {
  const router = useRouter()
  const queries = schema.parse(router.query)

  function replace(upd: Partial<z.infer<typeof schema>>) {
    router.replace({ query: { ...queries, ...upd } })
  }

  return { val: queries, replace }
}
