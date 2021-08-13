import { ProfileInputDTO } from './profile.input'
import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ProfileDto } from './profile.dto'
import { InjectQueryService, QueryService } from '@nestjs-query/core'
import { ProfileEntity } from './profile.entity'
import * as argon2 from 'argon2'
import { UnauthorizedException } from '@nestjs/common'

@Resolver(() => ProfileDto)
export class ProfileResolver extends CRUDResolver(ProfileDto, {
  CreateDTOClass: ProfileInputDTO,
  UpdateDTOClass: ProfileInputDTO,
  create: { many: { disabled: true } },
  update: { many: { disabled: true } },
  delete: { disabled: true },
}) {
  constructor(
    @InjectQueryService(ProfileEntity)
    readonly service: QueryService<ProfileEntity>,
  ) {
    super(service)
  }

  @Query(() => ProfileDto)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    try {
      const users = await this.service.query({
        filter: { email: { eq: email } },
      })
      const match = await argon2.verify(users[0].password, password)
      if (!match) throw new UnauthorizedException()
      return users[0]
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
