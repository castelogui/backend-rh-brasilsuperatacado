import { IMovementRepository } from "../../../repositories/Interfaces/IMovementRepository";

export class DeleteMovementService {
  constructor(private movementRepository: IMovementRepository) {}
  async execute(id: string): Promise<boolean | Error> {
    const result = await this.movementRepository.delete(id);

    if (result == false) {
      return new Error("Movement does not Exists");
    }

    return;
  }
}
