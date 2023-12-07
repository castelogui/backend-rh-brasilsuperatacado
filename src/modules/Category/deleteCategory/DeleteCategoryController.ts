import { Request, Response } from "express";
import { DeleteCategoryService } from "./DeleteCategoryService";

export class DeleteCategoryController {
  constructor(private deleteCategory: DeleteCategoryService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.deleteCategory.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).end();
  }
}
