import { IngredientItemEntity } from 'src/ingredient-item/ingredient-item.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectType,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'recipes' })
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text' })
  name!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ nullable: true })
  servings?: number

  @Column({ type: 'text', array: true, nullable: true })
  steps?: string[]

  @OneToMany(
    (): ObjectType<IngredientItemEntity> => IngredientItemEntity,
    (ingredient) => ingredient.recipe,
  )
  ingredientItems!: IngredientItemEntity[]

  @CreateDateColumn({ type: 'timestamptz' })
  created: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated: Date
}
