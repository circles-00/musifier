import { ApiApplication } from '../../index'
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab'

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.API_PORT,
  })

  const app = new ApiApplication({
    rest: restConfig,
  })

  await app.boot()
  await app.start()

  const client = createRestAppClient(app)

  return { app, client }
}

export interface AppWithClient {
  app: ApiApplication
  client: Client
}
