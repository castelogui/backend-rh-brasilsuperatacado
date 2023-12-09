import { Color } from "../../../entities/Color";
import { IColorRepository } from "../../../repositories/Interfaces/IColorRepository";

type ColorRequest = {
  name: string;
  description: string;
  hexadecimal: string;
};

export class CreateColorService {
  constructor(private colorRepository: IColorRepository) {}

  async execute({
    name,
    description,
    hexadecimal,
  }: ColorRequest): Promise<Color | Error> {
    const result = await this.colorRepository.exists({
      name,
      hexadecimal,
    });

    if (result[0]) {
      return new Error("There is already a color with this name");
    }
    if (result[1]) {
      return new Error("There is already a color with this hexadecimal");
    }

    const color = this.colorRepository.create({
      name,
      description,
      hexadecimal,
    });

    return color;
  }
}
