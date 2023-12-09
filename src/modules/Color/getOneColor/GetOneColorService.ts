import { IColorRepository } from "../../../repositories/Interfaces/IColorRepository";

export class GetOneColorService {
  constructor(private colorRepository: IColorRepository) {}

  async execute(id: string) {
    const color = await this.colorRepository.getOne(id);

    if (color instanceof Error) {
      return new Error(color.message);
    }

    return color;
  }
}
