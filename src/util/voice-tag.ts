export function removeVoiceTag(str?: string) {
  return str?.replaceAll(' (voice)', '')
}
