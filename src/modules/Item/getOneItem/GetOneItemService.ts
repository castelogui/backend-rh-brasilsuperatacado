import { Request, Response } from "express";
import { IItemRepository } from "../../../repositories/Interfaces/IItemRepository";
import { Item } from "../../../entities/Item";

export class GetOneItemService {
  constructor(private itemRepository: IItemRepository) {}
  async execute(id: string): Promise<Item | Error> {
    const item = await this.itemRepository.getOne(id);

    if (item instanceof Error) {
      return new Error(item.message);
    }

    return item;
  }
}
