import { AppDataSource } from "../../database/AppDataSource";
import { Item } from "../../entities/Item";
import { IItemRepository } from "../Interfaces/IItemRepository";

const repository = AppDataSource.getRepository(Item);

export class ItemRepository implements IItemRepository {
  async exists({name, size}: Item): Promise<boolean> {
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

    return item;
  }
}
