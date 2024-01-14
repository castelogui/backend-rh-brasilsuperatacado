import supertest from "supertest";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";
import { app } from "../../../src/app";
import path from "path";
const fs = require("fs").promises;

function expect200(response: any) {
  return Object.keys(response.body).forEach((key) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(key);
    expect(response.body[key]).not.toBeNull();
  });
}
function expectEstoque(response: any, item: any) {
  return expect(item.body.estoque).toBe(
    response.body.quantity + response.body.item_estoque_ant
  );
}

const mockAppDataSource = new MockAppDataSource();

const postData = async (key: string, data: Object) => {
  await supertest(app)
    .post(`/${key}`)
    .send(data)
    .then((response) => {
      if (response.error) console.log("Created: ", key, response.body);
    })
    .catch((err) => console.log(err));
};
const presetData = async (mock: string) => {
  try {
    const mockDataPath = path.join(__dirname, mock);
    const mockData = JSON.parse(await fs.readFile(mockDataPath, "utf-8"));

    for (const obj of mockData)
      for (const [key, items] of Object.entries(obj))
        if (Array.isArray(items)) for (const o of items) await postData(key, o);
  } catch (error) {
    console.error(`Erro ao carregar o arquivo JSON: ${error.message}`);
  }
};

beforeAll(async () => {
  await mockAppDataSource.connect();
  await presetData("mock.json");
});
describe("Movement => create", () => {
  it("should be to create a movement input", async () => {
    const response = await supertest(app).post("/movements").send({
      description: "Entrada de uniformes",
      quantity: 5,
      type_movement_id: "1",
      item_id: "1",
    });

    const item = await supertest(app).get("/items/1");

    expect200(response);
    expect200(item);
    expectEstoque(response, item);
  });
  it("A movement entry must not be created if the quantity is zero", async () => {
    const response = await supertest(app).post("/movements").send({
      description: "Entrada de uniformes 1",
      quantity: 0,
      type_movement_id: "1",
      item_id: "1",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Quantity cannot be zero");
  });
  it("should be to create a movement out", async () => {
    const response = await supertest(app).post("/movements").send({
      description: "Entrada de uniformes 1",
      quantity: 10,
      type_movement_id: "2",
      item_id: "1",
    });
    expect200(response);
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
