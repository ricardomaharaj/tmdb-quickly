export function rmVoiceTag(str?: string) {
  if (!str) return undefined

  if (str.includes('(voice)')) {
    str = str.replaceAll('(voice)', '')
  }

  return str
}
