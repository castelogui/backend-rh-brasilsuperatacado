import { Request, Response } from "express";
import { GetOneColorService } from "./GetOneColorService";

export class GetOneColorController {
  constructor(private getOneColor: GetOneColorService) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const color = await this.getOneColor.execute(id);

    color instanceof Error
      ? res.status(400).json(color.message)
      : res.json(color);
  }
}
