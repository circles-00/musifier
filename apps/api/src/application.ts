import { BootMixin } from '@loopback/boot'
import { ApplicationConfig, BindingScope } from '@loopback/core'
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer'
import { RepositoryMixin } from '@loopback/repository'
import { RestApplication } from '@loopback/rest'
import { ServiceMixin } from '@loopback/service-proxy'
import path from 'path'
import { MySequence } from './sequence'
import { TypeOrmMixin } from '@loopback/typeorm'
import { PostgresConnection } from './connections'
import { SpotifyService, SPOTIFY_SERVICE } from './domains/spotify'
import { SYNC_SERVICE } from './domains/sync/keys'
import { SyncService } from './domains/sync'
import { schedulingServiceBinding } from './domains/sync'
import { CronComponent } from '@loopback/cron'
import { warn } from 'console'

export { ApplicationConfig }

export class ApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(TypeOrmMixin(RestApplication))),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options)
    this.connection(PostgresConnection)

    this.setupBindings()

    this.sequence(MySequence)

    this.static('/', path.join(__dirname, '../public'))

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    })

    this.registerComponents()

    this.projectRoot = __dirname
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['domains/**/**/controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    }
  }

  registerComponents(): void {
    this.component(RestExplorerComponent)
    this.component(CronComponent)
  }

  setupBindings(): void {
    this.bind(SPOTIFY_SERVICE)
      .toClass(SpotifyService)
      .inScope(BindingScope.SINGLETON)
    this.bind(SYNC_SERVICE).toClass(SyncService).inScope(BindingScope.SINGLETON)
    this.add(schedulingServiceBinding)
  }
}
