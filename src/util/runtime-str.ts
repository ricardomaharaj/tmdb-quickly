export function genRuntimeStr(runtime: number) {
  if (runtime === 60) {
    return '1h'
  }

  if (runtime > 60) {
    const minutes = runtime % 60
    const hours = (runtime - minutes) / 60
    return `${hours}h${minutes}m`
  }

  return `${runtime}m`
}
