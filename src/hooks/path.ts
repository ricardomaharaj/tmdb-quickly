import { useRouter } from 'next/router'

export function usePath() {
  const router = useRouter()
  return router.asPath.split('?').at(0)
}
