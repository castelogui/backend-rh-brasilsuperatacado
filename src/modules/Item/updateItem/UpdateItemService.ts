import { Item } from "../../../entities/Item";
import { IItemRepository } from "../../../repositories/Interfaces/IItemRepository";
import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";
import { IColorRepository } from "../../../repositories/Interfaces/IColorRepository";

export class UpdateItemService {
  constructor(
    private itemRepository: IItemRepository,
    private categoryRepository: ICategoryRepository,
    private colorRepository: IColorRepository
  ) {}
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
    const itemExists = await this.itemRepository.getOne(id);
    if (itemExists instanceof Error) {
      return new Error(`${itemExists.message} or id is incorrect`);
    }
    try {
      await this.validRequest({ name, category_id, color_id, size });
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
    }
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

    const itemAlreadyExists = await this.itemRepository.exists({
      id,
      name,
      size,
      category_id,
      color_id,
    });
    if (itemAlreadyExists) {
      return new Error("This item already exists");
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
