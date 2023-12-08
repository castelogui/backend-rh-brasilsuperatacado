import { Size } from "../../entities/Size";

export interface ISizeRepository {
  create({ size, description }): Promise<Size>;
  exists(size: number): Promise<boolean>;
  getOne(id: string): Promise<Size | Error>;
  getAll(): Promise<Size[]>;
  delete(id: string): Promise<boolean | void>;
  update({ id, size, description }): Promise<Size | Error>;
}
