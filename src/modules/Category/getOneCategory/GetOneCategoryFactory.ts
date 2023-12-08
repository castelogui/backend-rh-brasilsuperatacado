import { CategoryRepository } from "../../../repositories/repositories/CategoryRepository";
import { GetOneCategoryController } from "./GetOneCategoryController";
import { GetOneCategoriesService } from "./GetOneCategoryService";

export const getOneCategoryFactory = () => {
  const categoryRepository = new CategoryRepository();
  const getOneCategory = new GetOneCategoriesService(categoryRepository);
  const getOneCategoryController = new GetOneCategoryController(getOneCategory);
  return getOneCategoryController;
};
