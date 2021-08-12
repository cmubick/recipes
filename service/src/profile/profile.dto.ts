import { FilterableField, IDField } from '@nestjs-query/query-graphql'
import { ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Profile')
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
