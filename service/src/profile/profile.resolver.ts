import { ProfileInputDTO } from './profile.input'
import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ProfileDto } from './profile.dto'
import { ProfileService } from './profile.service'

@Resolver(() => ProfileDto)
export class ProfileResolver extends CRUDResolver(ProfileDto, {
  CreateDTOClass: ProfileInputDTO,
  UpdateDTOClass: ProfileInputDTO,
  create: { many: { disabled: true } },
  update: { many: { disabled: true } },
  delete: { disabled: true },
}) {
  constructor(readonly service: ProfileService) {
    super(service)
  }

  @Query(() => ProfileDto)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.service.login(email, password)
  }
}
