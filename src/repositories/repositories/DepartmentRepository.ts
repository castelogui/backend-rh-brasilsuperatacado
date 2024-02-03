import { AppDataSource } from "../../database/AppDataSource";
import { Department } from "../../entities/Department";
import { FormatCustomDate } from "../../utils/formatCustomDate";
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
  async delete(id: string): Promise<boolean | void > {
    const department = await repository.findOneBy({ id });

    if (!department) {
      return false;
    }
    await repository.remove(department);

    return;
  }
  async update({
    id,
    name,
    code,
    description,
  }: Department): Promise<Department | Error> {
    const department = await repository.findOneBy({ id });
    if (!department) {
      return new Error("Department does not exists");
    }
    if (name) {
      const department_name = await repository.findOneBy({ name });
      if (department_name && department_name.id !== id) {
        return new Error("Already exists one department with name");
      }
    }
    if (code) {
      const department_code = await repository.findOneBy({ code });
      if (department_code && department_code.id !== id) {
        return new Error("Already exists one department with code");
      }
    }
    department.code = code ? code : department.code;
    department.name = name ? name : department.name;
    department.description = description ? description : department.description;
    department.updated_at = new Date(new FormatCustomDate().dateTimeLocal());

    await repository.save(department);

    return department;
  }
  existsUser(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
