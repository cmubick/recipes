import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileEntity } from './profile.entity'
import * as argon2 from 'argon2'
import { UnauthorizedException } from '@nestjs/common'

@QueryService(ProfileEntity)
export class ProfileService extends TypeOrmQueryService<ProfileEntity> {
  constructor(
    @InjectRepository(ProfileEntity) repo: Repository<ProfileEntity>,
  ) {
    super(repo)
  }

  async login(email: string, password: string): Promise<ProfileEntity> {
    const profile = await this.repo.findOne({ email })
    if (!profile) throw new UnauthorizedException('invalid credentials')

    const verified = await argon2.verify(profile.password, password)
    if (!verified) throw new UnauthorizedException('invalid credentials')

    return profile
  }
}
