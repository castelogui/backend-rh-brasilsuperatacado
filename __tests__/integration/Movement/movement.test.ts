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

const presetData = async () => {
  try {
    const mockDataPath = path.join(__dirname, "mock.json");
    const mockData = JSON.parse(await fs.readFile(mockDataPath, "utf-8"));

    mockData.forEach(async (obj: Object) => {
      Object.keys(obj).forEach((key) => {
        obj[key].forEach(async (o) => {
          await supertest(app)
            .post(`/${key}`)
            .send(o)
            .then((response) => {
              console.log("Created: ", key, response.body);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    });

    //for (const category of mockData.categories) {
    //  await supertest(app)
    //    .post("/categories")
    //    .send(category)
    //    .catch((err) => {
    //      console.log(err);
    //    });
    //}
  } catch (error) {
    console.error(`Erro ao carregar o arquivo JSON: ${error.message}`);
  }
};

beforeAll(async () => {
  await mockAppDataSource.connect();
  await presetData();
});
describe("Movement => create", () => {
  it("should be create a movement entrada => success", async () => {
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
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
