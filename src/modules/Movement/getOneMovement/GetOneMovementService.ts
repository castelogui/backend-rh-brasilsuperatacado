import { Movement } from "../../../entities/Movement";
import { IMovementRepository } from "../../../repositories/Interfaces/IMovementRepository";

export class GetOneMovementService {
  constructor(private movementRepository: IMovementRepository) {}
  async execute(id: string): Promise<Movement | Error> {
    const movement = this.movementRepository.getOne(id);

    if (movement instanceof Error) {
      return new Error(movement.message);
    }

    return movement;
  }
}
