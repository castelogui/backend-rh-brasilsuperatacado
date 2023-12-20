import { MovementRepository } from "../../../repositories/repositories/MovementRepository";
import { DeleteMovementController } from "./DeleteMovementController";
import { DeleteMovementService } from "./DeleteMovementService";

export const deleteMovementFactory = () => {
  const movementRepository = new MovementRepository();
  const deleteMovement = new DeleteMovementService(movementRepository);
  const deleteMovementController = new DeleteMovementController(deleteMovement);
  return deleteMovementController;
};
