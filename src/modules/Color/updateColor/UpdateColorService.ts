import { IColorRepository } from "../../../repositories/Interfaces/IColorRepository";

type ColorUpdateRequest = {
  id: string;
  name: string;
  description: string;
  hexadecimal: string;
};

export class UpdateColorService {
  constructor(private colorRepository: IColorRepository) {}

  async execute({ id, name, description, hexadecimal }: ColorUpdateRequest) {
    const color = this.colorRepository.update({
      id,
      name,
      description,
      hexadecimal,
    });

    if (color instanceof Error) {
      return new Error(color.message);
    }

    return color;
  }
}
