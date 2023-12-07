import { Request, Response } from "express";
import { GetAllCategoriesService } from "./GetallCategoriesService";

export class GetAllCategoriesController {
  constructor(private getAllCategory: GetAllCategoriesService) {}
  async handle(req: Request, res: Response) {
    const categories = await this.getAllCategory.execute();

    return res.json(categories);
  }
}
