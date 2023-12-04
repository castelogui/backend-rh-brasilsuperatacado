import { AppDataSource } from "../../database/AppDataSource";
import { Category } from "../../entities/Category";

type CategoryUpdateRequest = {
  id: string;
  name: string;
  description: string;
};

export class UpdateCategoryService {
  async execute({ id, name, description }: CategoryUpdateRequest) {
    const repo = AppDataSource.getRepository(Category);

    const category = await repo.findOneBy({ id });

    if (!category) {
      return new Error("Category does not exists");
    }

    category.name = name;
    category.description = description;

    await repo.save(category);

    return category;
  }
}
