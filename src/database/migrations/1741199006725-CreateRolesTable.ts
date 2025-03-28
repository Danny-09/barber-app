import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRolesTable1741199006725 implements MigrationInterface {
    name = 'CreateRolesTable1741199006725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "email" VARCHAR(255) NOT NULL UNIQUE,
                "password" VARCHAR(255) NOT NULL,
                "phone" VARCHAR(255) NOT NULL,
                "role_id" INT NOT NULL,
                "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" 
                    FOREIGN KEY ("role_id") REFERENCES "roles"("id")
                    ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);

        // Insertar roles por defecto
        await queryRunner.query(`
            INSERT INTO "roles" ("name") VALUES 
            ('SUPER_ADMIN'), 
            ('BARBER'), 
            ('CUSTOMER');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }
}
