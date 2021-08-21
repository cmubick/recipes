import { Field, Float, InputType } from '@nestjs/graphql'
import { IngredientType } from 'src/ingredient/ingredient.entity'

@InputType('IngredientItemUpdateInput')
export class IngredientItemUpdateInput {
  name?: string

  @Field(() => IngredientType)
  unit?: IngredientType

  @Field(() => Float)
  quantity?: number
}
