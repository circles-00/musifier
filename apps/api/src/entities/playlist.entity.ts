import { Column, Entity, JoinTable, ManyToMany } from '@loopback/typeorm'
import { Base } from './base'
import { Track } from './track.entity'

@Entity()
export class Playlist extends Base {
  @Column()
  name: string

  @Column()
  externalId: string

  @Column()
  description: string

  @Column({ nullable: true })
  image: string

  @Column()
  tracks: number

  @Column({ nullable: true })
  primaryColor: string

  @ManyToMany(() => Track, { cascade: true })
  @JoinTable()
  tracksList: Track[]
}
