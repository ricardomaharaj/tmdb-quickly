export const env = {
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.themoviedb.org/3',
  TMDB_API_KEY: process.env.TMDB_API_KEY!,
  PORT: Number(process.env.PORT || '4000'),
}
