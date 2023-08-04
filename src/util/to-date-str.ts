export function toDateStr(dateString?: string) {
  if (!dateString) return ''
  if (dateString.includes('T')) {
    dateString = dateString.split('T').at(0)!
  }
  return new Date(dateString.replaceAll('-', '/')).toDateString().substring(4)
}
