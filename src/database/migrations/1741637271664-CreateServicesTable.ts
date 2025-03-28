import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateServicesTable1741637271664 implements MigrationInterface {
    name = 'CreateServicesTable1741637271664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "services" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "description" VARCHAR(255) NOT NULL,
                "price" INTEGER NOT NULL,
                "status" BOOLEAN NOT NULL,
                "barber_id" INTEGER NOT NULL,
                "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`
            ALTER TABLE "services" 
            ADD CONSTRAINT "FK_6cd3beb692e3459ef1b64aa15a0" 
            FOREIGN KEY ("barber_id") REFERENCES "users"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "services" DROP CONSTRAINT "FK_6cd3beb692e3459ef1b64aa15a0"
        `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "services"`);
    }
}
