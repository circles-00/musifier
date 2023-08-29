import { Column, Entity, JoinTable, ManyToMany } from '@loopback/typeorm'
import { Base } from './base'
import { Playlist } from './playlist.entity'

@Entity()
export class Category extends Base {
  @Column()
  name: string

  @Column()
  externalId: string

  @Column({ nullable: true })
  icon: string

  @ManyToMany(() => Playlist, { cascade: true })
  @JoinTable()
  playlists: Playlist[]
}
