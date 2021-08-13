import { ObjectType } from '@nestjs/graphql'
import { ProfileEntity } from 'src/profile/profile.entity'
import * as jwt from 'jsonwebtoken'

@ObjectType()
export class AccessToken {
  access_token: string

  constructor(profile: ProfileEntity) {
    this.access_token = jwt.sign(
      { sub: profile.id, email: profile.email, roles: [] },
      'secret',
    )
  }
}
