import { Column, Entity } from '@loopback/typeorm'
import { Base } from './base'

@Entity()
export class Album extends Base {
  @Column()
  externalId: string

  @Column({ nullable: true })
  image: string

  @Column()
  name: string

  @Column()
  releaseDate: string

  @Column()
  tracks: number
}
