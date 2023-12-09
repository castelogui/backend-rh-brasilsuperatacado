import { Color } from "../../entities/Color";

export interface IColorRepository {
  create({ name, description, hexadecimal }): Promise<Color>;
  exists({ name, hexadecimal }): Promise<Object>;
  getOne(id: string): Promise<Color | Error>;
  getAll(): Promise<Color[]>;
  delete(id: string): Promise<boolean | void>;
  update({ id, name, description, hexadecimal }: Color): Promise<Color | Error>;
}
