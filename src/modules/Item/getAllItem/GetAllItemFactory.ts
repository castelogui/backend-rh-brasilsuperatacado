import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { GetAllItemController } from "./GetAllItemController";
import { GetAllItemService } from "./GetAllItemService";

export const getAllItemFactory = () => {
  const itemRepository = new ItemRepository();
  const getAllItem = new GetAllItemService(itemRepository);
  const getAllItemController = new GetAllItemController(getAllItem);
  return getAllItemController;
};
