import { Movement } from "../../../entities/Movement";
import { IMovementRepository } from "../../../repositories/Interfaces/IMovementRepository";
import { IItemRepository } from "../../../repositories/Interfaces/IItemRepository";
import { ITypeMovementRepository } from "../../../repositories/Interfaces/ITypeMovementRepository";

export class UpdateMovementService {
  constructor(
    private movementRepository: IMovementRepository,
    private typeMovementRepository: ITypeMovementRepository,
    private itemRepository: IItemRepository
  ) {}

  async execute({
    id,
    description,
    quantity,
    type_movement_id,
    item_id,
  }): Promise<Movement | Error> {
    try {
      await this.validRequest({
        description,
        quantity,
        type_movement_id,
        item_id,
      });
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
    }
    const item = await this.itemRepository.getOne(item_id);
    if (item instanceof Error) {
      return new Error(item.message);
    }
    const typeMovement = await this.typeMovementRepository.getOne(
      type_movement_id
    );
    if (typeMovement instanceof Error) {
      return new Error(typeMovement.message);
    }
    const result = await this.movementRepository.update({
      id,
      description,
      quantity,
      type_movement_id,
      item_id,
    });

    if (result instanceof Error) {
      return new Error(result.message);
    }

    return result;
  }
  async validRequest({
    description,
    quantity,
    type_movement_id,
    item_id,
  }): Promise<Error | void> {
    return new Promise((resolve, reject) => {
      const checkArgument = (arg, argName) => {
        if (!arg) {
          reject(new Error(`Request missing arguments: ${argName}`));
        }
      };

      try {
        checkArgument(description, "description");
        checkArgument(quantity, "quantity");
        checkArgument(type_movement_id, "type_movement_id");
        checkArgument(item_id, "item_id");
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
