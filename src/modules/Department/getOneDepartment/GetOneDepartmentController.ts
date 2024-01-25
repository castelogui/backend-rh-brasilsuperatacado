import { Request, Response } from "express";
import { GetOneDepartmentService } from "./GetOneDepartmentService";

export class GetOneDepartmentController {
  constructor(private getOneDepartment: GetOneDepartmentService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.getOneDepartment.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
