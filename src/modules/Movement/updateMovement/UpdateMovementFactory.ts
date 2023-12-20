import { MovementRepository } from "../../../repositories/repositories/MovementRepository";
import { UpdateMovementController } from "./UpdateMovementController";
import { UpdateMovementService } from "./UpdateMovementService";

export const updateMovementFactory = () => {
  const movementRepository = new MovementRepository();
  const updateMovement = new UpdateMovementService(movementRepository);
  const updateMovementController = new UpdateMovementController(updateMovement);
  return updateMovementController;
};
