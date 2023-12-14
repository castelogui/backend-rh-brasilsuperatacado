import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { DeleteItemController } from "./DeleteItemController";
import { DeleteItemService } from "./DeleteItemService";

export const deleteItemFactory = () => {
  const itemRepository = new ItemRepository();
  const deleteItem = new DeleteItemService(itemRepository);
  const deleteItemController = new DeleteItemController(deleteItem);
  return deleteItemController;
};
