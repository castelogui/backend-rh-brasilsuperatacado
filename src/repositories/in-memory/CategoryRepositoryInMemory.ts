import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../ICategoryRepositories";
import { v4 as uuid } from "uuid";

export class CategoryRepositoryInMemory implements ICategoryRepository {
  private categories: Category[] = [];

  async create(category: Category): Promise<Category> {
    Object.assign(category, {
      id: uuid(),
      created_at: new Date()
    });

    this.categories.push(category);
    return category;
  }

  async exists(name: string): Promise<boolean> {
    const category = this.categories.some((category) => category.name === name);
    return category;
  }
}
