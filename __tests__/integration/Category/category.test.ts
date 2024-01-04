import supertest from "supertest";
import { Category } from "../../../src/entities/Category";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/database/AppDataSource";
import { CategoryMock } from "../../mocks/mockEntities";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";

function parseResponse(response: any, type: string) {
  return JSON.parse(response.text.substring(response.text.indexOf(type)));
}
const categoryRepository = AppDataSource.getRepository(Category);
const mockAppDataSource = new MockAppDataSource()

beforeAll(async () => {
  await mockAppDataSource.connect();
});
describe("Category => create", () => {
  it("should be create a new category", async () => {
    const category = new CategoryMock().category_1();

    const response = await supertest(app).post("/categories").send(category);

    expect(response.status).toBe(200);
    expect(response.text).toContain("id");
    expect(response.text).toContain("name");
    expect(response.text).toContain("description");
    expect(response.text).toContain("created_at");
  });
  it("should be to create a new category and return with the id equal to the one sent", async () => {
    const category = new CategoryMock().category_2();

    const response = await supertest(app).post("/categories").send(category);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(category.id);
    expect(response.text).toContain("id");
    expect(response.text).toContain("name");
    expect(response.text).toContain("description");
    expect(response.text).toContain("created_at");
  });
  it("shouldn't let a category with the same name be created", async () => {
    const category = new CategoryMock().category_1();

    const response = await supertest(app).post("/categories").send(category);

    expect(response.status).toBe(400);
    expect(response.text).toBe('"Category already exists"');
  });

  it("should create a category with just the name", async () => {
    const category = new CategoryMock().category_3();

    const response = await supertest(app).post("/categories").send(category);

    expect(response.status).toBe(200);
    expect(response.text).toContain("id");
    expect(response.text).toContain("name");
    expect(response.text).toContain("description");
    expect(response.text).toContain("created_at");
  });

  it("should return an error if the name field does not exist", async () => {
    const category = categoryRepository.create();
    const response = await supertest(app).post("/categories").send(category);

    expect(response.status).toBe(400);
    expect(response.text).toContain('"Request missing arguments: name"');
  });
});
describe("Category => get", () => {
  it("should return a category", async () => {
    const category = new CategoryMock().category_4();

    const created = await supertest(app).post("/categories").send(category);
    const id = parseResponse(created, "{").id;

    const response = await supertest(app).get(`/categories/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("created_at");
  });
  it("should return a list of categories", async () => {
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
  it("should not return any category, should return an error", async () => {
    const response = await supertest(app).get("/categories/123");

    expect(response.status).toBe(400);
    expect(response.text).toBe('"Category does not exists"');
  });
});
describe("Category => update", () => {
  it("should not update the category if the id is incorrect", async () => {
    const responseUpdate = await supertest(app).put("/categories/123456");

    expect(responseUpdate.status).toBe(400);
    expect(responseUpdate.text).toBe('"Category does not exists"');
  });
  it("should not update the category with an already existing name", async () => {
    const category = new CategoryMock().category_5();

    await supertest(app)
      .post("/categories")
      .send(category);

    const responseUpdate = await supertest(app)
      .put(`/categories/${category.id}`)
      .send({
        name: "Calça",
      });

    expect(responseUpdate.status).toBe(400);
    expect(responseUpdate.text).toBe(
      '"There is already a category registered with this name"'
    );
  });
  it("should update the category", async () => {
    const nameUpdate = "Name: Camisa Social Admin";
    const descriptionUpdate = "Description: Camisa Social Admin";
    const category = categoryRepository.create({
      name: "Calça Jeans",
    });
    const responseCreate = await supertest(app)
      .post("/categories")
      .send(category);

    const id = parseResponse(responseCreate, "{").id;

    const responseUpdate = await supertest(app).put(`/categories/${id}`).send({
      name: nameUpdate,
      description: descriptionUpdate,
    });
    const categoryUpdate: Category = parseResponse(responseUpdate, "{");

    expect(responseUpdate.status).toBe(200);
    expect(categoryUpdate.name).toEqual(nameUpdate);
    expect(categoryUpdate.description).toEqual(descriptionUpdate);
  });
});
describe("Category => delete", () => {
  it("shouldn't delete a category with the incorrect id", async () => {
    const response = await supertest(app).delete("/categories/123");

    expect(response.status).toBe(400);
    expect(response.text).toContain('"Category does not exists"');
  });
  it("should delete a category", async () => {
    const category = categoryRepository.create({
      name: "Categoria para deletar",
    });
    const responseCreate = await supertest(app)
      .post("/categories")
      .send(category);
    const id = parseResponse(responseCreate, "{").id;
    const responseDelete = await supertest(app).delete(`/categories/${id}`);

    expect(responseDelete.status).toBe(204);
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
