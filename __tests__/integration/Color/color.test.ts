import supertest from "supertest";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/database/AppDataSource";
import { Color } from "../../../src/entities/Color";

function parseResponse(response: any, type: string) {
  return JSON.parse(response.text.substring(response.text.indexOf(type)));
}

const colorRepository = AppDataSource.getRepository(Color);
beforeAll(async () => {
  await AppDataSource.initialize();
});
describe("Color => create", () => {
  it("should be create a new color", async () => {
    const color = colorRepository.create({
      name: "Azul",
      hexadecimal: "#00f",
    });

    const response = await supertest(app).post("/colors").send(color);

    const colorCreate: Color = parseResponse(response, "{");

    expect(response.status).toBe(200);
    expect(colorCreate).toHaveProperty("id");
    expect(colorCreate).toHaveProperty("name");
    expect(colorCreate).toHaveProperty("hexadecimal");
    expect(colorCreate).toHaveProperty("description");
    expect(colorCreate).toHaveProperty("created_at");
    expect(colorCreate.name).toEqual(color.name);
    expect(colorCreate.hexadecimal).toEqual(color.hexadecimal);
  });
  it("shouldn't let a color with the same name be created", async () => {
    const color = colorRepository.create({
      name: "Azul",
      hexadecimal: "#00af",
    });

    const response = await supertest(app).post("/colors").send(color);

    expect(response.status).toBe(400);
    expect(response.body).toEqual("There is already a color with this name");
  });
  it("shouldn't let a color with the same hexadecimal be created", async () => {
    const color = colorRepository.create({
      name: "Azul claro",
      hexadecimal: "#00f",
    });

    const response = await supertest(app).post("/colors").send(color);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      "There is already a color with this hexadecimal"
    );
  });
});
afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});
