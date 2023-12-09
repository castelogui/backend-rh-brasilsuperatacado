import { Request, Response } from "express";
import { GetAllColorsService } from "./GetAllColorsService";

export class GetAllColorsController {
  constructor(private getAllColors: GetAllColorsService) {}
  async handle(req: Request, res: Response) {
    const colors = await this.getAllColors.execute();

    return res.json(colors);
  }
}
