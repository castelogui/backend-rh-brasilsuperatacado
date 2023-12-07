import { CategoryRepository } from "../../repositories/typeorm/CategoryRepository";
import { GetOneCategoryController } from "./GetOneCategoryController";
import { GetOneCategoriesService } from "./GetOneCategoryService";

export const getOneCategoryFactory = () => {
  const categoryRepository = new CategoryRepository();
  const getOneCategory = new GetOneCategoriesService(categoryRepository);
  const getOneCategoryController = new GetOneCategoryController(getOneCategory);
  return getOneCategoryController;
};
