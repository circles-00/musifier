import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image

  @Column()
  tracks: number

  @Column({ nullable: true })
  primaryColor: string

  @ManyToMany(() => Track)
  @JoinColumn()
  tracksList: Track[]
}
