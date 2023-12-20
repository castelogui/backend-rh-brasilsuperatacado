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

    const returnMovement = await this.getOne(movement.id);

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
    const movements = await repository.find({
      relations: ["type_movement", "item"],
    });

    return movements;
  }
  async delete(id: string): Promise<boolean | void> {
    const movement = await repository.findOneBy({ id });

    if (!movement) {
      return false;
    }
    await repository.remove(movement);
    return;
  }
  async update({
    id,
    description,
    quantity,
    type_movement_id,
    item_id,
  }): Promise<Movement | Error> {
    const movement = await repository.findOneBy({ id });

    if (!!movement == false) {
      return new Error("Movement does not exists");
    }

    movement.description = description ? description : movement.description;
    movement.quantity = quantity ? quantity : movement.quantity;
    movement.type_movement_id = type_movement_id
      ? type_movement_id
      : movement.type_movement_id;
    movement.item_id = item_id ? item_id : movement.item_id;
    movement.updated_at = new Date();

    await repository.save(movement);

    const returnMovement = await this.getOne(id);

    return returnMovement;
  }
}
