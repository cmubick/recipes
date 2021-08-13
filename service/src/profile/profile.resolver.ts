import { ProfileInputDTO } from './inputs/profile.input'
import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ProfileDto } from './profile.dto'
import { ProfileService } from './profile.service'
import { LoginInput } from './inputs/login.input'
import { RolesGuard } from 'src/guards/roles.guard'
import { AccessToken } from 'src/jwt/access-token.model'

@Resolver(() => ProfileDto)
export class ProfileResolver extends CRUDResolver(ProfileDto, {
  guards: [RolesGuard],
  CreateDTOClass: ProfileInputDTO,
  UpdateDTOClass: ProfileInputDTO,
  create: { many: { disabled: true } },
  update: { many: { disabled: true } },
  delete: { disabled: true },
}) {
  constructor(readonly service: ProfileService) {
    super(service)
  }

  @Mutation(() => AccessToken)
  async login(@Args('login') loginInput: LoginInput) {
    const profile = await this.service.login(loginInput)
    return new AccessToken(profile)
  }
}
