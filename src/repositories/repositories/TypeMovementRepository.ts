import { AppDataSource } from "../../database/AppDataSource";
import { TypeMovement } from "../../entities/TypeMovement";
import { ITypeMovementRepository } from "../Interfaces/ITypeMovementRepository";

const repository = AppDataSource.getRepository(TypeMovement);

export class TypeMovementRepository implements ITypeMovementRepository {
  async create({
    code,
    type,
    description,
  }: TypeMovement): Promise<TypeMovement | Error> {
    const typeMovement = repository.create({ code, type, description });

    await repository.save(typeMovement);

    const returnTypeMovement = await this.getOne(typeMovement.id);

    return returnTypeMovement;
  }
  async exists({ code, type }): Promise<boolean> {
    const typeMovement = await repository.findOneBy({ code, type });

    console.log(typeMovement);

    return !!typeMovement;
  }
  async getOne(id: string): Promise<TypeMovement | Error> {
    const typeMovement = await repository.findOneBy({ id });

    if (!!typeMovement == false) {
      return new Error("Type movement does not exists");
    }

    return typeMovement;
  }
  async getAll(): Promise<TypeMovement[]> {
    const typeMovements = await repository.find();

    return typeMovements;
  }
  async delete(id: string): Promise<boolean | void> {
    const typeMovement = await repository.findOneBy({ id });

    if (!typeMovement) {
      return false;
    }

    await repository.remove(typeMovement);

    return;
  }
  async update({ id, code, type, description }): Promise<TypeMovement | Error> {
    const typeMovement = await repository.findOneBy({ id });

    if (!!typeMovement == false) {
      return new Error("Type Movement does not exists");
    }

    typeMovement.code = code ? code : typeMovement.code;
    typeMovement.type = type ? type : typeMovement.type;
    typeMovement.description = description
      ? description
      : typeMovement.description;

    await repository.save(typeMovement);

    return typeMovement;
  }
}
