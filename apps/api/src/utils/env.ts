import { cleanEnv, str, num } from 'envalid'

export const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  HOST: str({ default: 'localhost' }),
  DATABASE_HOST: str({ default: 'localhost' }),
  DATABASE_PORT: num({ default: 5432 }),
  DATABASE_USERNAME: str({ default: 'postgres' }),
  DATABASE_PASSWORD: str({ default: 'postgres' }),
  DATABASE_NAME: str({ default: 'postgres' }),
  SPOTIFY_AUTH_BASE_URL: str({
    default: 'https://accounts.spotify.com/api/token',
  }),
  SPOTIFY_CLIENT_ID: str({ default: 'your-client-id' }),
  SPOTIFY_CLIENT_SECRET: str({ default: 'your-client-secret' }),
  SYNC_CRON_TIME: str({ default: '0 5 * * *' }),
})
