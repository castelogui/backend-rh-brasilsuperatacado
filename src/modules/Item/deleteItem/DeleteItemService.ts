import { ItemRepository } from "../../../repositories/repositories/ItemRepository";

export class DeleteItemService {
  constructor(private itemRepository: ItemRepository) {}
  async execute(id: string): Promise<Error | void> {
    const result = await this.itemRepository.delete(id);

    if (result == false) {
      return new Error("Item does not exists");
    }
    return;
  }
}
