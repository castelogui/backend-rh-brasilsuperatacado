import { MovementRepository } from "../../../repositories/repositories/MovementRepository";
import { CreateMovementController } from "./CreateMovementController";
import { CreateMovementService } from "./CreateMovementService";

export const createMovementFactory = () => {
  const movementRepository = new MovementRepository();
  const createMovement = new CreateMovementService(movementRepository);
  const createMovementController = new CreateMovementController(createMovement);
  return createMovementController;
};
