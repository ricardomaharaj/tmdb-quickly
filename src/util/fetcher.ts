type Params = Record<string, string | number>

export class Fetcher {
  baseUrl = ''
  params?: Params
  constructor(baseUrl: string, params?: Params) {
    this.baseUrl = baseUrl
    this.params = params
  }
  async get<T>(path: string, params?: Params) {
    let url = `${this.baseUrl}${path}`
    const allParams = { ...this.params, ...params }
    if (allParams) {
      Object.keys(allParams).forEach((key, i) => {
        url += `${i === 0 ? '?' : '&'}${key}=${allParams[key]}`
      })
    }
    const x = await fetch(url, { cache: 'force-cache' }).then((res) =>
      res.json()
    )
    return x as T
  }
}
