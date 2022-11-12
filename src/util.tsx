import { APP_NAME } from './consts'

export function toDateString(date?: string) {
    if (!date) return ''
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
        const minutes = runtime % 60
        const hours = (runtime - minutes) / 60
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

export function grabYear(date: string) {
    return date.substring(0, 4)
}

export function overviewTrimmer(overview?: string) {
    if (!overview) return
    const MaxLength = 100
    if (overview.length > MaxLength) {
        return overview.substring(0, MaxLength - 3).padEnd(MaxLength, '.')
    } else {
        return overview
    }
}

export function removeVoiceTag(str: string) {
    return str.replaceAll('(voice)', '')
}
