import { Request, Response } from 'express';
import { GetOneMovementService } from './GetOneMovementService';

export class GetOneMovementController {
  constructor(private getOneMovement: GetOneMovementService) {}
  async handle(req: Request, res: Response) {
    const {id} = req.params

    const result = await this.getOneMovement.execute(id)

    if(result instanceof Error){
      return res.status(400).json(result.message)
    }

    return res.json(result)
  }
}