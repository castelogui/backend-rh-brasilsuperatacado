import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";

export class DeleteCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<Error | void> {
    const itemExistsCategory = await this.categoryRepository.existsItem(id);
    if (itemExistsCategory) {
      return new Error("This category has linked items and cannot be deleted");
    }
    const result = await this.categoryRepository.delete(id);

    if (result == false) {
      return new Error("Category does not exists");
    }
    return;
  }
}
