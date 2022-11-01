import { APP_NAME } from './consts'

export function toDateString(date: string) {
    if (date.length > 10) {
        date = date.substring(0, 10)
    }
    return new Date(date.replaceAll('-', '/')!).toDateString().substring(4)
}

export function runtimeCalc(runtime: number) {
    if (runtime === 60) {
        return '1h'
    }
    if (runtime > 60) {
        let minutes = runtime % 60
        let hours = (runtime - minutes) / 60
        return `${hours}h${minutes}m`
    }
    return `${runtime}m`
}

export function setTitle(title?: string) {
    if (title) {
        document.title = `${title} | ${APP_NAME}`
    } else {
        document.title = APP_NAME
    }
}
