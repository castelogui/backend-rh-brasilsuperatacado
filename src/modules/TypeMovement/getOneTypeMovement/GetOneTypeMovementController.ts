import { Request, Response } from "express";
import { GetOneTypeMovementService } from "./GetOneTypeMovementService";

export class GetOneTypeMovementController {
  constructor(private getOneTypeMovement: GetOneTypeMovementService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.getOneTypeMovement.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
