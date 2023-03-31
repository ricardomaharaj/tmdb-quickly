type Params = Record<string, string>

export class Fetcher {
  baseUrl = ""
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
        if (i === 0) {
          url += `?`
        } else {
          url += `&`
        }
        url += `${key}=${allParams[key]}`
      })
    }
    const x = await fetch(url).then((x) => x.json())
    return x as T
  }
}
