import { AppDataSource } from "../../database/AppDataSource";
import { Color } from "../../entities/Color";
import { IColorRepository } from "../Interfaces/IColorRepository";

const repository = AppDataSource.getRepository(Color);

export class ColorRepository implements IColorRepository {
  async exists({ name, hexadecimal }): Promise<Boolean[]> {
    const result_name = await repository.findOneBy({ name });
    const result_hexadecimal = await repository.findOneBy({ hexadecimal });
    return [ !!result_name, !!result_hexadecimal ];
  }
  async create({ name, description, hexadecimal }: Color): Promise<Color> {
    const colorCreated = repository.create({
      name,
      description,
      hexadecimal,
    });

    await repository.save(colorCreated);
    return colorCreated;
  }
  async getAll(): Promise<Color[]> {
    const colors = await repository.find();

    return colors;
  }
  async delete(id: string): Promise<boolean | void> {
    const color = await repository.findOneBy({ id });
    if (!color) {
      return false;
    }
    await repository.remove(color);
    return;
  }
  async getOne(id: string): Promise<Color | Error> {
    const color = await repository.findOneBy({ id });

    if (!!color == false) {
      return new Error("Color does not exists");
    }

    return color;
  }
  async update({ id, name, description, hexadecimal }): Promise<Color | Error> {
    const colorUpdate = await repository.findOneBy({id})
    const colorAlreadyExists = await this.exists({name, hexadecimal})

    if(colorAlreadyExists[0]){
      return new Error("There is already a color registered with this name")
    }

    if(colorAlreadyExists[1]){
      return new Error("There is already a color registered with this hexadecimal")
    }

    if(!!colorUpdate == false){
      return new Error("Color does not exists")
    }

    colorUpdate.name = name ? name : colorUpdate.name
    colorUpdate.description = description ? description : colorUpdate.description
    colorUpdate.hexadecimal = hexadecimal ? hexadecimal : colorUpdate.hexadecimal

    await repository.save(colorUpdate)

    return colorUpdate
  }
}
