interface Opts extends RequestInit {
  params?: Record<string, string>
}

export class Fetcher {
  baseUrl: string
  opts?: Opts
  constructor({ baseUrl, opts }: { baseUrl: string; opts?: Opts }) {
    this.baseUrl = baseUrl
    this.opts = opts
  }
  async get<T = any>(path: string, opts?: Opts) {
    let url = `${this.baseUrl}${path}`
    const params = { ...this.opts?.params, ...opts?.params }
    Object.keys(params).forEach((key, i) => {
      url += `${i === 0 ? '?' : '&'}${key}=${params[key]}`
    })
    const x = await fetch(url, { cache: 'force-cache', ...this.opts, ...opts })
    const y = await x.json()
    return y as T
  }
}
