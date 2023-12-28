import { MovementRepository } from "../../../repositories/repositories/MovementRepository";
import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { TypeMovementRepository } from "../../../repositories/repositories/TypeMovementRepository";
import { UpdateMovementController } from "./UpdateMovementController";
import { UpdateMovementService } from "./UpdateMovementService";

export const updateMovementFactory = () => {
  const movementRepository = new MovementRepository();
  const typeMovementRepository = new TypeMovementRepository();
  const itemRepository = new ItemRepository();
  const updateMovement = new UpdateMovementService(
    movementRepository,
    typeMovementRepository,
    itemRepository
  );
  const updateMovementController = new UpdateMovementController(updateMovement);
  return updateMovementController;
};
