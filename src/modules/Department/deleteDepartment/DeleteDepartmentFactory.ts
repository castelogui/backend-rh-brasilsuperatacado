import { DepartmentRepository } from "../../../repositories/repositories/DepartmentRepository";
import { DeleteDepartmentController } from "./DeleteDepartmentController";
import { DeleteDepartmentService } from "./DeleteDepartmentService";

export const deleteDepartmentFactory = () => {
  const departmentRepository = new DepartmentRepository();
  const deleteDepartment = new DeleteDepartmentService(departmentRepository);
  const deleteDepartmentController = new DeleteDepartmentController(
    deleteDepartment
  );
  return deleteDepartmentController;
};
