import { TypeMovementRepository } from "../../../repositories/repositories/TypeMovementRepository";
import { GetAllTypeMovementController } from "./getAllTypeMovementController";
import { GetAllTypeMovementService } from "./getAllTypeMovementService";

export const getAllTypeMovementFactory = () => {
  const typeMovementRepository = new TypeMovementRepository();
  const getAllTypeMovement = new GetAllTypeMovementService(
    typeMovementRepository
  );
  const getAllTypeMovementController = new GetAllTypeMovementController(
    getAllTypeMovement
  );
  return getAllTypeMovementController;
};
