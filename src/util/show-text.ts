import { numGt0 } from '~/util/validation'
import { rmVoiceTag } from '~/util/voice'

export function genShowText({
  pri,
  count,
  rmVoice,
}: {
  pri?: string
  count?: number
  rmVoice?: boolean
}) {
  let str = pri ? pri : 'Unknown'
  if (numGt0(count)) str += ` (${count})`
  return rmVoice ? rmVoiceTag(str) : str
}
