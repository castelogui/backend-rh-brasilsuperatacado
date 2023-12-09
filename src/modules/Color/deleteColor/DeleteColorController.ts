import { Request, Response } from "express";
import { DeleteColorService } from "./DeleteColorService";

export class DeleteColorController {
  constructor(private deleteColor: DeleteColorService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.deleteColor.execute(id);
    
    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).end();
  }
}
