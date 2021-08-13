import { ProfileResolver } from './profile.resolver'
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { ProfileDto } from './profile.dto'
import { ProfileEntity } from './profile.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ProfileEntity])],
      dtos: [{ DTOClass: ProfileDto }],
    }),
  ],
  providers: [ProfileResolver],
})
export class ProfileModule {}
