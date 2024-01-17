import { Movement } from "../../../entities/Movement";
import { IMovementRepository } from "../../../repositories/Interfaces/IMovementRepository";
import { IItemRepository } from "../../../repositories/Interfaces/IItemRepository";
import { ITypeMovementRepository } from "../../../repositories/Interfaces/ITypeMovementRepository";
import { Item } from "../../../entities/Item";
import { TypeMovement } from "../../../entities/TypeMovement";

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
    if (quantity <= 0) {
      return new Error("Quantity cannot be less than or equal to zero");
    }
    if (!description) {
      return new Error("Request missing arguments: description");
    }
    if (!quantity) {
      return new Error("Request missing arguments: quantity");
    }
    if (!type_movement_id) {
      return new Error("Request missing arguments: type_movement_id");
    }
    if (!item_id) {
      return new Error("Request missing arguments: item_id");
    }
    const typeMovement = await this.typeMovementRepository.getOne(
      type_movement_id
    );
    if (typeMovement instanceof Error) {
      return new Error(typeMovement.message);
    }
    const movement = await this.movementRepository.getOne(id);

    // Realiza o rollback das movimentações dentro do Item
    // se for entrada ele remove a quantidade do movimento
    // se for saida ele adiciona a quantidade do movimento
    if (movement instanceof Movement) {
      const movements = await this.movementRepository.getAllMovItem(
        movement.item_id
      );
      const lastMov = movements[movements.length - 1];

      if (lastMov.id !== movement.id) {
        return new Error("It is only possible to update the last movement");
      }
      if (type_movement_id !== movement.type_movement_id) {
        return new Error("It is not possible to change the type of movement");
      }
      if (item_id !== movement.item_id) {
        return new Error("It is not possible to change the item");
      }
      if (typeMovement.code == "1") {
        let rollback = await this.itemRepository.removeEstoque(
          item_id,
          movement.quantity
        );
        if (rollback instanceof Error) {
          return new Error(rollback.message);
        }
      } else if (typeMovement.code == "2") {
        let rollback = await this.itemRepository.addEstoque(
          item_id,
          movement.quantity
        );
        if (rollback instanceof Error) {
          return new Error(rollback.message);
        }
      }
    }

    const item = await this.itemRepository.getOne(item_id);
    if (item instanceof Error) {
      return new Error(item.message);
    }
    let item_estoque = 0;
    let item_estoque_ant = item.estoque;

    if (typeMovement instanceof TypeMovement && item instanceof Item) {
      if (typeMovement.code == "1") {
        let result = await this.itemRepository.addEstoque(item_id, quantity);
        item_estoque = (item instanceof Item ? item.estoque : 0) + quantity;
        if (result instanceof Error) {
          return new Error(result.message);
        }
      } else if (typeMovement.code == "2") {
        let result = await this.itemRepository.removeEstoque(item_id, quantity);
        item_estoque = (item instanceof Item ? item.estoque : 0) - quantity;
        if (result instanceof Error) {
          return new Error(result.message);
        }
      }
    }
    const result = await this.movementRepository.update({
      id,
      description,
      quantity,
      type_movement_id,
      item_id,
      item_estoque,
      item_estoque_ant,
    });

    if (result instanceof Error) {
      return new Error(result.message);
    }

    return result;
  }
}
