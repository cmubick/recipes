import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { IngredientItemDto } from './ingredient-item.dto'
import { IngredientItemEntity } from './ingredient-item.entity'
import { IngredientItemResolver } from './ingredient-item.resolver'
import { IngredientItemService } from './ingredient-item.service'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([IngredientItemEntity])],
      dtos: [{ DTOClass: IngredientItemDto }],
    }),
  ],
  providers: [IngredientItemService, IngredientItemResolver],
  exports: [IngredientItemService],
})
export class IngredientItemModule {}
