import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["src/entities/*.{js,ts}"],
  migrations: ["src/database/migrations/*.{js,ts}"],
  migrationsTableName: "migration",
  logging: true,
  synchronize: true,
});
