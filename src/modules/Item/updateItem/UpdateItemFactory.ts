import { CategoryRepository } from "../../../repositories/repositories/CategoryRepository";
import { ColorRepository } from "../../../repositories/repositories/ColorRepository";
import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { UpdateItemController } from "./UpdateItemController";
import { UpdateItemService } from "./UpdateItemService";

export const updateItemFactory = () => {
  const itemRepository = new ItemRepository();
  const categoryRepository = new CategoryRepository();
  const colorRepository = new ColorRepository();
  const updateItemService = new UpdateItemService(
    itemRepository,
    categoryRepository,
    colorRepository
  );
  const updateItemConroller = new UpdateItemController(updateItemService);
  return updateItemConroller;
};
