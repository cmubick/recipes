import { ProfileResolver } from './profile.resolver'
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { ProfileDto } from './profile.dto'
import { ProfileEntity } from './profile.entity'
import { ProfileService } from './profile.service'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ProfileEntity])],
      dtos: [{ DTOClass: ProfileDto }],
    }),
  ],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
