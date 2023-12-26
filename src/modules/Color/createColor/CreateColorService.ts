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
    if (!name || name == undefined || name == "" || name == null) {
      return new Error("Request missing arguments: name");
    }
    if (
      !hexadecimal ||
      hexadecimal == undefined ||
      hexadecimal == "" ||
      hexadecimal == null
    ) {
      return new Error("Request missing arguments: hexadecimal");
    }
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

    if (
      !description ||
      description == undefined ||
      description == "" ||
      description == null
    ) {
      description = `${String(hexadecimal).toUpperCase()} => ${String(
        name
      ).toUpperCase()}`;
    }

    const color = this.colorRepository.create({
      name,
      description,
      hexadecimal,
    });

    return color;
  }
}
