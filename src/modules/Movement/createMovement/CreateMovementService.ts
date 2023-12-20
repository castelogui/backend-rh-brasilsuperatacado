import { Movement } from "../../../entities/Movement";
import { IMovementRepository } from "../../../repositories/Interfaces/IMovementRepository";
import { Item } from "../../../entities/Item";
import { IItemRepository } from "../../../repositories/Interfaces/IItemRepository";
import { TypeMovement } from "../../../entities/TypeMovement";
import { ITypeMovementRepository } from "../../../repositories/Interfaces/ITypeMovementRepository";

type MovementRequest = {
  description: string;
  quantity: number;
  type_movement_id: string;
  item_id: string;
};

export class CreateMovementService {
  constructor(
    private movementRepository: IMovementRepository,
    private itemRepository: IItemRepository,
    private typeMovementRepository: ITypeMovementRepository
  ) {}
  async execute({
    description,
    quantity,
    type_movement_id,
    item_id,
  }: MovementRequest): Promise<Movement | Error> {
    const item = await this.itemRepository.getOne(item_id);
    const typeMovement = await this.typeMovementRepository.getOne(
      type_movement_id
    );
    let item_estoque = 0

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


    const movement = await this.movementRepository.create({
      description,
      quantity,
      type_movement_id,
      item_id,
      item_estoque,
    });

    return movement;
  }
}
