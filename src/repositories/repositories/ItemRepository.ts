import { AppDataSource } from "../../database/AppDataSource";
import { Item } from "../../entities/Item";
import { IItemRepository } from "../Interfaces/IItemRepository";

const repository = AppDataSource.getRepository(Item);

export class ItemRepository implements IItemRepository {
  getOne(id: string): Promise<Item | Error> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Item[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean | void> {
    throw new Error("Method not implemented.");
  }
  update({
    id,
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size,
  }: {
    id: any;
    name: any;
    description: any;
    estoque: any;
    status: any;
    category_id: any;
    color_id: any;
    size: any;
  }): Promise<Item | Error> {
    throw new Error("Method not implemented.");
  }
  async exists({ name, size }: Item): Promise<boolean> {
    const item = await repository.findOneBy({ name, size });

    return !!item;
  }

  async create({
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size,
  }: Item): Promise<Item> {
    const item = repository.create({
      name,
      description,
      estoque,
      status,
      category_id,
      color_id,
      size,
    });

    await repository.save(item);

    // Carregar as relações antes de retornar
    const returnItem = await repository.findOne({
      where: { id: item.id },
      relations: ["category", "color"],
    });

    return returnItem;
  }
}
