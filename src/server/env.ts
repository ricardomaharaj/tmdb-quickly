import { z } from 'zod'

export const env = z
  .object({
    NODE_ENV: z.enum(['production', 'development']),
    TMDB: z.string(),
  })
  .parse(process.env)
