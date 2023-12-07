import { DataSource } from "typeorm";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["src/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "migration",
  logging: true,
  synchronize: true,
});
