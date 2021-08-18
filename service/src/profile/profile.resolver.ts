import { ProfileInputDTO } from './inputs/profile.input'
import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ProfileDto } from './profile.dto'
import { ProfileService } from './profile.service'
import { LoginInput } from './inputs/login.input'
import { AuthGuard } from 'src/guards/auth.guard'
import { AccessToken } from 'src/jwt/access-token.model'
import {
  Logger,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common'

@Resolver(() => ProfileDto)
export class ProfileResolver extends CRUDResolver(ProfileDto, {
  guards: [AuthGuard],
  CreateDTOClass: ProfileInputDTO,
  UpdateDTOClass: ProfileInputDTO,
  create: { many: { disabled: true } },
  update: { many: { disabled: true } },
  delete: { disabled: true },
}) {
  logger = new Logger(ProfileResolver.name)

  constructor(readonly service: ProfileService) {
    super(service)
  }

  @Mutation(() => AccessToken)
  async signUp(@Args('signUp') signUpInput: ProfileInputDTO) {
    const createdProfile = await this.service.signUp(signUpInput)
    if (!createdProfile)
      throw new PreconditionFailedException('Could not sign up new user!')
    return AccessToken.fromProfile(createdProfile)
  }

  @Mutation(() => AccessToken)
  async login(@Args('login') loginInput: LoginInput) {
    const profile = await this.service.login(loginInput)
    if (!profile) throw new UnauthorizedException('Login failed')
    return AccessToken.fromProfile(profile)
  }
}
