import { Request, Response } from "express";
import { GetOneCategoriesService } from "./GetOneCategoryService";

export class GetOneCategoryController {
  constructor(private getOneCategory: GetOneCategoriesService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const category = await this.getOneCategory.execute(id);

    if (category instanceof Error) {
      return res.status(400).json(category.message);
    }

    return res.json(category);
  }
}
