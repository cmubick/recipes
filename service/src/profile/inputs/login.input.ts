import { InputType, PickType } from '@nestjs/graphql'
import { ProfileInputDTO } from './profile.input'

@InputType()
export class LoginInput extends PickType(ProfileInputDTO, [
  'email',
  'password',
] as const) {}
