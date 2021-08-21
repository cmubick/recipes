import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { IngredientDto } from './ingredient.dto'
import { IngredientEntity } from './ingredient.entity'
import { IngredientInput } from './inputs/ingredient.input'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([IngredientEntity])],
      resolvers: [
        {
          DTOClass: IngredientDto,
          EntityClass: IngredientEntity,
          CreateDTOClass: IngredientInput,
          UpdateDTOClass: IngredientInput,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
        },
      ],
    }),
  ],
})
export class IngredientModule {}
