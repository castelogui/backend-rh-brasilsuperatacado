import { Department } from "../../../entities/Department";
import { IDeparmentRepository } from "../../../repositories/Interfaces/IDepartmentRepository";

export class GetOneDepartmentService {
  constructor(private departmentRepository: IDeparmentRepository) {}
  async execute(id: string): Promise<Department | Error> {
    const department = await this.departmentRepository.getOne(id);

    if (department instanceof Error) {
      return new Error(department.message);
    }

    return department;
  }
}
