import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { KitchenEntity } from './kitchen.entity'
import { KitchenDto } from './kitchen.dto'
import { KitchenInput } from './inputs/kitchen.input'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([KitchenEntity])],
      resolvers: [
        {
          DTOClass: KitchenDto,
          EntityClass: KitchenEntity,
          UpdateDTOClass: KitchenInput,
          update: { many: { disabled: true } },
          create: { disabled: true },
          delete: { disabled: true },
        },
      ],
    }),
  ],
})
export class KitchenModule {}
