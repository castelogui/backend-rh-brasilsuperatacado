import { Movement } from "../../../entities/Movement";
import { IMovementRepository } from "../../../repositories/Interfaces/IMovementRepository";

export class UpdateMovementService {
  constructor(private movementRepository: IMovementRepository) {}

  async execute({
    id,
    description,
    quantity,
    type_movement_id,
    item_id,
  }): Promise<Movement | Error> {
    const result = await this.movementRepository.update({
      id,
      description,
      quantity,
      type_movement_id,
      item_id,
    });

    if (result instanceof Error) {
      return new Error(result.message);
    }

    return result;
  }
}
