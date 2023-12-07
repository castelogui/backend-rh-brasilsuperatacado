import { Category } from "../../../entities/Category";
import { ICategoryRepository } from "../../../repositories/ICategoryRepositories";

export class GetAllCategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}
  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.getAll();

    return categories;
  }
}
