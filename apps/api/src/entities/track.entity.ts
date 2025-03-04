import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from '@loopback/typeorm'
import { Album } from './album.entity'
import { Artist } from './artist.entity'
import { Base } from './base'

@Entity()
export class Track extends Base {
  @Column({ nullable: true })
  externalId: string

  @Column()
  name: string

  @Column()
  duration: number

  @Column({ nullable: true })
  primaryColor: string

  @Column({ nullable: true })
  cacheKey: string

  @Column({ nullable: true })
  image: string

  @ManyToOne(() => Album, { cascade: true })
  @JoinColumn()
  album: Album

  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable()
  artists: Artist[]
}
