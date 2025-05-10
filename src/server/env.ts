// @ts-expect-error
const netlifyEnv = globalThis?.Netlify?.env

const TMDB_API_KEY =
  netlifyEnv?.get('TMDB_API_KEY') || process.env['TMDB_API_KEY']

if (!TMDB_API_KEY) throw Error('TMDB_API_KEY')

export const env = {
  TMDB_API_KEY: TMDB_API_KEY,
}
