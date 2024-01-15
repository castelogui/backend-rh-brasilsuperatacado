import { TypeMovement } from "../../../entities/TypeMovement";
import { ITypeMovementRepository } from "../../../repositories/Interfaces/ITypeMovementRepository";

type TypeMovementUpdateRequest = {
  id: string;
  code: string;
  type: string;
  description: string;
};

export class UpdateTypeMovementService {
  constructor(private typeMovementRepository: ITypeMovementRepository) {}
  async execute({
    id,
    code,
    type,
    description,
  }: TypeMovementUpdateRequest): Promise<TypeMovement | Error> {
    const typeMovement = await this.typeMovementRepository.update({
      id,
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
