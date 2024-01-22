import { Movement } from "../../../entities/Movement";
import { IItemRepository } from "../../../repositories/Interfaces/IItemRepository";
import { IMovementRepository } from "../../../repositories/Interfaces/IMovementRepository";
import { ITypeMovementRepository } from "../../../repositories/Interfaces/ITypeMovementRepository";

export class DeleteMovementService {
  constructor(
    private movementRepository: IMovementRepository,
    private typeMovementRepository: ITypeMovementRepository,
    private itemRepository: IItemRepository
  ) {}
  async execute(id: string): Promise<boolean | Error | void> {
    const movement = await this.movementRepository.getOne(id);

    if (movement instanceof Movement) {
      const movements = await this.movementRepository.getAllMovItem(
        movement.item_id
      );
      const lastMov = movements[movements.length - 1];

      if (lastMov.id !== movement.id) {
        return new Error("It is only possible to delete the last movement");
      }

      // Realiza o rollback das movimentações dentro do Item
      // se for entrada ele remove a quantidade do movimento
      // se for saida ele adiciona a quantidade do movimento

      const typeMovement = await this.typeMovementRepository.getOne(
        movement.type_movement_id
      );
      if (typeMovement instanceof Error) {
        return new Error(typeMovement.message);
      }
      if (typeMovement.code == "1") {
        let rollback = await this.itemRepository.removeEstoque(
          movement.item_id,
          movement.quantity
        );
        if (rollback instanceof Error) {
          return new Error(rollback.message);
        }
      } else if (typeMovement.code == "2") {
        let rollback = await this.itemRepository.addEstoque(
          movement.item_id,
          movement.quantity
        );
        if (rollback instanceof Error) {
          return new Error(rollback.message);
        }
      }
    }
    const result = await this.movementRepository.delete(id);

    if (result == false) {
      return new Error("Movement does not Exists");
    }

    return;
  }
}
