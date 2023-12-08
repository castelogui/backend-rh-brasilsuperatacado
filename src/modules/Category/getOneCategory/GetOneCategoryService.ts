import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";

export class GetOneCategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string) {
    const category = await this.categoryRepository.getOne(id);

    if (category instanceof Error) {
      return new Error(category.message);
    }

    return category;
  }
}
