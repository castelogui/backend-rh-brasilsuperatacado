import { Request, Response } from "express";
import { GetAllDepartmentService } from "./GetAllDepartmentService";

export class GetAllDepartmentController {
  constructor(private getAllDepartment: GetAllDepartmentService) {}
  async handle(req: Request, res: Response) {
    const result = await this.getAllDepartment.execute();

    return res.json(result);
  }
}
