import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class JwtPayload {
  public sub: string
  public email: string
  public roles: string[]
}

export type UserContext = {
  user: JwtPayload
}
