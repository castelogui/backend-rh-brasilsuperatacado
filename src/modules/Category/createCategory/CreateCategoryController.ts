import { Request, Response } from "express";
import { CreateCategoryService } from "./CreateCategoryService";

export class CreateCategoryController {
  constructor(private createCategory: CreateCategoryService) {}
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;

    const result = await this.createCategory.execute({ name, description });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
