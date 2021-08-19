import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1629351548197 implements MigrationInterface {
  name = 'init1629351548197'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "ingredients_unit_enum" AS ENUM('teaspoon', 'tablespoon', 'cup', 'ounce')`,
    )
    await queryRunner.query(
      `CREATE TABLE "ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "unit" "ingredients_unit_enum" NOT NULL DEFAULT 'cup', "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "recipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, "servings" integer, "steps" text array, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "ingredient_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" double precision NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ingredientId" uuid, "recipeId" uuid, CONSTRAINT "REL_8afce81b8cf12c6bec51714b25" UNIQUE ("ingredientId"), CONSTRAINT "PK_10ffe5c9a45b1d7a7fc81c745be" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "fullName" text NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_5b49bd22c967ce2829ca8f17720" UNIQUE ("email"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "kitchen" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c79a8f2cdbce1ce12d7198fe344" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "profiles_kitchens_kitchen" ("profilesId" uuid NOT NULL, "kitchenId" uuid NOT NULL, CONSTRAINT "PK_df808d72986024d1d830b6fd463" PRIMARY KEY ("profilesId", "kitchenId"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_c4c67352659ae9d5a7733d7e84" ON "profiles_kitchens_kitchen" ("profilesId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_bf9515495878ecc5e175dbccbb" ON "profiles_kitchens_kitchen" ("kitchenId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "ingredient_item" ADD CONSTRAINT "FK_8afce81b8cf12c6bec51714b254" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "ingredient_item" ADD CONSTRAINT "FK_b8e61eb15e7d256e0b87b98fba5" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "profiles_kitchens_kitchen" ADD CONSTRAINT "FK_c4c67352659ae9d5a7733d7e84b" FOREIGN KEY ("profilesId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "profiles_kitchens_kitchen" ADD CONSTRAINT "FK_bf9515495878ecc5e175dbccbb4" FOREIGN KEY ("kitchenId") REFERENCES "kitchen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles_kitchens_kitchen" DROP CONSTRAINT "FK_bf9515495878ecc5e175dbccbb4"`,
    )
    await queryRunner.query(
      `ALTER TABLE "profiles_kitchens_kitchen" DROP CONSTRAINT "FK_c4c67352659ae9d5a7733d7e84b"`,
    )
    await queryRunner.query(
      `ALTER TABLE "ingredient_item" DROP CONSTRAINT "FK_b8e61eb15e7d256e0b87b98fba5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "ingredient_item" DROP CONSTRAINT "FK_8afce81b8cf12c6bec51714b254"`,
    )
    await queryRunner.query(`DROP INDEX "IDX_bf9515495878ecc5e175dbccbb"`)
    await queryRunner.query(`DROP INDEX "IDX_c4c67352659ae9d5a7733d7e84"`)
    await queryRunner.query(`DROP TABLE "profiles_kitchens_kitchen"`)
    await queryRunner.query(`DROP TABLE "kitchen"`)
    await queryRunner.query(`DROP TABLE "profiles"`)
    await queryRunner.query(`DROP TABLE "ingredient_item"`)
    await queryRunner.query(`DROP TABLE "recipes"`)
    await queryRunner.query(`DROP TABLE "ingredients"`)
    await queryRunner.query(`DROP TYPE "ingredients_unit_enum"`)
  }
}
