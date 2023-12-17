import { TypeMovement } from "../../entities/TypeMovement";

export interface ITypeMovementRepository {
  create({ code, type, description }): Promise<TypeMovement | Error>;
  exists({ code, type }): Promise<boolean[]>;
  getOne(id: string): Promise<TypeMovement | Error>;
  getAll(): Promise<TypeMovement[]>;
  delete(id: string): Promise<boolean | void>;
  update({ id, code, type, description }): Promise<TypeMovement | Error>;
}
