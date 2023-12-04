import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "pwadmin",
  database: "postgres",
  entities: ["src/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "migration",
  logging: true,
  synchronize: true,
});
