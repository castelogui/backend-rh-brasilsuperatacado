import { Department } from "../../../entities/Department";
import { IDeparmentRepository } from "../../../repositories/Interfaces/IDepartmentRepository";

type DepartmentRequest = {
  id: string;
  code: string;
  name: string;
  description: string;
};

export class CreateDepartmentService {
  constructor(private departmentRepositort: IDeparmentRepository) {}
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

    const department = this.departmentRepositort.create({
      id,
      code,
      name,
      description,
    });

    return department;
  }
}
