import { TypeMovementRepository } from "../../../repositories/repositories/TypeMovementRepository";
import { UpdateTypeMovementController } from "./UpdateTypeMovementController";
import { UpdateTypeMovementService } from "./UpdateTypeMovementService";

export const updateTypeMovementFactory = () => {
  const typeMovementRepository = new TypeMovementRepository();
  const updateTypeMovement = new UpdateTypeMovementService(
    typeMovementRepository
  );
  const updateTypeMovementController = new UpdateTypeMovementController(
    updateTypeMovement
  );
  return updateTypeMovementController;
};
