import { InputType } from '@nestjs/graphql'
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'

@InputType('RecipeInput')
export class RecipeInput {
  @IsString()
  name!: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @Max(12)
  @IsOptional()
  servings?: number

  @IsOptional()
  steps?: string[]
}
