import { CategoryRepository } from "../../../repositories/repositories/CategoryRepository";
import { ColorRepository } from "../../../repositories/repositories/ColorRepository";
import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { CreateItemController } from "./CreateItemController";
import { CreateItemService } from "./CreateItemService";

export const createItemFactory = () => {
  const itemRepository = new ItemRepository();
  const categoryRepository = new CategoryRepository();
  const colorRepository = new ColorRepository();
  const createItem = new CreateItemService(
    itemRepository,
    categoryRepository,
    colorRepository
  );
  const createItemController = new CreateItemController(createItem);
  return createItemController;
};
