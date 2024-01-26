import { DepartmentRepository } from "../../../repositories/repositories/DepartmentRepository";
import { GetAllDepartmentController } from "./GetAllDepartmentController";
import { GetAllDepartmentService } from "./GetAllDepartmentService";

export const getAllDepartmentFactory = () => {
  const departmentRepository = new DepartmentRepository();
  const getAllDepartment = new GetAllDepartmentService(departmentRepository);
  const getAllDepartmentController = new GetAllDepartmentController(
    getAllDepartment
  );
  return getAllDepartmentController;
};
