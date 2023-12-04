import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/category/UpdateCategoryService";

export class UpdateCategoryController {
  async handle(req: Request, res: Response) {
    const { id, name, description } = req.body;

    const service = new UpdateCategoryService();

    const result = await service.execute({ id, name, description });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
