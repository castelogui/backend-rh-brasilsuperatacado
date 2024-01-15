import { Item } from "../../entities/Item";

export interface IItemRepository {
  create({
    id,
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size,
  }): Promise<Item | Error>;
  exists({
    id,
    name,
    size,
    category_id,
    color_id,
  }: {
    id: String | null;
    name: String;
    size: String;
    category_id: String;
    color_id: String;
  }): Promise<boolean>;
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
    size,
  }): Promise<Item | Error>;
  addEstoque(id: string, quantidade: number): Promise<void | Error>;
  removeEstoque(id: string, quantidade: number): Promise<void | Error>;
}
