import { cleanEnv, str, num } from 'envalid'

export const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  HOST: str({ default: 'localhost' }),
  DATABASE_HOST: str({ default: 'localhost' }),
  DATABASE_PORT: num({ default: 5432 }),
  DATABASE_USERNAME: str({ default: 'postgres' }),
  DATABASE_PASSWORD: str({ default: 'postgres' }),
  DATABASE_NAME: str({ default: 'postgres' }),
})
