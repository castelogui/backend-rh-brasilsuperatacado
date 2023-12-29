import supertest from "supertest";
import { Category } from "../../src/entities/Category";
import { app } from "../../src/app";
import { AppDataSource } from "../../src/database/AppDataSource";

function parseResponse(response: any, type: string) {
  return JSON.parse(response.text.substring(response.text.indexOf(type)));
}

beforeAll(async () => {
  await AppDataSource.initialize();
});
describe("Category => create", () => {
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

    expect(response.status).toBe(400);
    expect(response.text).toBe('"Category already exists"');
  });

  it("should create a category with just the name", async () => {
    const category = AppDataSource.getRepository(Category).create({
      name: "Calça",
    });
    const response = await supertest(app).post("/categories").send(category);

    expect(response.status).toBe(200);
    expect(response.text).toContain("id");
    expect(response.text).toContain("name");
    expect(response.text).toContain("description");
    expect(response.text).toContain("created_at");
  });
});
describe("Category => get", () => {
  it("a list category should be searched", async () => {
    const category = AppDataSource.getRepository(Category).create({
      name: "Botina",
    });
    const created = await supertest(app).post("/categories").send(category);
    const id = parseResponse(created, "{").id;

    const response = await supertest(app).get(`/categories/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("created_at");
  });
  it("a list of categories must be returned", async () => {
    const response = await supertest(app).get("/categories");
    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

    if (Array.isArray(response.body)) {
      response.body.forEach((category: any) => {
        expect(category).toHaveProperty("id");
        expect(category).toHaveProperty("name");
        expect(category).toHaveProperty("description");
        expect(category).toHaveProperty("created_at");
      });
    }
  });
});
afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});
