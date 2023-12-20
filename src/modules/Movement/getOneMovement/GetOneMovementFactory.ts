import { MovementRepository } from "../../../repositories/repositories/MovementRepository";
import { GetOneMovementController } from "./GetOneMovementController";
import { GetOneMovementService } from "./GetOneMovementService";

export const getOneMovementFactory = () => {
  const movementRepository = new MovementRepository();
  const getOneMovement = new GetOneMovementService(movementRepository);
  const getOneMovementController = new GetOneMovementController(getOneMovement);
  return getOneMovementController;
};
