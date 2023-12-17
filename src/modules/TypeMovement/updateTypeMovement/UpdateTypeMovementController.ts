import { Request, Response } from "express";
import { UpdateTypeMovementService } from "./UpdateTypeMovementService";

export class UpdateTypeMovementController {
  constructor(private updateTypeMovement: UpdateTypeMovementService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { code, type, description } = req.body;

    const result = await this.updateTypeMovement.execute({
      id,
      code,
      type,
      description,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
