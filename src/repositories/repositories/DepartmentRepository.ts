import { AppDataSource } from "../../database/AppDataSource";
import { Department } from "../../entities/Department";
import { IDeparmentRepository } from "../Interfaces/IDepartmentRepository";

const repository = AppDataSource.getRepository(Department);

export class DepartmentRepository implements IDeparmentRepository {
  async create({
    id,
    name,
    code,
    description,
  }: Department): Promise<Department> {
    const department = repository.create({
      id,
      name,
      code,
      description,
    });

    await repository.save(department);

    return department;
  }
  exists(name: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getOne(id: string): Promise<Department | Error> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Department[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean | void> {
    throw new Error("Method not implemented.");
  }
  update({
    id,
    name,
    code,
    description,
  }: Department): Promise<Department | Error> {
    throw new Error("Method not implemented.");
  }
  existsItem(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
