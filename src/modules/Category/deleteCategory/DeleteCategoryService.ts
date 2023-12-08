import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";

export class DeleteCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<Error | void> {
    const result = await this.categoryRepository.delete(id);

    if (result == false) {
      return new Error("Category does not exists");
    }
    return;
  }
}
