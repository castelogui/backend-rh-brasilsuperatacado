import { Movement } from "../../../entities/Movement";
import { IMovementRepository } from "../../../repositories/Interfaces/IMovementRepository";

type MovementRequest = {
  description: string;
  quantity: number;
  type_movement_id: string;
  item_id: string;
};

export class CreateMovementService {
  constructor(private movementRepository: IMovementRepository) {}
  async execute({
    description,
    quantity,
    type_movement_id,
    item_id,
  }: MovementRequest): Promise<Movement> {
    
    const movement = await this.movementRepository.create({
      description,
      quantity,
      type_movement_id,
      item_id,
    });

    return movement;
  }
}
