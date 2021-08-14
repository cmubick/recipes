import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QueryFailedError } from 'typeorm'
import { ProfileModule } from './profile/profile.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'test',
      username: 'postgres',
      password: 'password',
      autoLoadEntities: true,
      synchronize: true,
      // dropSchema: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.graphql',
      debug: true,
      tracing: true,
      context: ({ req }) => {
        if (req && req.headers) return { headers: req.headers }
      },
      formatError: (err) => {
        if (err.originalError instanceof QueryFailedError) {
          return { message: err.originalError.driverError?.detail }
        }
        return err
      },
    }),
    ProfileModule,
  ],
})
export class AppModule {}
