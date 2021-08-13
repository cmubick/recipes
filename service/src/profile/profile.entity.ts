import * as argon2 from 'argon2'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text', unique: true })
  email!: string

  @Column({ type: 'text' })
  password!: string

  @Column({ type: 'text' })
  fullName!: string

  @CreateDateColumn({ type: 'timestamptz' })
  created: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated: Date

  @BeforeInsert()
  async encodePassword() {
    this.password = await argon2.hash(this.password)
  }
}
