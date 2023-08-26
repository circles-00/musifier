import { Column, Entity } from '@loopback/typeorm'
import { Base } from './base'

@Entity()
export class Artist extends Base {
  @Column()
  name: string

  @Column()
  externalId: string
}
