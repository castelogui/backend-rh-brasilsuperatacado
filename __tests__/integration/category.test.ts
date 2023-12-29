import supertest from "supertest";
import { Category } from "../../src/entities/Category";
import { app } from "../../src/app";
import { AppDataSource } from "../../src/database/AppDataSource";

beforeAll(async () => {
  await AppDataSource.initialize();
});
describe("Category", () => {
  it("should be create a new category", async () => {
    const category = AppDataSource.getRepository(Category).create({
      name: "Camisa",
      description: "camisa",
    });
    const response = await supertest(app).post("/categories").send(category);

    expect(response.status).toBe(200);
    expect(response.text).toContain("id");
    expect(response.text).toContain("name");
    expect(response.text).toContain("description");
    expect(response.text).toContain("created_at");
  });

  it("shouldn't let a category with the same name be created", async () => {
    const category = AppDataSource.getRepository(Category).create({
      name: "Camisa",
      description: "camisa",
    });
    const response = await supertest(app).post("/categories").send(category);
    console.log(response.text);

    expect(response.status).toBe(400);
    expect(response.text).toBe('"Category already exists"');
  });

  it("should create a category with just the name", async () => {
    const category = AppDataSource.getRepository(Category).create({
      name: "Calça",
    });
    const response = await supertest(app).post("/categories").send(category);
    console.log(response.text);

    expect(response.status).toBe(200);
    expect(response.text).toContain("id");
    expect(response.text).toContain("name");
    expect(response.text).toContain("description");
    expect(response.text).toContain("created_at");
  });
});
afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});
