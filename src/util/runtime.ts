export function genRuntimeStr(runtime?: number) {
  if (!runtime) return ''

  if (runtime < 60) return `${runtime}m`
  if (runtime === 60) return '1h'

  const mins = runtime % 60
  const hours = (runtime - mins) / 60

  return `${hours}h${mins}m`
}
