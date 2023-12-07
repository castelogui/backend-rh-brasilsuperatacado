import { CategoryRepository } from "../../repositories/typeorm/CategoryRepository";
import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryService } from "./DeleteCategoryService";

export const deleteCategoryFactory = () => {
  const categoryRepository = new CategoryRepository();
  const deleteCategory = new DeleteCategoryService(categoryRepository);
  const deleteCategoryController = new DeleteCategoryController(deleteCategory);
  return deleteCategoryController;
};
