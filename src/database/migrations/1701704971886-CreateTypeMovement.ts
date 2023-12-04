import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTypeMovement1701704971886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "type_movement",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                },
                {
                  name: "type",
                  type: "varchar",
                  isUnique: true,
                },
                {
                  name: "description",
                  type: "varchar",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("type_movement");
    }

}
