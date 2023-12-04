import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItems1701703055966 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "estoque",
            type: "numeric",
          },
          {
            name: "category_id",
            type: "uuid",
          },
          {
            name: "color_id",
            type: "uuid",
          },
          {
            name: "size_id",
            type: "uuid",
          },
          {
            name: "status",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fk_items_category",
            columnNames: ["category_id"],
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_items_color",
            columnNames: ["color_id"],
            referencedTableName: "colors",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_items_size",
            columnNames: ["size_id"],
            referencedTableName: "sizes",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("items");
  }
}
