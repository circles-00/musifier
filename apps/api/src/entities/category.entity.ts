import { Column, Entity } from '@loopback/typeorm'
import { Base } from './base.entity'

@Entity()
export class Category extends Base {
  @Column()
  name: string

  @Column()
  description: string
}
