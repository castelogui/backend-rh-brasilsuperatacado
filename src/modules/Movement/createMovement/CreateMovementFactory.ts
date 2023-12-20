import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { MovementRepository } from "../../../repositories/repositories/MovementRepository";
import { TypeMovementRepository } from "../../../repositories/repositories/TypeMovementRepository";
import { CreateMovementController } from "./CreateMovementController";
import { CreateMovementService } from "./CreateMovementService";

export const createMovementFactory = () => {
  const movementRepository = new MovementRepository();
  const itemRepository = new ItemRepository();
  const typeMovementRepository = new TypeMovementRepository();
  const createMovement = new CreateMovementService(
    movementRepository,
    itemRepository,
    typeMovementRepository
  );
  const createMovementController = new CreateMovementController(createMovement);
  return createMovementController;
};
