import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { RecipeInput } from './inputs/recipe.input'
import { RecipeDto } from './recipe.dto'
import { RecipeEntity } from './recipe.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([RecipeEntity])],
      resolvers: [
        {
          DTOClass: RecipeDto,
          EntityClass: RecipeEntity,
          CreateDTOClass: RecipeInput,
          UpdateDTOClass: RecipeInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { disabled: true },
        },
      ],
    }),
  ],
})
export class RecipeModule {}
