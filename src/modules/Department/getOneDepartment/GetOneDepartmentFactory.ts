import { DepartmentRepository } from "../../../repositories/repositories/DepartmentRepository";
import { GetOneDepartmentController } from "./GetOneDepartmentController";
import { GetOneDepartmentService } from "./GetOneDepartmentService";

export const getOneDepartmentFactory = () => {
  const departmentRepository = new DepartmentRepository();
  const getOneDepartment = new GetOneDepartmentService(departmentRepository);
  const getOneDepartmentController = new GetOneDepartmentController(
    getOneDepartment
  );
  return getOneDepartmentController;
};
