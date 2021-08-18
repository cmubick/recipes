import { registerEnumType } from '@nestjs/graphql'
import { IngredientItemEntity } from 'src/ingredient-item/ingredient-item.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectType,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum IngredientType {
  Teaspoon = 'teaspoon',
  Tablespoon = 'tablespoon',
  Cup = 'cup',
  Ounce = 'ounce',
}

registerEnumType(IngredientType, { name: 'IngredientType' })

@Entity({ name: 'ingredients' })
export class IngredientEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text' })
  name!: string

  @Column({ type: 'enum', enum: IngredientType, default: IngredientType.Cup })
  unit!: IngredientType

  @OneToOne(
    (): ObjectType<IngredientItemEntity> => IngredientItemEntity,
    (ingredientItem) => ingredientItem.ingredient,
  )
  ingredientItem!: IngredientItemEntity

  @CreateDateColumn({ type: 'timestamptz' })
  created!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated!: Date
}
