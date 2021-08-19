import { InputType, PickType } from '@nestjs/graphql'
import { ProfileInput } from './profile.input'

@InputType()
export class ProfileUpdateInput extends PickType(ProfileInput, [
  'fullName',
] as const) {}
