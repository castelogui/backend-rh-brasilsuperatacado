import { Request, Response } from "express";
import { DeleteItemService } from "./DeleteItemService";

export class DeleteItemController {
  constructor(private deleteItem: DeleteItemService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const result = this.deleteItem.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).end();
  }
}
