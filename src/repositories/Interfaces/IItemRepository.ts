import { Item } from "../../entities/Item";

export interface IItemRepository {
  create({
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size_id,
  }): Promise<Item>;
  exists(name: string): Promise<boolean>;
  getOne(id: string): Promise<Item | Error>;
  getAll(): Promise<Item[]>;
  delete(id: string): Promise<boolean | void>;
  update({
    id,
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size_id,
  }): Promise<Item | Error>;
}
