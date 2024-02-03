import { IDeparmentRepository } from "../../../repositories/Interfaces/IDepartmentRepository";

export class DeleteDepartmentService {
  constructor(private departmentRepository: IDeparmentRepository) {}
  async execute(id: string): Promise<Error | void> {
    const result = await this.departmentRepository.delete(id);

    if (result == false) {
      return new Error("Department does not exists");
    }
    return;
  }
}
