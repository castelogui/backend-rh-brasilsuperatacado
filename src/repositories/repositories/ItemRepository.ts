import { AppDataSource } from "../../database/AppDataSource";
import { Item } from "../../entities/Item";
import { FormatCustomDate } from "../../utils/formatCustomDate";
import { IItemRepository } from "../Interfaces/IItemRepository";

const repository = AppDataSource.getRepository(Item);

export class ItemRepository implements IItemRepository {
  async getOne(id: string): Promise<Item | Error> {
    const item = await repository.findOne({
      where: { id },
      relations: ["category", "color"],
    });

    if (!!item == false) {
      return new Error("Item does not exists");
    }

    return item;
  }
  async getAll(): Promise<Item[]> {
    const items = await repository.find({ relations: ["category", "color"] });

    return items;
  }
  async delete(id: string): Promise<boolean> {
    const item = await repository.findOneBy({ id });

    if (!item) {
      return false;
    }
    await repository.remove(item);
    return;
  }
  async update({
    id,
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size,
  }): Promise<Item | Error> {
    const item = await repository.findOneBy({ id });

    if (!!item == false) {
      return new Error("Item does not exists");
    }

    item.name = name ? name : item.name;
    item.description = description ? description : item.description;
    item.estoque = estoque ? estoque : item.estoque;
    item.status = status ? status : item.status;
    item.category_id = category_id ? category_id : item.category_id;
    item.color_id = color_id ? color_id : item.color_id;
    item.size = size ? size : item.size;
    item.updated_at = new Date(new FormatCustomDate().dateTimeLocal())

    await repository.save(item);

    const returnItem = await this.getOne(id);

    return returnItem;
  }
  async exists({
    id,
    name,
    size,
    category_id,
    color_id,
  }: Item): Promise<boolean> {
    const item = await repository.findOneBy({
      name,
      size,
      category_id,
      color_id,
    });
    if (item) {
      return item.id !== id ? true : false;
    }
    return !!item;
  }

  async create({
    id,
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size,
  }: Item): Promise<Item | Error> {
    const item = repository.create({
      id,
      name,
      description,
      estoque,
      status,
      category_id,
      color_id,
      size,
    });

    await repository.save(item);

    const returnItem = await this.getOne(item.id);

    return returnItem;
  }
  async addEstoque(id: string, quantidade: number): Promise<void | Error> {
    const item = await repository.findOneBy({ id });
    if (!item) {
      return new Error("Item does not exists");
    }
    item.estoque += quantidade;
    await repository.save(item);
    return;
  }
  async removeEstoque(id: string, quantidade: number): Promise<void | Error> {
    const item = await repository.findOneBy({ id });
    if (!item) {
      return new Error("Item does not exists");
    }
    item.estoque -= quantidade;
    await repository.save(item);
    return;
  }
}
