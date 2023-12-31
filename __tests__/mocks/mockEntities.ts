import { AppDataSource } from "../../src/database/AppDataSource";
import { Category } from "../../src/entities/Category";
import { Color } from "../../src/entities/Color";

const categoryRepository = AppDataSource.getRepository(Category);
const colorRepository = AppDataSource.getRepository(Color);

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

export class ColorMock {
  color_1() {
    return colorRepository.create({ name: "Azul", hexadecimal: "#00f" });
  }
  color_2() {
    return colorRepository.create({ name: "Vermelho", hexadecimal: "#f00" });
  }
  color_3() {
    return colorRepository.create({ name: "Branco", hexadecimal: "#fff" });
  }
  color_4() {
    return colorRepository.create({ name: "Verde", hexadecimal: "#0f0" });
  }
  color_5() {
    return colorRepository.create({ name: "Preto", hexadecimal: "#000" });
  }
  color_6() {
    return colorRepository.create({ name: "Amarelo", hexadecimal: "#0ff" });
  }
}
