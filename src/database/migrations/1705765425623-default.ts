import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705765425623 implements MigrationInterface {
    name = 'Default1705765425623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colors" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "hexadecimal" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departments" ("id" character varying NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "estoque" integer NOT NULL, "status" boolean NOT NULL, "category_id" character varying NOT NULL, "color_id" character varying NOT NULL, "size" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_movement" ("id" character varying NOT NULL, "code" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_66f7a125254aea0ce41efcb5b59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movement" ("id" character varying NOT NULL, "description" character varying NOT NULL, "quantity" integer NOT NULL, "type_movement_id" character varying NOT NULL, "item_id" character varying NOT NULL, "item_estoque" integer NOT NULL, "item_estoque_ant" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_079f005d01ebda984e75c2d67ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "positions" ("id" character varying NOT NULL, "codigo" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "department_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "departament_id" character varying, CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "username" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_0c4aa809ddf5b0c6ca45d8a8e80" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_234f3bbf67f838dbd38432190a5" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movement" ADD CONSTRAINT "FK_7d705d65988b6d28f63e2aa7a52" FOREIGN KEY ("type_movement_id") REFERENCES "type_movement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movement" ADD CONSTRAINT "FK_62edf936b84c93f0d609be07d6f" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "positions" ADD CONSTRAINT "FK_535bc3be42ca48cd6e1c08c437f" FOREIGN KEY ("departament_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "positions" DROP CONSTRAINT "FK_535bc3be42ca48cd6e1c08c437f"`);
        await queryRunner.query(`ALTER TABLE "movement" DROP CONSTRAINT "FK_62edf936b84c93f0d609be07d6f"`);
        await queryRunner.query(`ALTER TABLE "movement" DROP CONSTRAINT "FK_7d705d65988b6d28f63e2aa7a52"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_234f3bbf67f838dbd38432190a5"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_0c4aa809ddf5b0c6ca45d8a8e80"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`DROP TABLE "movement"`);
        await queryRunner.query(`DROP TABLE "type_movement"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "departments"`);
        await queryRunner.query(`DROP TABLE "colors"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
