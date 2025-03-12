import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchedulesTable1741738040856 implements MigrationInterface {
    name = 'CreateSchedulesTable1741738040856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`schedules\` (\`id\` int NOT NULL AUTO_INCREMENT, \`barber_id\` int NOT NULL, \`day\` varchar(255) NOT NULL, \`start_time\` varchar(255) NOT NULL, \`end_time\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD \`status\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`appointments\` CHANGE \`total\` \`total\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_e2d5ae28b64c1f811a067d97c7c\` FOREIGN KEY (\`barber_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_e2d5ae28b64c1f811a067d97c7c\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`appointments\` CHANGE \`total\` \`total\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD \`status\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`schedules\``);
    }

}
