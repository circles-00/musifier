import { z } from 'zod'

const zodString = z.string().min(1)

const zodNumber = z
  .string()
  .transform((value) => Number.parseInt(value))
  .refine((value) => !Number.isNaN(value))

const zodBoolean = z
  .string()
  .transform((value) => JSON.parse(value))
  .refine((value) => typeof value === 'boolean')

const envSchema = z.object({
  API_PORT: zodNumber.default('5000'),
  HOST: zodString.default('localhost'),
  DATABASE_HOST: zodString.default('localhost'),
  DATABASE_PORT: zodNumber.default('5432'),
  DATABASE_USERNAME: zodString.default('postgres'),
  DATABASE_PASSWORD: zodString.default('postgres'),
  DATABASE_NAME: zodString.default('postgres'),
  SPOTIFY_AUTH_BASE_URL: z
    .string()
    .default('https://accounts.spotify.com/api/token'),
  SPOTIFY_CLIENT_ID: zodString.default('your-client-id'),
  SPOTIFY_CLIENT_SECRET: zodString.default('your-client-secret'),
  SYNC_CRON_TIME: zodString.default('0 5 * * *'),
  DISABLE_SYNC: zodBoolean.default('false'),
  CACHE_PATH: zodString,
})

export const env = envSchema.parse(process.env)
