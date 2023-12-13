import { Request, Response } from "express";
import { GetOneItemService } from "./GetOneItemService";

export class GetOneItemController {
  constructor(private getOneItem: GetOneItemService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.getOneItem.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
