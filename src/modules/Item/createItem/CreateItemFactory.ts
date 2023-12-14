import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { CreateItemController } from "./CreateItemController";
import { CreateItemService } from "./CreateItemService";

export const createItemFactory = () => {
  const itemRepository = new ItemRepository();
  const createItem = new CreateItemService(itemRepository);
  const createItemController = new CreateItemController(createItem);
  return createItemController;
}