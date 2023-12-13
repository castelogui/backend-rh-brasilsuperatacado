import { Request, Response } from 'express';
import { CreateItemService } from './CreateItemService';

export class CreateItemController {
  constructor(private createItem: CreateItemService) {}
  async handle(req: Request, res: Response) {
    // Implement your logic here
  }
}

