import { Column, Entity } from '@loopback/typeorm'
import { Base } from './base'

@Entity()
export class Image extends Base {
  @Column()
  width: number

  @Column()
  height: number

  @Column()
  url: string
}
