import { Request, Response } from "express";
import { CreateTypeMovementService } from "./CreateTypeMovementService";

export class CreateTypeMovementController {
  constructor(private createTypeMovement: CreateTypeMovementService) {}
  async handle(req: Request, res: Response) {
    const { code, type, description } = req.body;

    const result = await this.createTypeMovement.execute({ code, type, description });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
