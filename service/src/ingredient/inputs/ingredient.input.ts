import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsString } from 'class-validator'
import { IngredientType } from '../ingredient.entity'

@InputType('IngredientInput')
export class IngredientInput {
  @IsString()
  name!: string

  @IsEnum(IngredientType)
  @Field(() => IngredientType)
  unit!: IngredientType
}
