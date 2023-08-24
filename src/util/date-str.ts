export function dateStr(str?: string) {
  if (!str) return ''

  if (str.includes('T')) {
    str = str.split('T')[0]
  }

  const date = new Date(str.replaceAll('-', '/'))

  return date.toDateString().substring(4)
}
