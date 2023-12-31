import { AppDataSource } from "../../database/AppDataSource";
import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../Interfaces/ICategoryRepository";

const repository = AppDataSource.getRepository(Category);

export class CategoryRepository implements ICategoryRepository {
  async exists(name: string): Promise<boolean> {
    const category = await repository.findOneBy({
      name,
    });
    return !!category;
  }
  async create({ name, description }): Promise<Category> {
    const category = repository.create({
      name,
      description,
    });

    await repository.save(category);

    return category;
  }

  async getAll(): Promise<Category[]> {
    const categories = await repository.find();

    return categories;
  }

  async delete(id: string): Promise<boolean> {
    const category = await repository.findOneBy({ id });

    if (!category) {
      return false;
    }
    await repository.remove(category);
    return;
  }

  async getOne(id: string): Promise<Category | Error> {
    const category = await repository.findOneBy({ id });

    if (!!category == false) {
      return new Error("Category does not exists");
    }

    return category;
  }

  async update({ id, name, description }): Promise<Category | Error> {
    const category = await repository.findOneBy({ id });
    const categoryAlreadyExists = await this.exists(name)

    if(categoryAlreadyExists){
      return new Error("There is already a category registered with this name")
    }

    if (!!category == false) {
      return new Error("Category does not exists");
    }

    category.name = name ? name : category.name;
    category.description = description ? description : category.description;

    await repository.save(category);

    return category;
  }
}
