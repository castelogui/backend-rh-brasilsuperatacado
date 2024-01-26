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
  async existsName(name: string): Promise<boolean> {
    const result = await repository.findOneBy({ name });
    return !!result;
  }
  async existsCode(code: string): Promise<boolean> {
    const result = await repository.findOneBy({ code });
    return !!result;
  }
  async getOne(id: string): Promise<Department | Error> {
    const result = await repository.findOneBy({ id });
    if (!result) {
      return new Error("Department does not exists");
    }
    return result;
  }
  async getAll(): Promise<Department[]> {
    const result = await repository.find();
    return result;
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
