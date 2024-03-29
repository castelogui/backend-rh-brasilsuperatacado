import supertest from "supertest";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/database/AppDataSource";
import { Color } from "../../../src/entities/Color";
import { ColorMock } from "../../mocks/mockEntities";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";

const mockAppDataSource = new MockAppDataSource();

function expect200(response: any) {
  return Object.keys(response.body).forEach((key) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(key);
    expect(response.body[key]).not.toBeNull();
  });
}
const colorRepository = AppDataSource.getRepository(Color);

beforeAll(async () => {
  await mockAppDataSource.connect();
});
describe("Color => create", () => {
  it("should be create a new color", async () => {
    let color = new ColorMock().color_1();

    let response = await supertest(app).post("/colors").send(color);

    expect200(response);
    expect(response.body.name).toEqual(color.name);
    expect(response.body.hexadecimal).toEqual(color.hexadecimal);
  });
  it("should be to create a new color and return with the id equal to the one sent", async () => {
    let color = new ColorMock().color_2();

    let response = await supertest(app).post("/colors").send(color);

    expect200(response);
    expect(response.body.id).toEqual(color.id);
    expect(response.body.name).toEqual(color.name);
    expect(response.body.hexadecimal).toEqual(color.hexadecimal);
  });
  it("shouldn't let a color with the same name be created", async () => {
    let color = new ColorMock().color_1();

    let response = await supertest(app).post("/colors").send(color);

    expect(response.status).toBe(400);
    expect(response.body).toEqual("There is already a color with this name");
  });
  it("shouldn't let a color with the same hexadecimal be created", async () => {
    let color = colorRepository.create({
      name: "Azul claro",
      hexadecimal: "#00f",
    });

    let response = await supertest(app).post("/colors").send(color);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      "There is already a color with this hexadecimal"
    );
  });
  it("the name argument must not be missing when creating a new color", async () => {
    const response = await supertest(app)
      .post("/colors")
      .send({ hexadecimal: "#fff" });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: name");
  });
  it("the hexadecimal argument must not be missing when creating a new color", async () => {
    const response = await supertest(app)
      .post("/colors")
      .send({ name: "Cor teste" });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: hexadecimal");
  });
  it("empty arguments should not be sent when creating a new color", async () => {
    const response = await supertest(app).post("/colors").send({});

    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: name");
  });
});
describe("Color => get", () => {
  it("should return a color", async () => {
    const color = new ColorMock().color_4();
    const created = await supertest(app).post("/colors").send(color);

    const response = await supertest(app).get(`/colors/${created.body.id}`);

    expect200(response);
  });
  it("should return a list colors", async () => {
    const colors = await supertest(app).get("/colors");

    expect(colors.status).toBe(200);
    expect(Array.isArray(colors.body)).toBe(true);
    colors.body.forEach((obj: any) => {
      Object.keys(obj).forEach((key) => {
        expect(obj).toHaveProperty(key);
        expect(obj[key]).not.toBeNull();
      });
    });
  });
  it("should not return any color with id incorrect", async () => {
    const response = await supertest(app).get("/colors/123");

    expect(response.status).toBe(400);
    expect(response.text).toBe('"Color does not exists"');
  });
});
describe("Color => update", () => {
  it("should not update color if the id is incorrect", async () => {
    const responseUpdate = await supertest(app).put("/colors/1234");

    expect(responseUpdate.status).toBe(400);
    expect(responseUpdate.text).toBe('"Color does not exists"');
  });
  it("should not update color with an already exists name", async () => {
    const color = new ColorMock().color_5();
    await supertest(app).post("/colors").send(color);

    const responseUpdate = await supertest(app)
      .put(`/colors/${color.id}`)
      .send({
        name: "Azul",
      });

    expect(responseUpdate.status).toBe(400);
    expect(responseUpdate.body).toBe(
      "There is already a color registered with this name"
    );
  });
  it("should not update color with an already exists hexadecimal", async () => {
    const created = await supertest(app)
      .post("/colors")
      .send({ name: "Branco", hexadecimal: "#fff" });

    const responseUpdate = await supertest(app)
      .put(`/colors/${created.body.id}`)
      .send({
        hexadecimal: "#00f",
      });
    expect(responseUpdate.status).toBe(400);
    expect(responseUpdate.body).toBe(
      "There is already a color registered with this hexadecimal"
    );
  });
});
describe("Color => delete", () => {
  describe("delete with invalid id", () => {
    it("a color should not be excluded when sending invalid id", async () => {
      const response = await supertest(app).delete("/colors/invalid-id-123");

      expect(response.status).toBe(400);
      expect(response.body).toBe("Color does not exists");
    });
    it("a color should not be excluded when sending null id", async () => {
      const response = await supertest(app).delete("/colors/");

      expect(response.status).toBe(404);
      expect(response.text).toContain(
        "This route is invalid or does not exist"
      );
    });
  });
  describe("delete with id correct", () => {
    it("a color must be deleted if the ID is correct", async () => {
      const color = await supertest(app)
        .post("/colors")
        .send({ name: "Branco branco", hexadecimal: "#0f0f0f" });

      const response = await supertest(app).delete(`/colors/${color.body.id}`);

      expect(response.status).toBe(204);
    });
    it("should not delete a color if has linked items", async () => {
      const color = await supertest(app)
        .post("/colors")
        .send({ name: "Cor teste para deletar", hexadecimal: "#cortesteparadeletar" });
      const category = await supertest(app)
        .post("/categories")
        .send({ name: "Categoria teste" });
      const item = await supertest(app).post("/items").send({
        name: "Item teste",
        category_id: category.body.id,
        color_id: color.body.id,
        size: "G",
      });

      const response = await supertest(app).delete(`/colors/${color.body.id}`);

      expect(response.status).toBe(400);
      expect(response.body).toBe(
        "This color has linked items and cannot be deleted"
      );
    });
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
