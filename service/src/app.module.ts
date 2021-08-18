import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QueryFailedError } from 'typeorm'
import { IngredientItemEntity } from './ingredient-item/ingredient-item.entity'
import { IngredientItemModule } from './ingredient-item/ingredient-item.module'
import { IngredientModule } from './ingredient/ingredient.module'
import { ProfileModule } from './profile/profile.module'
import { RecipeModule } from './recipe/recipe.module'

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
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
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
    RecipeModule,
    IngredientModule,
    IngredientItemModule,
  ],
})
export class AppModule {}
