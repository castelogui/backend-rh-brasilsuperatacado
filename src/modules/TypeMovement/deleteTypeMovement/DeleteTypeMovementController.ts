import { Request, Response } from "express";
import { DeleteTypeMovementService } from "./DeleteTypeMovementService";

export class DeleteTypeMovementController {
  constructor(private deleteTypeMovement: DeleteTypeMovementService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.deleteTypeMovement.execute(id)

    if(result instanceof Error){
      return res.status(400).json(result.message)
    }

    return res.status(204).end();
  }
}
