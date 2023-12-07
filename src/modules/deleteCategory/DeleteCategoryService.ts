import { ICategoryRepository } from "../../repositories/ICategoryRepositories";

export class DeleteCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<Error | void> {
    const result = await this.categoryRepository.delete(id)

    if (!result) {
      return new Error("Category does not exists");
    }

    await this.categoryRepository.delete(id);
  }
}
