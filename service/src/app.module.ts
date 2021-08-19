import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QueryFailedError } from 'typeorm'
import { IngredientItemModule } from './ingredient-item/ingredient-item.module'
import { IngredientModule } from './ingredient/ingredient.module'
import { ProfileModule } from './profile/profile.module'
import { RecipeModule } from './recipe/recipe.module'
import { KitchenModule } from './kitchen/kitchen.module'
import { ConfigModule } from '@nestjs/config'
import { ConfigurationModule } from './config/config.module'
import { ConfigurationService } from './config/config.service'
import configuration from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => {
        const { host, port, database, username } = configService.dbConfig
        return {
          type: 'postgres',
          host,
          port,
          database,
          username,
          password: 'password',
          autoLoadEntities: true,
          migrationsRun: true,
          synchronize: false,
          logging: configService.debug,
          // dropSchema: true,
        }
      },
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => {
        const { schema } = configService.graphqlConfig
        return {
          playground: configService.debug,
          autoSchemaFile: schema,
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          debug: configService.debug,
          tracing: configService.debug,
          context: ({ req }) => {
            if (req && req.headers) return { headers: req.headers }
          },
          formatError: (err) => {
            if (err.originalError instanceof QueryFailedError) {
              return { message: err.originalError.driverError?.detail }
            }
            return err
          },
        }
      },
    }),
    ConfigurationModule,
    ProfileModule,
    RecipeModule,
    IngredientModule,
    IngredientItemModule,
    KitchenModule,
  ],
})
export class AppModule {}
