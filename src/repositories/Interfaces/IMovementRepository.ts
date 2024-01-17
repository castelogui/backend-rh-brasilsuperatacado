import { Movement } from "../../entities/Movement";

export interface IMovementRepository {
  create({
    description,
    quantity,
    type_movement_id,
    item_id,
    item_estoque,
    item_estoque_ant
  }): Promise<Movement | Error>;
  exists(name: string): Promise<boolean>;
  getOne(id: string): Promise<Movement | Error>;
  getAll(): Promise<Movement[]>;
  getAllMovItem(item_id: string): Promise<Movement[]>;
  delete(id: string): Promise<boolean | void>;
  update({
    id,
    description,
    quantity,
    type_movement_id,
    item_id,
    item_estoque,
    item_estoque_ant,
  }): Promise<Movement | Error>;
}
