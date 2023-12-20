import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovement1701705041753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movement",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "quantity",
            type: "numeric",
          },
          {
            name: "type_movement_id",
            type: "uuid",
          },
          {
            name: "item_id",
            type: "uuid",
          },
          {
            name: "item_estoque",
            type: "numeric",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fk_movements_type",
            columnNames: ["type_movement_id"],
            referencedTableName: "type_movement",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_movements_item",
            columnNames: ["item_id"],
            referencedTableName: "items",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("movement");
  }
}
