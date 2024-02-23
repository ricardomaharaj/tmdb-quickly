const appName = 'TMDB Quickly'

export function setTitle(str?: string) {
  if (!str) {
    document.title = `${appName}`
  } else {
    document.title = `${str} | ${appName}`
  }
}
