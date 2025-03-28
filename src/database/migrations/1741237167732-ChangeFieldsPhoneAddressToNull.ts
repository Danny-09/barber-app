import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFieldsPhoneAddressToNull1741237167732 implements MigrationInterface {
    name = 'ChangeFieldsPhoneAddressToNull1741237167732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "address" VARCHAR(255) NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" TYPE VARCHAR(255), ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ, ALTER COLUMN "created_at" DROP NOT NULL, ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ, ALTER COLUMN "updated_at" DROP NOT NULL, ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ, ALTER COLUMN "updated_at" SET NOT NULL, ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ, ALTER COLUMN "created_at" SET NOT NULL, ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" TYPE VARCHAR(255), ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
    }
}
