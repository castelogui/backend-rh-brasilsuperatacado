import { Request, Response } from "express";
import { CreateColorService } from "./CreateColorService";

export class CreateColorController {
  constructor(private createColor: CreateColorService) {}
  async handle(req: Request, res: Response) {
    const { name, description, hexadecimal } = req.body;

    const result = await this.createColor.execute({
      name,
      description,
      hexadecimal,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
