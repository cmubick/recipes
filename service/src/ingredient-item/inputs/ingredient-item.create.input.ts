import { Field, Float, InputType } from '@nestjs/graphql'
import { IsEnum, IsString, Min } from 'class-validator'
import { IngredientType } from 'src/ingredient/ingredient.entity'

@InputType('IngredientItemCreateInput')
export class IngredientItemCreateInput {
  @IsString()
  name!: string

  @IsEnum(IngredientType)
  @Field(() => IngredientType)
  unit!: IngredientType

  @Min(0)
  @Field(() => Float)
  quantity!: number
}
