import { DepartmentRepository } from "../../../repositories/repositories/DepartmentRepository";
import { CreateDepartmentController } from "./CreateDepartmentController";
import { CreateDepartmentService } from "./CreateDepartmentService";

export const createDepartmentFactory = () => {
  const departmentRepository = new DepartmentRepository()
  const createDepartment = new CreateDepartmentService(departmentRepository);
  const createDepartmentController = new CreateDepartmentController(createDepartment);
  return createDepartmentController;
}