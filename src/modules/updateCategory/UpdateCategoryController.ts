import { Request, Response } from "express";
import { UpdateCategoryService } from "./UpdateCategoryService";

export class UpdateCategoryController {
  constructor(private updateCategory: UpdateCategoryService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    const result = await this.updateCategory.execute({ id, name, description });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
