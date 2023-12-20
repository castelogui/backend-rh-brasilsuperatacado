import { Movement } from "../../../entities/Movement";
import { IMovementRepository } from "../../../repositories/Interfaces/IMovementRepository";

export class GetAllMovementService {
  constructor(private movementRepository: IMovementRepository) {}
  async execute(): Promise<Movement[]> {
    const movements = await this.movementRepository.getAll();

    return movements;
  }
}
