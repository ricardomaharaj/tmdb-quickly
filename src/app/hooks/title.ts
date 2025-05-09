import { useEffect } from 'preact/hooks'
import { appName } from '~/app/util/consts'

export function useTitle(str?: string) {
  useEffect(() => {
    if (str) {
      document.title = `${str} | ${appName}`
    } else {
      document.title = `${appName}`
    }
  }, [str])
}
