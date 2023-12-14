import { Request, Response } from "express";
import { GetAllItemService } from "./GetAllItemService";

export class GetAllItemController {
  constructor(private getItem: GetAllItemService) {}
  async handle(req: Request, res: Response) {
    const items = await this.getItem.execute();

    return res.json(items);
  }
}
