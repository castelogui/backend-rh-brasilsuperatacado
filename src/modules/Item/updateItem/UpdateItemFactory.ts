import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { UpdateItemController } from "./UpdateItemController";
import { UpdateItemService } from "./UpdateItemService";

export const updateItemFactory = () => {
  const itemRepository = new ItemRepository();
  const updateItemService = new UpdateItemService(itemRepository);
  const updateItemConroller = new UpdateItemController(updateItemService);
  return updateItemConroller;
};
