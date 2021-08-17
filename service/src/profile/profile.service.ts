import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileEntity } from './profile.entity'
import { ProfileInputDTO } from './inputs/profile.input'
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

  async signUp(signUpInput: ProfileInputDTO): Promise<ProfileEntity> {
    try {
      const profile = this.repo.create(signUpInput)
      const createdProfile = await this.repo.save(profile)
      return createdProfile
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }

  async login(loginInput: LoginInput): Promise<ProfileEntity> {
    const profile = await this.repo.findOne({ email: loginInput.email })
    if (!profile) return null

    const verified = await argon2.verify(profile.password, loginInput.password)
    if (!verified) return null

    return profile
  }
}
