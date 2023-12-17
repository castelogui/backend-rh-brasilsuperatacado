import { TypeMovementRepository } from "../../../repositories/repositories/TypeMovementRepository";
import { GetOneTypeMovementController } from "./GetOneTypeMovementController";
import { GetOneTypeMovementService } from "./GetOneTypeMovementService";

export const getOneTypeMovementFactory = () => {
  const typeMovementRepository = new TypeMovementRepository();
  const getOneTypeMovement = new GetOneTypeMovementService(
    typeMovementRepository
  );
  const getOneTypeMovementController = new GetOneTypeMovementController(
    getOneTypeMovement
  );
  return getOneTypeMovementController;
};
