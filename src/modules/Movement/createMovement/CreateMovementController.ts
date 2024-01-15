import { Request, Response } from "express";
import { CreateMovementService } from "./CreateMovementService";

export class CreateMovementController {
  constructor(private createMovement: CreateMovementService) {}
  async handle(req: Request, res: Response) {
    const { description, quantity, type_movement_id, item_id } = req.body;

    const result = await this.createMovement.execute({
      description,
      quantity,
      type_movement_id,
      item_id,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
