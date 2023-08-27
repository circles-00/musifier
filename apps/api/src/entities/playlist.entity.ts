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
import { Track } from './track.entity'

@Entity()
export class Playlist extends Base {
  @Column()
  name: string

  @Column()
  externalId: string

  @Column()
  description: string

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  image: Image

  @Column()
  tracks: number

  @Column({ nullable: true })
  primaryColor: string

  @ManyToMany(() => Track, { cascade: true })
  @JoinTable()
  tracksList: Track[]
}
