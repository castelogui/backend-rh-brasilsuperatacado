import { Category } from "../../../entities/Category";
import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";

export class GetAllCategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}
  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.getAll();

    return categories;
  }
}
