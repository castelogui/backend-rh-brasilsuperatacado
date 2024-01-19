import { Request, Response } from "express";
import { CreateDepartmentService } from "./CreateDepartmentService";

export class CreateDepartmentController {
  constructor(private createDepartment: CreateDepartmentService) {}
  async handle(req: Request, res: Response) {
    const { id, code, name, description } = req.body;

    const result = await this.createDepartment.execute({
      id,
      code,
      name,
      description,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
