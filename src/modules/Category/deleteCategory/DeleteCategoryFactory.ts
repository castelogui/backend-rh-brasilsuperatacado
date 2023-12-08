import { CategoryRepository } from "../../../repositories/repositories/CategoryRepository";
import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryService } from "./DeleteCategoryService";

export const deleteCategoryFactory = () => {
  const categoryRepository = new CategoryRepository();
  const deleteCategory = new DeleteCategoryService(categoryRepository);
  const deleteCategoryController = new DeleteCategoryController(deleteCategory);
  return deleteCategoryController;
};
