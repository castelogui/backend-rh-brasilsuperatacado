import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";

type CategoryUpdateRequest = {
  id: string;
  name: string;
  description: string;
};

export class UpdateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({ id, name, description }: CategoryUpdateRequest) {
    const category = await this.categoryRepository.update({
      id,
      name,
      description,
    });

    if (category instanceof Error) {
      return new Error(category.message);
    }

    return category;
  }
}
