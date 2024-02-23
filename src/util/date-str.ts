export function toDateStr(date?: string) {
  if (!date) return ''
  return new Date(date).toDateString().substring(4)
}
