import supertest from "supertest";
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
const mockData = JSON.parse("./mock.json");

beforeAll(async () => {
  await mockAppDataSource.connect();
  await supertest(app)
    .post("/categories")
    .send({ id: "1", name: "Camisas", description: "camisas" });
  await supertest(app)
    .post("/categories")
    .send({ id: "2", name: "Calças", description: "calças" });
  await supertest(app)
    .post("/colors")
    .send({ id: "1", name: "Branca", hexadecimal: "#fff" });
  await supertest(app)
    .post("/colors")
    .send({ id: "2", name: "Azul", hexadecimal: "#00f" });
  await supertest(app).post("/items").send({
    id: "1",
    name: "Uniforme Adm",
    category_id: "1",
    color_id: "1",
    size: "M",
  });
  await supertest(app).post("/items").send({
    id: "2",
    name: "Uniforme Adm",
    category_id: "1",
    color_id: "2",
    size: "M",
  });
  await supertest(app).post("/items").send({
    id: "3",
    name: "Uniforme Piso",
    category_id: "1",
    color_id: "2",
    size: "M",
  });
});
