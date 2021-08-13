import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'src/jwt/jwt.payload.model'

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name)

  canActivate(context: ExecutionContext): boolean {
    try {
      const gqlContext = GqlExecutionContext.create(context)
      const ctx = gqlContext.getContext()
      const authHeader = ctx.headers.authorization as string
      if (!authHeader) {
        return false
      }

      const parts = authHeader.split('Bearer ')
      if (parts.length !== 2) return false

      const user: JwtPayload = jwt.verify(parts[1], 'secret') as JwtPayload
      ctx.user = user
      return true
    } catch (e) {
      this.logger.error('failed to validate token', e)
      return false
    }
  }
}
