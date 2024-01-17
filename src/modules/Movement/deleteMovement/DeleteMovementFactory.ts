import { ItemRepository } from "../../../repositories/repositories/ItemRepository";
import { MovementRepository } from "../../../repositories/repositories/MovementRepository";
import { TypeMovementRepository } from "../../../repositories/repositories/TypeMovementRepository";
import { DeleteMovementController } from "./DeleteMovementController";
import { DeleteMovementService } from "./DeleteMovementService";

export const deleteMovementFactory = () => {
  const movementRepository = new MovementRepository();
  const typeMovementRepository = new TypeMovementRepository();
  const itemRepository = new ItemRepository();
  const deleteMovement = new DeleteMovementService(
    movementRepository,
    typeMovementRepository,
    itemRepository
  );
  const deleteMovementController = new DeleteMovementController(deleteMovement);
  return deleteMovementController;
};
