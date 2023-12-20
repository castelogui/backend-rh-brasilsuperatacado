import { Request, Response } from "express";
import { DeleteMovementService } from "./DeleteMovementService";

export class DeleteMovementController {
  constructor(private deleteMovement: DeleteMovementService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.deleteMovement.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).end();
  }
}
