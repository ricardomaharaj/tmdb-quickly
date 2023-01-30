import { appName, maxOverviewLength } from './consts'

export function toDateString(date?: string) {
  if (!date) return ''
  if (date.length > 10) {
    date = date.substring(0, 10)
  }
  return new Date(date.replaceAll('-', '/')).toDateString().substring(4)
}

export function runtimeCalc(runtime: number) {
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

export function setTitle(title?: string) {
  if (title) {
    document.title = `${title} | ${appName}`
  } else {
    document.title = appName
  }
}

export function grabYear(date: string) {
  return date.substring(0, 4)
}

export function overviewTrimmer(overview?: string) {
  if (!overview) return
  if (overview.length > maxOverviewLength) {
    return overview
      .substring(0, maxOverviewLength - 3)
      .padEnd(maxOverviewLength, '.')
  } else {
    return overview
  }
}

export function removeVoiceTag(str: string) {
  return str.replaceAll('(voice)', '')
}
