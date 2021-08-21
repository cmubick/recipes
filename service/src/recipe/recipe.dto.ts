import {
  FilterableCursorConnection,
  FilterableField,
  IDField,
} from '@nestjs-query/query-graphql'
import { ID, ObjectType } from '@nestjs/graphql'
import { IngredientItemDto } from 'src/ingredient-item/ingredient-item.dto'

@ObjectType('Recipe')
@FilterableCursorConnection('ingredientItems', () => IngredientItemDto, {
  disableRemove: true,
  disableUpdate: true,
})
export class RecipeDto {
  @IDField(() => ID)
  id!: string

  @FilterableField()
  name!: string

  description?: string

  @FilterableField()
  servings?: number

  steps?: string[]

  @FilterableField()
  created: Date

  @FilterableField()
  updated: Date
}
