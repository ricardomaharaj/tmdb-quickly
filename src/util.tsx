import React from 'react'

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

type SyncState = {
    key: string
    initVal?: string
}
/* 
    string states that are synced with localstorage
    and therefore persisted
*/
export function useSyncState({
    key,
    initVal
}: SyncState): [string, React.Dispatch<React.SetStateAction<string>>] {
    let [state, setState] = React.useState<string>(
        localStorage.getItem(key) || initVal || ''
    )
    React.useEffect(() => {
        localStorage.setItem(key, state)
    }, [state])
    return [state, setState]
}
