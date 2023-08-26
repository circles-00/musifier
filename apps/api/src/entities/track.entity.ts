import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from '@loopback/typeorm'
import { Album } from './album.entity'
import { Artist } from './artist.entity'
import { Base } from './base'

@Entity()
export class Track extends Base {
  @Column()
  externalId: string

  @Column()
  name: string

  @Column()
  duration: number

  @Column({ nullable: true })
  primaryColor: string

  @ManyToOne(() => Album)
  album: Album

  @ManyToMany(() => Artist)
  @JoinColumn()
  artists: Artist[]
}
