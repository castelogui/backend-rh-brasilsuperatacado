import { Request, Response } from "express";
import { IItemRepository } from "../../../repositories/Interfaces/IItemRepository";
import { Item } from "../../../entities/Item";

export class GetAllItemService {
  constructor(private itemRepository: IItemRepository) {}
  async execute(): Promise<Item[]> {
    const items = await this.itemRepository.getAll();

    return items;
  }
}
