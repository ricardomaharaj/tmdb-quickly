export const env = {
  TMDB_API_KEY:
    // @ts-expect-error
    globalThis?.Netlify?.env?.get('TMDB_API_KEY') || process.env.TMDB_API_KEY,
}
