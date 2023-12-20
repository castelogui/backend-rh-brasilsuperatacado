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
  }: Movement): Promise<Movement | Error> {
    const movement = repository.create({
      description,
      quantity,
      type_movement_id,
      item_id,
    });

    await repository.save(movement);

    const returnMovement = await this.getOne(movement.id)

    return returnMovement;
  }
  exists(name: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getOne(id: string): Promise<Movement | Error> {
    const movement = await repository.findOne({
      where: { id },
      relations: ["type_movement", "item"],
    });

    if (!!movement == false) {
      return new Error("Movement does not exists");
    }

    return movement;
  }
  async getAll(): Promise<Movement[]> {
    const movements = await repository.find({relations: ["type_movement", "item"]});

    return movements;
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
