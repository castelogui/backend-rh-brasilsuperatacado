import { Request, Response } from "express";
import { UpdateItemService } from "./UpdateItemService";

export class UpdateItemController {
  constructor(private updateItem: UpdateItemService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, estoque, status, category_id, color_id, size } =
      req.body;

    const result = await this.updateItem.execute({
      id,
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
