import * as argon2 from 'argon2'
import { KitchenEntity } from 'src/kitchen/kitchen.entity'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ObjectType,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text', unique: true })
  email!: string

  @Column({ type: 'text' })
  password!: string

  @Column({ type: 'text' })
  fullName!: string

  @ManyToMany(
    (): ObjectType<KitchenEntity> => KitchenEntity,
    (kitchen) => kitchen.profiles,
    { cascade: true, nullable: false },
  )
  @JoinTable()
  kitchens!: KitchenEntity[]

  @CreateDateColumn({ type: 'timestamptz' })
  created!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated!: Date

  @BeforeInsert()
  async encodePassword() {
    this.password = await argon2.hash(this.password)
  }
}
