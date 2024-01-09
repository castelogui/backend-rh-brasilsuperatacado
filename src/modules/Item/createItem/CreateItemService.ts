import { Item } from "../../../entities/Item";
import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";
import { IColorRepository } from "../../../repositories/Interfaces/IColorRepository";
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
  constructor(
    private itemRepository: IItemRepository,
    private categoryRepository: ICategoryRepository,
    private colorRepository: IColorRepository
  ) {}
  async execute({
    name,
    description,
    estoque,
    status,
    category_id,
    color_id,
    size,
  }: ItemRequest): Promise<Item | Error> {
    try {
      await this.validRequest({ name, category_id, color_id, size });
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
    }

    !description ? (description = name) : description;
    !estoque ? (estoque = 0) : estoque;
    !status ? (status = true) : status;

    const categoryExists = await this.categoryRepository.getOne(
      category_id.toString()
    );
    
    if (categoryExists instanceof Error) {
      return new Error(categoryExists.message);
    }
    const colorExists = await this.colorRepository.getOne(color_id.toString());

    if (colorExists instanceof Error) {
      return new Error(colorExists.message);
    }

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
  async validRequest({
    name,
    category_id,
    color_id,
    size,
  }): Promise<Error | void> {
    return new Promise((resolve, reject) => {
      const checkArgument = (arg, argName) => {
        if (!arg) {
          reject(new Error(`Request missing arguments: ${argName}`));
        }
      };

      try {
        checkArgument(name, "name");
        checkArgument(category_id, "category_id");
        checkArgument(color_id, "color_id");
        checkArgument(size, "size");
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
