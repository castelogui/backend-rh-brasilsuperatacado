import supertest from "supertest";
import { Category } from "../../../src/entities/Category";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/database/AppDataSource";
import { CategoryMock } from "../../mocks/mockEntities";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";

function parseResponse(response: any, type: string) {
  return JSON.parse(response.text.substring(response.text.indexOf(type)));
}
function expect200(response: any) {
  return Object.keys(response.body).forEach((key) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(key);
    expect(response.body[key]).not.toBeNull();
  });
}
const categoryRepository = AppDataSource.getRepository(Category);
const mockAppDataSource = new MockAppDataSource();

beforeAll(async () => {
  await mockAppDataSource.connect();
});
describe("Category => create", () => {
  it("should be create a new category", async () => {
    const category = new CategoryMock().category_1();

    const response = await supertest(app).post("/categories").send(category);

    expect200(response);
  });
  it("should be to create a new category and return with the id equal to the one sent", async () => {
    const category = new CategoryMock().category_2();

    const response = await supertest(app).post("/categories").send(category);

    expect(response.body.id).toEqual(category.id);
    expect200(response);
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

    expect200(response);
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

    expect200(response);
  });
  it("should return a list of categories", async () => {
    const response = await supertest(app).get("/categories");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((obj: any) => {
      Object.keys(obj).forEach((key) => {
        expect(obj).toHaveProperty(key);
        expect(obj[key]).not.toBeNull();
      });
    });
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

    await supertest(app).post("/categories").send(category);

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

    expect200(responseUpdate);
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
  it("should not delete a category if has linked items", async () => {
    const color = await supertest(app)
      .post("/colors")
      .send({ name: "Azul", hexadecimal: "#00f" });
    const category = await supertest(app)
      .post("/categories")
      .send({ name: "Categoria para testar que não pode ser deletada" });
    const item = await supertest(app).post("/items").send({
      name: "Item teste",
      category_id: category.body.id,
      color_id: color.body.id,
      size: "G",
    });

    const response = await supertest(app).delete(
      `/categories/${category.body.id}`
    );

    expect(response.status).toBe(400);
    expect(response.body).toBe(
      "This category has linked items and cannot be deleted"
    );
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
