import { Request, Response } from "express";
import { GetAllMovementService } from "./GetAllMovementService";

export class GetAllMovementController {
  constructor(private getAllMovement: GetAllMovementService) {}
  async handle(req: Request, res: Response) {
    const movements = await this.getAllMovement.execute();

    return res.json(movements);
  }
}
