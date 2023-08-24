export function removeVoiceTag(str?: string) {
  if (!str) return ''

  if (str.includes('(voice)')) {
    return str.replaceAll(' (voice)', '')
  }

  return str
}
