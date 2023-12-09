import { Request, Response } from "express";
import { UpdateColorService } from "./UpdateColorService";

export class UpdateColorController {
  constructor(private updateColor: UpdateColorService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, hexadecimal } = req.body;

    const result = await this.updateColor.execute({
      id,
      name,
      description,
      hexadecimal,
    });

    result instanceof Error
      ? res.status(400).json(result.message)
      : res.json(result);
  }
}
