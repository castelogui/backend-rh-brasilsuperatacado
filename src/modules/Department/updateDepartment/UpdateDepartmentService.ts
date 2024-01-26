import { Department } from "../../../entities/Department";
import { IDeparmentRepository } from "../../../repositories/Interfaces/IDepartmentRepository";

type DepartmentRequest = {
  id: string;
  name: string;
  code: string;
  description: string;
};
export class UpdateDepartmentService {
  constructor(private departmentRepository: IDeparmentRepository) {}
  async execute({
    id,
    name,
    code,
    description,
  }: DepartmentRequest): Promise<Department | Error> {
    const department = await this.departmentRepository.update({
      id,
      name,
      code,
      description,
    });

    if (department instanceof Error) {
      return new Error(department.message);
    }

    return department;
  }
}
