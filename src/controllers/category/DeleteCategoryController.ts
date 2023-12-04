import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

export class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteCategoryService();

    const result = await service.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).end();
  }
}
