import { DataSource } from "typeorm";
import "dotenv/config";
import { Category } from "../entities/Category";
import { Color } from "../entities/Color";
import { Department } from "../entities/Department";
import { Item } from "../entities/Item";
import { Movement } from "../entities/Movement";
import { Positions } from "../entities/Positions";
import { TypeMovement } from "../entities/TypeMovement";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Category, Color, Department, Item, Movement, Positions, TypeMovement, User],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  migrationsTableName: "migration",
  logging: false,
  synchronize: true,
});
