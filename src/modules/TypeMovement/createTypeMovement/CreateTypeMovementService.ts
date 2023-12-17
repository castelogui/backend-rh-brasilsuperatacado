import { TypeMovement } from "../../../entities/TypeMovement";
import { ITypeMovementRepository } from "../../../repositories/Interfaces/ITypeMovementRepository";

export class CreateTypeMovementService {
  constructor(private typeMovementRepository: ITypeMovementRepository) {}
  async execute({ code, type, description }): Promise<TypeMovement | Error> {
    const typeMovementExists = await this.typeMovementRepository.exists({code, type});

    if (typeMovementExists[0]) {
      return new Error("This code already exists");
    }
    if (typeMovementExists[1]) {
      return new Error("This type already exists");
    }
    
    const typeMovement = await this.typeMovementRepository.create({
      code,
      type,
      description,
    });

    if (typeMovement instanceof Error) {
      return new Error(typeMovement.message);
    }

    return typeMovement;
  }
}
