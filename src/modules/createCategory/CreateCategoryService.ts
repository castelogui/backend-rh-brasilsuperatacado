import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepositories";

type CategoryRequest = {
  name: string;
  description: string;
};

export class CreateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({
    name,
    description,
  }: CategoryRequest): Promise<Category | Error> {
    const categoryAlreadyExists = await this.categoryRepository.exists(name);

    if (categoryAlreadyExists) {
      return new Error("Category already exists");
    }

    const category = this.categoryRepository.create({
      name,
      description
    });

    return category;
  }
}
