import { Category } from "../../entities/Category";

export interface ICategoryRepository {
  create({ name, description }): Promise<Category>;
  exists(name: string): Promise<boolean>;
  getOne(id: string): Promise<Category | Error>;
  getAll(): Promise<Category[]>;
  delete(id: string): Promise<boolean | void>;
  update({ id, name, description }): Promise<Category | Error>;
}
