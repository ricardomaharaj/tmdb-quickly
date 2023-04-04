interface FetcherOptions extends RequestInit {
  params?: Record<string, string | number | undefined>
}
export class Fetcher {
  url: string
  opts?: FetcherOptions
  constructor({ url, opts }: { url: string; opts?: FetcherOptions }) {
    this.url = url
    this.opts = opts
  }
  async get(path: string, opts?: FetcherOptions) {
    let url = `${this.url}${path}`
    const params = { ...this.opts?.params, ...opts?.params }
    Object.keys(params).forEach((key, i) => {
      url += `${i === 0 ? '?' : '&'}${key}=${params[key]}`
    })
    const x = await fetch(url, { cache: 'force-cache', ...this.opts, ...opts })
    const y = await x.json()
    return y
  }
}
