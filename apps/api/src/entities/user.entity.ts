import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from '@loopback/typeorm'
import { UserCredentials } from './user-credentials.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ nullable: true })
  username?: string

  @Column()
  fullName: string

  @Column()
  email: string

  @Column({ nullable: true })
  emailVerified?: boolean

  @Column({ nullable: true })
  verificationToken?: string

  @Column({ nullable: true })
  realm?: string

  @OneToOne(() => UserCredentials, { cascade: true })
  @JoinColumn()
  userCredentials: UserCredentials

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
