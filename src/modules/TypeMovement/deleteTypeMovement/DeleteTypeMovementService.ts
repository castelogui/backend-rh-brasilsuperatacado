import { ITypeMovementRepository } from "../../../repositories/Interfaces/ITypeMovementRepository";

export class DeleteTypeMovementService {
  constructor(private typeMovementRepository: ITypeMovementRepository) {}
  async execute(id: string): Promise<Error | void> {
    const result = await this.typeMovementRepository.delete(id);

    if (result == false) {
      return new Error("Movement Type does not exists");
    }

    return;
  }
}
