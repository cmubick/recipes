import { Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Global()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get dbConfig(): DatabaseConfig {
    return this.configService.get<DatabaseConfig>('db')
  }

  get debug(): boolean {
    return this.configService.get<string>('environment') !== 'prd'
  }

  get graphqlConfig(): GraphqlConfig {
    return this.configService.get<GraphqlConfig>('gql')
  }
}

interface DatabaseConfig {
  host: string
  port: number
  username: string
  database: string
}

interface GraphqlConfig {
  schema: string
}
