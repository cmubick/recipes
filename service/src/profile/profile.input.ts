import { InputType } from '@nestjs/graphql'
import { IsEmail, IsString, MinLength } from 'class-validator'

@InputType('ProfileInput')
export class ProfileInputDTO {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(1)
  fullName!: string

  @MinLength(8)
  password!: string
}
