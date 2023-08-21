import { ParsedUrlQuery } from 'querystring'

export function getSearchParams(query: ParsedUrlQuery) {
  return new URLSearchParams(query as Record<string, string>)
}
