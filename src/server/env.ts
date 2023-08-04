import { z } from 'zod'

export const env = z
  .object({
    NODE_ENV: z.enum(['development', 'production']),
    TMDB: z.string(),
  })
  .parse(process.env)
