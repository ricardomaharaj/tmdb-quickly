import { useEffect } from 'react'
import { z } from 'zod'

import { appName } from '~/consts'

const maxLen = 90
export function trimmer(str: string) {
  if (str.length > maxLen) {
    return str.substring(0, maxLen - 3).padEnd(maxLen, '.')
  } else {
    return str
  }
}

export function useTitle(title?: string | null) {
  useEffect(() => {
    document.title = title ? `${title} | ${appName}` : appName
  }, [title])
}

export function zNumGt1(num?: number) {
  return z.number().gt(1).safeParse(num).success
}
