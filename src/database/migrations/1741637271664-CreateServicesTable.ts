import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateServicesTable1741637271664 implements MigrationInterface {
    name = 'CreateServicesTable1741637271664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`services\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`status\` tinyint NOT NULL, \`barber_id\` int NOT NULL, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`services\` ADD CONSTRAINT \`FK_6cd3beb692e3459ef1b64aa15a0\` FOREIGN KEY (\`barber_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`services\` DROP FOREIGN KEY \`FK_6cd3beb692e3459ef1b64aa15a0\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`services\``);
    }

}
