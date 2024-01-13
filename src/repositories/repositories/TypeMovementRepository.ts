import { AppDataSource } from "../../database/AppDataSource";
import { TypeMovement } from "../../entities/TypeMovement";
import { ITypeMovementRepository } from "../Interfaces/ITypeMovementRepository";

const repository = AppDataSource.getRepository(TypeMovement);

export class TypeMovementRepository implements ITypeMovementRepository {
  async create({
    id,
    code,
    type,
    description,
  }: TypeMovement): Promise<TypeMovement | Error> {
    const typeMovement = repository.create({ id ,code, type, description });

    await repository.save(typeMovement);

    const returnTypeMovement = await this.getOne(typeMovement.id);

    return returnTypeMovement;
  }
  async exists({ code, type }): Promise<boolean[]> {
    const typeMovement_code = await repository.findOneBy({ code });
    const typeMovement_type = await repository.findOneBy({ type });

    return [!!typeMovement_code, !!typeMovement_type];
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

    if (code) {
      const typeMovement_code = await repository.findOneBy({ code });

      if (!!typeMovement_code && typeMovement_code.id !== id) {
        return new Error("Already exists type movement with code");
      }
    }

    if (type) {
      const typeMovement_type = await repository.findOneBy({ type });

      if (!!typeMovement_type && typeMovement_type.id !== id) {
        return new Error("Already exists type movement with name");
      }
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
