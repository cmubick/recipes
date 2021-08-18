import { IngredientEntity } from 'src/ingredient/ingredient.entity'
import { RecipeEntity } from 'src/recipe/recipe.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectType,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'ingredient_item' })
export class IngredientItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'float' })
  quantity!: number

  @OneToOne(
    (): ObjectType<IngredientEntity> => IngredientEntity,
    (ingredient) => ingredient.ingredientItem,
    { cascade: true },
  )
  @JoinColumn()
  ingredient!: IngredientEntity

  @ManyToOne(
    (): ObjectType<RecipeEntity> => RecipeEntity,
    (recipe) => recipe.ingredientItems,
    { cascade: true },
  )
  recipe!: RecipeEntity

  @CreateDateColumn({ type: 'timestamptz' })
  created!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated!: Date
}
