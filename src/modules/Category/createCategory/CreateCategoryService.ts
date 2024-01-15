import { Category } from "../../../entities/Category";
import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";

type CategoryRequest = {
  id: string;
  name: string;
  description: string;
};

export class CreateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({
    id,
    name,
    description,
  }: CategoryRequest): Promise<Category | Error> {
    if (!name || name == undefined || name == "" || name == null) {
      return new Error("Request missing arguments: name");
    }

    if (!description || description == undefined || description == "") {
      description = String(name).toLowerCase();
    }

    const categoryAlreadyExists = await this.categoryRepository.exists(name);

    if (categoryAlreadyExists) {
      return new Error("Category already exists");
    }

    const category = this.categoryRepository.create({
      id,
      name,
      description,
    });

    return category;
  }
}
