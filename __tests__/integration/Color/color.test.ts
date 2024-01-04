import supertest from "supertest";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/database/AppDataSource";
import { Color } from "../../../src/entities/Color";
import { ColorMock } from "../../mocks/mockEntities";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";

const mockAppDataSource = new MockAppDataSource();

function parseResponse(response: any, type: string) {
  return JSON.parse(response.text.substring(response.text.indexOf(type)));
}

const colorRepository = AppDataSource.getRepository(Color);

beforeAll(async () => {
  await mockAppDataSource.connect();
});
describe("Color => create", () => {
  it("should be create a new color", async () => {
    let color = new ColorMock().color_1();

    let response = await supertest(app).post("/colors").send(color);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("hexadecimal");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body.name).toEqual(color.name);
    expect(response.body.hexadecimal).toEqual(color.hexadecimal);
  });
  it("should be to create a new color and return with the id equal to the one sent", async () => {
    let color = new ColorMock().color_2();

    let response = await supertest(app).post("/colors").send(color);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("hexadecimal");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("created_at");
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
});
describe("Color => get", () => {
  it("should return a color", async () => {
    const color = new ColorMock().color_4();
    const created = await supertest(app).post("/colors").send(color);

    const response = await supertest(app).get(`/colors/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("hexadecimal");
  });
  it("should return a list colors", async () => {
    const colors = await supertest(app).get("/colors");

    expect(colors.status).toBe(200);
    expect(Array.isArray(colors.body)).toBe(true);
  });
  it("should not return any color with id incorrect", async () => {
    const response = await supertest(app).get("/colors/123");

    expect(response.status).toBe(400);
    expect(response.text).toBe('"Color does not exists"');
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
