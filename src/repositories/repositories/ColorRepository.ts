import { AppDataSource } from "../../database/AppDataSource";
import { Color } from "../../entities/Color";
import { Item } from "../../entities/Item";
import { FormatCustomDate } from "../../utils/formatCustomDate";
import { IColorRepository } from "../Interfaces/IColorRepository";

const repository = AppDataSource.getRepository(Color);
const itemRepository = AppDataSource.getRepository(Item);

export class ColorRepository implements IColorRepository {
  async exists({ name, hexadecimal }): Promise<Boolean[]> {
    const result_name = await repository.findOneBy({ name });
    const result_hexadecimal = await repository.findOneBy({ hexadecimal });
    return [!!result_name, !!result_hexadecimal];
  }
  async create({ id, name, description, hexadecimal }: Color): Promise<Color> {
    const colorCreated = repository.create({
      id,
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
    const colorUpdate = await repository.findOneBy({ id });

    if (!!colorUpdate == false) {
      return new Error("Color does not exists");
    }

    if (name) {
      const color_name = await repository.findOneBy({ name });

      if (!!color_name && color_name.id != id) {
        return new Error("There is already a color registered with this name");
      }
    }
    if (hexadecimal) {
      const color_hexadecimal = await repository.findOneBy({ hexadecimal });

      if (!!color_hexadecimal && color_hexadecimal.id != id) {
        return new Error(
          "There is already a color registered with this hexadecimal"
        );
      }
    }

    colorUpdate.name = name ? name : colorUpdate.name;
    colorUpdate.description = description
      ? description
      : colorUpdate.description;
    colorUpdate.hexadecimal = hexadecimal
      ? hexadecimal
      : colorUpdate.hexadecimal;
    colorUpdate.updated_at = new Date(new FormatCustomDate().dateTimeLocal());

    await repository.save(colorUpdate);

    return colorUpdate;
  }
  async existsItem(id: string): Promise<boolean> {
    const item = await itemRepository.findOne({ where: { color_id: id } });

    return !!item;
  }
}
