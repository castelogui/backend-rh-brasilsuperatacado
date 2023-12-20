import { AppDataSource } from "../../database/AppDataSource";
import { Movement } from "../../entities/Movement";
import { IMovementRepository } from "../Interfaces/IMovementRepository";

const repository = AppDataSource.getRepository(Movement);

export class MovementRepository implements IMovementRepository {
  async create({
    description,
    quantity,
    type_movement_id,
    item_id,
  }: Movement): Promise<Movement> {
    const movement = repository.create({
      description,
      quantity,
      type_movement_id,
      item_id,
    });

    await repository.save(movement);

    return movement;
  }
  exists(name: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getOne(id: string): Promise<Movement | Error> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Movement[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean | void> {
    throw new Error("Method not implemented.");
  }
  update({
    id,
    description,
    quantity,
    type_movement_id,
    item_id,
  }: {
    id: any;
    description: any;
    quantity: any;
    type_movement_id: any;
    item_id: any;
  }): Promise<Movement | Error> {
    throw new Error("Method not implemented.");
  }
}
