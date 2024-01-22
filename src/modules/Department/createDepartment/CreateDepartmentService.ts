import { Department } from "../../../entities/Department";
import { IDeparmentRepository } from "../../../repositories/Interfaces/IDepartmentRepository";

type DepartmentRequest = {
  id: string;
  code: string;
  name: string;
  description: string;
};

export class CreateDepartmentService {
  constructor(private departmentRepository: IDeparmentRepository) {}
  async execute({
    id,
    code,
    name,
    description,
  }: DepartmentRequest): Promise<Department | Error> {
    if (!code) {
      return new Error("Request missing arguments: code");
    }
    if (!name) {
      return new Error("Request missing arguments: name");
    }

    if (!description || description == undefined || description == "") {
      description = `${String(name).toLowerCase()} - ${String(
        name
      ).toLowerCase()}`;
    }

    const departmentExistsName = await this.departmentRepository.existsName(
      name
    );
    if (departmentExistsName) {
      return new Error("Department already exists with name");
    }
    const departmentExistsCode = await this.departmentRepository.existsCode(
      code
    );
    if (departmentExistsCode) {
      return new Error("Department already exists with code");
    }

    const department = this.departmentRepository.create({
      id,
      code,
      name,
      description,
    });

    return department;
  }
}
