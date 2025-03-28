import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointmentsTable1741669776210 implements MigrationInterface {
    name = 'CreateAppointmentsTable1741669776210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "appointments" (
                "id" SERIAL PRIMARY KEY,
                "date" VARCHAR(255) NOT NULL,
                "user_id" INTEGER NOT NULL,
                "barber_id" INTEGER NOT NULL,
                "service_id" INTEGER NOT NULL,
                "status" VARCHAR(255) NOT NULL,
                "total" INTEGER NULL,
                "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`
            ALTER TABLE "appointments" 
            ADD CONSTRAINT "FK_66dee3bea82328659a4db8e54b7" 
            FOREIGN KEY ("user_id") REFERENCES "users"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "appointments" 
            ADD CONSTRAINT "FK_28d5a251a0d69e60f83044f5a55" 
            FOREIGN KEY ("barber_id") REFERENCES "users"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "appointments" 
            ADD CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857" 
            FOREIGN KEY ("service_id") REFERENCES "services"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "appointments" DROP CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointments" DROP CONSTRAINT "FK_28d5a251a0d69e60f83044f5a55"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointments" DROP CONSTRAINT "FK_66dee3bea82328659a4db8e54b7"
        `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "appointments"`);
    }
}
