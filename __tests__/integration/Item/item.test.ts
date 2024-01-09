import supertest from "supertest";
import { AppDataSource } from "../../../src/database/AppDataSource";
import { Item } from "../../../src/entities/Item";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";
import { app } from "../../../src/app";

function expect200(response: any) {
  return Object.keys(response.body).forEach((key) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(key);
    expect(response.body[key]).not.toBeNull();
  });
}

const mockAppDataSource = new MockAppDataSource();

beforeAll(async () => {
  await mockAppDataSource.connect();
  await supertest(app).post("/categories").send({ id: "1", name: "Camisas" });
  await supertest(app)
    .post("/colors")
    .send({ id: "1", name: "Branca", hexadecimal: "#fff" });
});
describe("Item => create", () => {
  it("should be create a new item", async () => {
    const response = await supertest(app).post("/items").send({
      name: "Camisa",
      category_id: "1",
      color_id: "1",
      size: "G",
    });

    expect200(response);
  });
  it("a new item should not be created if there is already another with the name and size entered", async () => {
    const response = await supertest(app).post("/items").send({
      name: "Camisa",
      category_id: "1",
      color_id: "1",
      size: "G",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe(
      "An item with this name and size already exists"
    );
  });
  it("a new item should not be created if the category ID does not exist", async () => {
    const response = await supertest(app).post("/items").send({
      name: "Camisa",
      category_id: "2",
      color_id: "1",
      size: "G",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Category does not exists");
  });
  it("a new item should not be created if the color ID does not exist", async () => {
    const response = await supertest(app).post("/items").send({
      name: "Camisa",
      category_id: "1",
      color_id: "2",
      size: "G",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Color does not exists");
  });
  it("a new item should not be created if the name property is missing", async () => {
    const response = await supertest(app).post("/items").send({
      category_id: "1",
      color_id: "1",
      size: "G",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: name");
  });
  it("a new item should not be created if the category_id property is missing", async () => {
    const response = await supertest(app).post("/items").send({
      name: "Camisa",
      color_id: "1",
      size: "G",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: category_id");
  });
  it("a new item should not be created if the color_id property is missing", async () => {
    const response = await supertest(app).post("/items").send({
      name: "Camisa",
      category_id: "1",
      size: "G",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: color_id");
  });
  it("a new item should not be created if the size property is missing", async () => {
    const response = await supertest(app).post("/items").send({
      name: "Camisa",
      category_id: "1",
      color_id: "1",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: size");
  });
});
describe("Item => get", () => {
  it("should be not return item if id incorrect", async () => {
    const response = await supertest(app).get("/items/123");

    expect(response.status).toBe(400);
    expect(response.body).toBe("Item does not exists");
  });
  it("should be return one item", async () => {
    const item = await supertest(app).post("/items").send({
      name: "Calça",
      category_id: "1",
      color_id: "1",
      size: "38",
    });

    const response = await supertest(app).get(`/items/${item.body.id}`);

    expect200(response);
  });
  it("should return a list of items", async () => {
    const response = await supertest(app).get("/items");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((obj: any) => {
      Object.keys(obj).forEach((key) => {
        expect(obj).toHaveProperty(key);
        expect(obj[key]).not.toBeNull();
      });
    });
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
