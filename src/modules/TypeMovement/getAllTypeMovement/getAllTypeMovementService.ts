import { TypeMovement } from "../../../entities/TypeMovement";
import { ITypeMovementRepository } from "../../../repositories/Interfaces/ITypeMovementRepository";

export class GetAllTypeMovementService {
  constructor(private typeMovementRepository: ITypeMovementRepository) {}
  async execute(): Promise<TypeMovement[]> {
    const typeMovements = await this.typeMovementRepository.getAll();

    return typeMovements;
  }
}
