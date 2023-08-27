import { Column, Entity } from '@loopback/typeorm'
import { Base } from './base'

@Entity()
export class Image extends Base {
  @Column({ nullable: true })
  width: number

  @Column({ nullable: true })
  height: number

  @Column()
  url: string
}
