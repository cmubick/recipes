import { CRUDResolver } from '@nestjs-query/query-graphql'
import { PreconditionFailedException } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { IngredientItemDto } from './ingredient-item.dto'
import { IngredientItemService } from './ingredient-item.service'
import { IngredientItemCreateInput } from './inputs/ingredient-item.create.input'
import { IngredientItemUpdateInput } from './inputs/ingredient-item.update.input'

@Resolver(() => IngredientItemDto)
export class IngredientItemResolver extends CRUDResolver(IngredientItemDto, {
  UpdateDTOClass: IngredientItemUpdateInput,
  create: { disabled: true },
  update: { many: { disabled: true } },
  delete: { disabled: true },
}) {
  constructor(readonly service: IngredientItemService) {
    super(service)
  }

  @Mutation(() => IngredientItemDto)
  async createIngredientItem(
    @Args('input') input: IngredientItemCreateInput,
  ): Promise<IngredientItemDto> {
    const ingredientItem = await this.service.createOne({
      quantity: input.quantity,
      ingredient: { name: input.name, unit: input.unit },
    })
    if (!ingredientItem)
      throw new PreconditionFailedException('Failed to create ingredient')
    return ingredientItem
  }
}
