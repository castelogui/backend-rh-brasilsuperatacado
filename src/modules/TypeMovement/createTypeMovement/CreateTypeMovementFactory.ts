import { TypeMovementRepository } from "../../../repositories/repositories/TypeMovementRepository";
import { CreateTypeMovementController } from "./CreateTypeMovementController";
import { CreateTypeMovementService } from "./CreateTypeMovementService";

export const createTypeMovementFactory = () => {
  const typeMovementRepository = new TypeMovementRepository();
  const createTypeMovement = new CreateTypeMovementService(
    typeMovementRepository
  );
  const createTypeMovementController = new CreateTypeMovementController(
    createTypeMovement
  );
  return createTypeMovementController;
};
