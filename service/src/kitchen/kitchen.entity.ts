import { ProfileEntity } from 'src/profile/profile.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ObjectType,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'kitchen' })
export class KitchenEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text' })
  name!: string

  @ManyToMany(
    (): ObjectType<ProfileEntity> => ProfileEntity,
    (profile) => profile.kitchens,
  )
  profiles!: ProfileEntity[]

  @CreateDateColumn({ type: 'timestamptz' })
  created!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated!: Date
}
