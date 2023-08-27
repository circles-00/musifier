import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from '@loopback/typeorm'
import { Base } from './base'
import { Image } from './image.entity'
import { Playlist } from './playlist.entity'

@Entity()
export class Category extends Base {
  @Column()
  name: string

  @Column()
  externalId: string

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  icon: Image

  @ManyToMany(() => Playlist, { cascade: true })
  @JoinTable()
  playlists: Playlist[]
}
