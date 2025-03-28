import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchedulesTable1741738040856 implements MigrationInterface {
    name = 'CreateSchedulesTable1741738040856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "schedules" (
                "id" SERIAL PRIMARY KEY,
                "barber_id" INTEGER NOT NULL,
                "day" VARCHAR(255) NOT NULL,
                "start_time" VARCHAR(255) NOT NULL,
                "end_time" VARCHAR(255) NOT NULL
            );
        `);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "status" INTEGER NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "total" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`
            ALTER TABLE "schedules" 
            ADD CONSTRAINT "FK_e2d5ae28b64c1f811a067d97c7c" 
            FOREIGN KEY ("barber_id") REFERENCES "users"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "schedules" DROP CONSTRAINT "FK_e2d5ae28b64c1f811a067d97c7c"
        `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "total" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "status" INTEGER NOT NULL`);
        await queryRunner.query(`DROP TABLE "schedules"`);
    }
}
