import { ObjectType } from '@nestjs/graphql'
import { ProfileEntity } from 'src/profile/profile.entity'
import * as jwt from 'jsonwebtoken'

@ObjectType()
export class AccessToken {
  access_token: string

  public static fromProfile(profile: ProfileEntity): AccessToken {
    const accessToken = new AccessToken()
    accessToken.access_token = jwt.sign(
      { sub: profile.id, email: profile.email, roles: [] },
      'secret',
    )
    return accessToken
  }
}
