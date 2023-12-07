import { CategoryRepository } from "../../repositories/typeorm/CategoryRepository";
import { UpdateCategoryController } from "./UpdateCategoryController";
import { UpdateCategoryService } from "./UpdateCategoryService";

export const updateCategoryFactory = () => {
  const categoryRepository = new CategoryRepository();
  const updateCategory = new UpdateCategoryService(categoryRepository);
  const updateCategoryController = new UpdateCategoryController(updateCategory);
  return updateCategoryController;
};
