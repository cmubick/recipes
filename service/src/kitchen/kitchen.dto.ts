import {
  FilterableCursorConnection,
  FilterableField,
} from '@nestjs-query/query-graphql'
import { ID, ObjectType } from '@nestjs/graphql'
import { ProfileDto } from 'src/profile/profile.dto'

@ObjectType('Kitchen')
// @Authorize({
//   authorize: (context: UserContext) => ({ id: { eq: context.user.sub } }),
// })
@FilterableCursorConnection('profiles', () => ProfileDto, {
  disableRemove: true,
  disableUpdate: true,
})
export class KitchenDto {
  @FilterableField(() => ID)
  id!: string

  @FilterableField()
  name!: string

  @FilterableField()
  created!: Date

  @FilterableField()
  updated!: Date
}
