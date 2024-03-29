import { Department } from "../../entities/Department";

export interface IDeparmentRepository {
  create({ id, code, name, description }): Promise<Department>;
  exists(name: string): Promise<boolean>;
  getOne(id: string): Promise<Department | Error>;
  getAll(): Promise<Department[]>;
  delete(id: string): Promise<boolean | void>;
  update({ id, code, name, description }): Promise<Department | Error>;
  existsItem(id: string): Promise<boolean>
}
