import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from '@loopback/typeorm'

@Entity()
export class UserCredentials {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
  @Column()
  password: string

  @Column({ nullable: true })
  userId: string

  public getId(): string {
    return this.id
  }

  public getIdObject(): object {
    return { id: this.id }
  }

  public toJSON(): object {
    return this
  }

  public toObject(): object {
    return this
  }
}
