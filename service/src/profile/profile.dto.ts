import {
  FilterableField,
  IDField,
  FilterableCursorConnection,
} from '@nestjs-query/query-graphql'
import { ID, ObjectType } from '@nestjs/graphql'
import { KitchenDto } from 'src/kitchen/kitchen.dto'

@ObjectType('Profile')
// @Authorize({
//   authorize: (context: UserContext) => ({ id: { eq: context.user.sub } }),
// })
@FilterableCursorConnection('kitchens', () => KitchenDto, {
  disableRemove: true,
  disableUpdate: true,
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
