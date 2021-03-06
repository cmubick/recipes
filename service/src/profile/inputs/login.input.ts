import { InputType, PickType } from '@nestjs/graphql'
import { ProfileInput } from './profile.input'

@InputType()
export class LoginInput extends PickType(ProfileInput, [
  'email',
  'password',
] as const) {}
