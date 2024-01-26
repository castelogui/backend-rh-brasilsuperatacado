import { Department } from "../../../entities/Department";
import { IDeparmentRepository } from "../../../repositories/Interfaces/IDepartmentRepository";

export class GetAllDepartmentService {
  constructor(private departmentRepository: IDeparmentRepository) {}
  async execute(): Promise<Department[]> {
    const departments = await this.departmentRepository.getAll();

    return departments;
  }
}
