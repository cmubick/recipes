import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { KitchenEntity } from './kitchen.entity'
import { KitchenDto } from './kitchen.dto'
import { AuthGuard } from 'src/guards/auth.guard'
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
          guards: [AuthGuard],
        },
      ],
    }),
  ],
})
export class KitchenModule {}
