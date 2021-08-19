import {
  FilterableField,
  FilterableRelation,
  IDField,
} from '@nestjs-query/query-graphql'
import { ID, ObjectType } from '@nestjs/graphql'
import { IngredientItemDto } from 'src/ingredient-item/ingredient-item.dto'
import { IngredientType } from './ingredient.entity'

@ObjectType('Ingredient')
@FilterableRelation('ingredientItem', () => IngredientItemDto, {
  disableUpdate: true,
  disableRemove: true,
})
export class IngredientDto {
  @IDField(() => ID)
  id!: string

  @FilterableField()
  name!: string

  @FilterableField()
  unit!: IngredientType

  @FilterableField()
  created!: Date

  @FilterableField()
  updated!: Date
}
