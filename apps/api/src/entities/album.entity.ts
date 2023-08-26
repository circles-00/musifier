import { Column, Entity, JoinColumn, OneToOne } from '@loopback/typeorm'
import { Base } from './base'
import { Image } from './image.entity'

@Entity()
export class Album extends Base {
  @Column()
  externalId: string

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image

  @Column()
  name: string

  @Column()
  releaseDate: string

  @Column()
  tracks: number
}
