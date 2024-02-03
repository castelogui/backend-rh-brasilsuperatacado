import { Request, Response } from "express";
import { DeleteDepartmentService } from "./DeleteDepartmentService";

export class DeleteDepartmentController {
  constructor(private deleteDepartment: DeleteDepartmentService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.deleteDepartment.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).end();
  }
}
