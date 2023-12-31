import { Request, Response } from "express";
import { CreateCategoryService } from "./CreateCategoryService";

export class CreateCategoryController {
  constructor(private createCategory: CreateCategoryService) {}
  async handle(req: Request, res: Response) {
    const { id, name, description } = req.body;

    const result = await this.createCategory.execute({ id, name, description });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
