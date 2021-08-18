import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IngredientItemEntity } from './ingredient-item.entity'

@QueryService(IngredientItemEntity)
export class IngredientItemService extends TypeOrmQueryService<IngredientItemEntity> {
  logger = new Logger(IngredientItemService.name)

  constructor(
    @InjectRepository(IngredientItemEntity)
    repo: Repository<IngredientItemEntity>,
  ) {
    super(repo)
  }
}
