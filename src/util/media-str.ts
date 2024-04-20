import { numGt0 } from '~/util/validation'
import { rmVoiceTag } from '~/util/voice'

export function genMediaStr({
  pri,
  count,
  rmVoice,
}: {
  pri?: string
  count?: number
  rmVoice?: boolean
}) {
  let str = pri || 'Unknown'
  if (numGt0(count)) str += ` (${count})`
  return rmVoice ? rmVoiceTag(str) : str
}
