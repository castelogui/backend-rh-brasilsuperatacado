import { TypeMovement } from "../../entities/TypeMovement";

export interface ITypeMovementRepository {
  create({ type, description }): Promise<TypeMovement>;
  exists(type: string): Promise<boolean>;
  getOne(id: string): Promise<TypeMovement | Error>;
  getAll(): Promise<TypeMovement[]>;
  delete(id: string): Promise<boolean | void>;
  update({ id, type, description }): Promise<TypeMovement | Error>;
}
