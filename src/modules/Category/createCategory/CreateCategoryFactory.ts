import { CategoryRepository } from "../../../repositories/repositories/CategoryRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryService } from "./CreateCategoryService";

export const createCategoryFactory = () => {
  const categoryRepository = new CategoryRepository();
  const createCategory = new CreateCategoryService(categoryRepository);
  const createCategoryController = new CreateCategoryController(createCategory);
  return createCategoryController;
};
