export function rmVoiceTag(str?: string) {
  if (!str) return undefined
  return str.replace('(voice)', '')
}
