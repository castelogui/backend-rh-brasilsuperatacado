import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { GetOneItemController } from "./GetOneItemController";
import { GetOneItemService } from "./GetOneItemService";

export const getOneItemFactory = () => {
  const itemRepository = new ItemRepository();
  const getOneItem = new GetOneItemService(itemRepository);
  const getOneItemController = new GetOneItemController(getOneItem);
  return getOneItemController;
};
