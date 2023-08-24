type Params = Record<string, string | number>

export class Fetcher {
  private baseUrl: string
  private params?: Params

  constructor(args: { baseUrl: string; params?: Params }) {
    this.baseUrl = args.baseUrl
    this.params = args.params
  }

  async get<T = unknown>(path: string, params?: Params) {
    let url = this.baseUrl + path
    Object.entries({ ...this.params, ...params }).forEach(([key, val], i) => {
      url += `${i === 0 ? '?' : '&'}${key}=${val}`
    })
    const res = await fetch(url, { cache: 'force-cache' })
    const data = await res.json()
    return data as T
  }
}
