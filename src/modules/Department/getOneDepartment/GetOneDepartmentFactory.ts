import { DepartmentRepository } from "../../../repositories/repositories/DepartmentRepository";
import { GetOneDepartmentController } from "./GetOneDepartmentController";
import { GetOneDepartmentService } from "./GetOneDepartmentService";

export const GetOneDepartmentFactory = () => {
  const departmentRepository = new DepartmentRepository();
  const getOneDepartment = new GetOneDepartmentService(departmentRepository);
  const getOneDepartmentController = new GetOneDepartmentController(
    getOneDepartment
  );
  return getOneDepartmentController;
};
