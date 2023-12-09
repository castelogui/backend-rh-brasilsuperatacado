import { Color } from "../../../entities/Color";
import { IColorRepository } from "../../../repositories/Interfaces/IColorRepository";

export class GetAllColorsService {
  constructor(private colorRepository: IColorRepository) {}

  async execute(): Promise<Color[]> {
    const colors = await this.colorRepository.getAll();

    return colors;
  }
}
