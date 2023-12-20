import { MovementRepository } from "../../../repositories/repositories/MovementRepository";
import { GetAllMovementController } from "./GetAllMovementController";
import { GetAllMovementService } from "./GetAllMovementService";

export const getAllMovementFactory = () => {
  const movementRepository = new MovementRepository();
  const getAllMovement = new GetAllMovementService(movementRepository);
  const getAllMovementController = new GetAllMovementController(getAllMovement);
  return getAllMovementController;
};
