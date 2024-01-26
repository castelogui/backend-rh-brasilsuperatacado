import { Request, Response } from "express";
import { UpdateDepartmentService } from "./UpdateDepartmentService";

export class UpdateDepartmentController {
  constructor(private updateDepartment: UpdateDepartmentService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, code, description } = req.body;

    const result = await this.updateDepartment.execute({
      id,
      name,
      code,
      description,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
