import { DepartmentRepository } from "../../../repositories/repositories/DepartmentRepository";
import { UpdateDepartmentController } from "./UpdateDepartmentController";
import { UpdateDepartmentService } from "./UpdateDepartmentService";

export const updateDepartmentFactory = () => {
  const departmentRepository = new DepartmentRepository();
  const updateDepartment = new UpdateDepartmentService(departmentRepository);
  const updateDepartmentController = new UpdateDepartmentController(
    updateDepartment
  );
  return updateDepartmentController;
};
