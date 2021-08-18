import {
  FilterableField,
  FilterableRelation,
  IDField,
} from '@nestjs-query/query-graphql'
import { Float, ID, ObjectType } from '@nestjs/graphql'
import { IngredientDto } from 'src/ingredient/ingredient.dto'
import { RecipeDto } from 'src/recipe/recipe.dto'

@ObjectType('IngredientItem')
@FilterableRelation('ingredient', () => IngredientDto)
@FilterableRelation('recipe', () => RecipeDto)
export class IngredientItemDto {
  @IDField(() => ID)
  id!: string

  @FilterableField(() => Float)
  quantity!: number

  @FilterableField()
  created!: Date

  @FilterableField()
  updated!: Date
}
