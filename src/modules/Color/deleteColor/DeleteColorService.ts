import { IColorRepository } from "../../../repositories/Interfaces/IColorRepository";

export class DeleteColorService {
  constructor(private colorRepository: IColorRepository) {}

  async execute(id: string): Promise<Error | void> {
    const itemExistsCategory = await this.colorRepository.existsItem(id);
    if (itemExistsCategory) {
      return new Error("This color has linked items and cannot be deleted");
    }
    const result = await this.colorRepository.delete(id);

    if (result == false) {
      return new Error("Color does not exists");
    }
    return;
  }
}
