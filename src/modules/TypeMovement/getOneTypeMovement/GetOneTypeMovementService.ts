import { TypeMovement } from "../../../entities/TypeMovement";
import { ITypeMovementRepository } from "../../../repositories/Interfaces/ITypeMovementRepository";

export class GetOneTypeMovementService {
  constructor(private typeMovementRepository: ITypeMovementRepository) {}
  async execute(id: string): Promise<TypeMovement | Error> {
    const typeMovement = await this.typeMovementRepository.getOne(id);

    if (typeMovement instanceof Error) {
      return new Error(typeMovement.message);
    }

    return typeMovement;
  }
}
