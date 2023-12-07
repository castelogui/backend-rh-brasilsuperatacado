import { CategoryRepository } from "../../repositories/typeorm/CategoryRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryService } from "./CreateCategoryService";

export const createCategoryFactory = () => {
  const categoryRepository = new CategoryRepository();
  const createCategory = new CreateCategoryService(categoryRepository);
  const createCategoryController = new CreateCategoryController(createCategory);
  return createCategoryController;
};
