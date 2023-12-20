import { Request, Response } from "express";
import { UpdateMovementService } from "./UpdateMovementService";

export class UpdateMovementController {
  constructor(private updateMovement: UpdateMovementService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { description, quantity, type_movement_id, item_id } = req.body;

    const result = await this.updateMovement.execute({
      id,
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
