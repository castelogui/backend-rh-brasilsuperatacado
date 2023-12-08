import { Color } from "../../entities/Color";

export interface IColorRepository {
  create({ color, description, hexadecimal }): Promise<Color>;
  exists({color, hexadecimal}): Promise<boolean>;
  getOne(id: string): Promise<Color | Error>;
  getAll(): Promise<Color[]>;
  delete(id: string): Promise<boolean | void>;
  update({ id, name, description, hexadecimal }): Promise<Color | Error>;
}

