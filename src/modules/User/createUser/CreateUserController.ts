import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  constructor(private createUser: CreateUserService) {}
  async handle(req: Request, res: Response) {
    const { id, username, name, password } = req.body;

    const result = await this.createUser.execute({
      id,
      username,
      name,
      password,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }
    return res.json(result);
  }
}
