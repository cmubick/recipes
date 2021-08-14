import {
  Authorize,
  FilterableField,
  IDField,
} from '@nestjs-query/query-graphql'
import { ID, ObjectType } from '@nestjs/graphql'
import { UserContext } from 'src/jwt/jwt.payload.model'

@ObjectType('Profile')
@Authorize({
  authorize: (context: UserContext) => ({ id: { eq: context.user.sub } }),
})
export class ProfileDto {
  @IDField(() => ID)
  id!: string

  @FilterableField()
  email!: string

  @FilterableField()
  fullName!: string

  @FilterableField()
  created!: Date

  @FilterableField()
  updated!: Date
}
