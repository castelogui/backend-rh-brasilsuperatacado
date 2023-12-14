import { Item } from "../../../entities/Item";
import { IItemRepository } from "../../../repositories/Interfaces/IItemRepository";

type ItemRequest = {
  name: String;
  description: String;
  estoque: number;
  status: boolean;
  category_id: String;
  color_id: String;
  size: String;
};

export class CreateItemService {
  constructor(private itemRepository: IItemRepository) {}
  async execute({
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size,
  }: ItemRequest): Promise<Item | Error> {
    const itemAreadyExists = await this.itemRepository.exists({ name, size });

    if (itemAreadyExists) {
      return new Error("An item with this name and size already exists");
    }

    const item = await this.itemRepository.create({
      name,
      description,
      estoque,
      status,
      category_id,
      color_id,
      size,
    });

    return item;
  }
}
