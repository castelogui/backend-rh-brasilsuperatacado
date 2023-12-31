import { AppDataSource } from "../../src/database/AppDataSource";
import { Category } from "../../src/entities/Category";

const categoryRepository = AppDataSource.getRepository(Category);

export class CategoryMock {
  category_1() {
    return categoryRepository.create({ name: "Camisa", description: "" });
  }
  category_2() {
    return categoryRepository.create({ name: "Calça", description: "" });
  }
  category_3() {
    return categoryRepository.create({ name: "Bermuda", description: "" });
  }
  category_4() {
    return categoryRepository.create({ name: "Botina", description: "" });
  }
  category_5() {
    return categoryRepository.create({ name: "Capacete", description: "" });
  }
  category_6() {
    return categoryRepository.create({ name: "Luvas", description: "" });
  }
}
