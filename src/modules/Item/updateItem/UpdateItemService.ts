import { Item } from "../../../entities/Item";
import { IItemRepository } from "../../../repositories/Interfaces/IItemRepository";

export class UpdateItemService {
  constructor(private itemRepository: IItemRepository) {}
  async execute({
    id,
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size,
  }): Promise<Item | Error> {
    const itemAlreadyExists = await this.itemRepository.exists({name, size})

    if(itemAlreadyExists){
      return new Error("This item already exists")
    }

    const item = await this.itemRepository.update({
      id,
      name,
      description,
      estoque,
      status,
      category_id,
      color_id,
      size,
    });

    if (item instanceof Error) {
      return new Error(item.message);
    }

    return item;
  }
}
