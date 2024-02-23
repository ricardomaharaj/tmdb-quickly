import { z } from 'zod'

export const env = z
  .object({
    API_BASE_URL: z.string().default('https://api.themoviedb.org/3'),
    TMDB_API_KEY: z.string(),
  })
  .parse(process.env)
