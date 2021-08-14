import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileEntity } from './profile.entity'
import * as argon2 from 'argon2'
import { LoginInput } from './inputs/login.input'
import { Logger } from '@nestjs/common'

@QueryService(ProfileEntity)
export class ProfileService extends TypeOrmQueryService<ProfileEntity> {
  logger = new Logger(ProfileService.name)

  constructor(
    @InjectRepository(ProfileEntity) repo: Repository<ProfileEntity>,
  ) {
    super(repo)
  }

  async login(loginInput: LoginInput): Promise<ProfileEntity> {
    const profile = await this.repo.findOne({ email: loginInput.email })
    if (!profile) return null

    const verified = await argon2.verify(profile.password, loginInput.password)
    if (!verified) return null

    return profile
  }
}
