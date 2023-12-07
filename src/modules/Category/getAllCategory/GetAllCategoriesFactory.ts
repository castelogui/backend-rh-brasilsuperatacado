import { CategoryRepository } from "../../../repositories/typeorm/CategoryRepository";
import { GetAllCategoriesController } from "./GetAllCategoriesController";
import { GetAllCategoriesService } from "./GetallCategoriesService";

export const getAllCategoryFactory = () => {
  const categoryRepository = new CategoryRepository();
  const getAllCategory = new GetAllCategoriesService(categoryRepository);
  const getAllCategoryController = new GetAllCategoriesController(
    getAllCategory
  );
  return getAllCategoryController;
};
