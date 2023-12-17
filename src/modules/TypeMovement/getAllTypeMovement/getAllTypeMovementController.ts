import { Request, Response } from "express";
import { GetAllTypeMovementService } from "./getAllTypeMovementService";

export class GetAllTypeMovementController {
  constructor(private getAllTypeMovement: GetAllTypeMovementService) {}
  async handle(req: Request, res: Response) {
    const result = await this.getAllTypeMovement.execute();

    res.json(result);
  }
}
