import { Request, Response } from "express";
import { CreateItemService } from "./CreateItemService";

export class CreateItemController {
  constructor(private createItem: CreateItemService) {}
  async handle(req: Request, res: Response) {
    const { name, description, estoque, status, category_id, color_id, size } =
      req.body;

    const result = await this.createItem.execute({
      name,
      description,
      estoque,
      status,
      category_id,
      color_id,
      size,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
