export function toDateStr(dateStr?: string) {
  if (!dateStr) return ''
  if (dateStr.includes('T')) {
    dateStr = dateStr.split('T').at(0)!
  }
  return new Date(dateStr.replaceAll('-', '/')).toDateString().substring(4)
}
