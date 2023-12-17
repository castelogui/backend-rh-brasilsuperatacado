import { TypeMovementRepository } from "../../../repositories/repositories/TypeMovementRepository";
import { DeleteTypeMovementController } from "./DeleteTypeMovementController";
import { DeleteTypeMovementService } from "./DeleteTypeMovementService";

export const deleteTypeMovementFactory = () => {
  const typeMovementRepository = new TypeMovementRepository();
  const deleteTypeMovement = new DeleteTypeMovementService(
    typeMovementRepository
  );
  const deleteTypeMovementController = new DeleteTypeMovementController(
    deleteTypeMovement
  );
  return deleteTypeMovementController;
};
