export function paramParse(params: URLSearchParams) {
  const rec: Record<string, string | undefined> = {}

  for (const [k, v] of params.entries()) rec[k] = v

  return rec
}
