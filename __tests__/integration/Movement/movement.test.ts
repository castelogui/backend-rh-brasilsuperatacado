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
  if (response.body.type_movement_id == "1") {
    return expect(item.body.estoque).toBe(
      response.body.quantity + response.body.item_estoque_ant
    );
  }
  if (response.body.type_movement_id == "2") {
    return expect(item.body.estoque).toBe(
      response.body.quantity - response.body.item_estoque_ant
    );
  }
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
    console.error(`Erro ao carregar o arquivo JSON: ${error}`);
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
      description: "Saida de uniformes",
      quantity: 10,
      type_movement_id: "2",
      item_id: "1",
    });
    expect200(response);
  });
  it("shouldn't be creating a movement if there's a lack of arguments", async () => {
    const response1 = await supertest(app).post("/movements").send({
      quantity: 10,
      type_movement_id: "2",
      item_id: "1",
    });
    const response2 = await supertest(app).post("/movements").send({
      description: "Movimento",
      type_movement_id: "2",
      item_id: "1",
    });
    const response3 = await supertest(app).post("/movements").send({
      description: "Movimento",
      quantity: 10,
      item_id: "1",
    });
    const response4 = await supertest(app).post("/movements").send({
      description: "Movimento",
      quantity: 10,
      type_movement_id: "2",
    });
    expect(response1.status).toBe(400);
    expect(response1.body).toBe("Request missing arguments: description");
    expect(response2.status).toBe(400);
    expect(response2.body).toBe("Request missing arguments: quantity");
    expect(response3.status).toBe(400);
    expect(response3.body).toBe("Request missing arguments: type_movement_id");
    expect(response4.status).toBe(400);
    expect(response4.body).toBe("Request missing arguments: item_id");
  });
});
describe("Movement => get", () => {
  it("should be caught a movement", async () => {
    const movement = await supertest(app).post("/movements").send({
      description: "Entrada de uniformes",
      quantity: 20,
      type_movement_id: "1",
      item_id: "2",
    });

    const response = await supertest(app).get(`/movements/${movement.body.id}`);
    expect200(response);
  });
  it("should be get a list of movements", async () => {
    const response = await supertest(app).get("/movements");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((obj: any) => {
      Object.keys(obj).forEach((key) => {
        expect(obj).toHaveProperty(key);
        expect(obj[key]).not.toBeNull();
      });
    });
  });
  it("should be no movement if the id is incorrect", async () => {
    const response = await supertest(app).get("/movements/1234");
    expect(response.status).toBe(400);
    expect(response.body).toBe("Movement does not exists");
  });
});
describe("Movement => update", () => {
  it("should be updated movement", async () => {
    const movement = await supertest(app).post("/movements").send({
      description: "Entrada de uniformes",
      quantity: 5,
      type_movement_id: "1",
      item_id: "2",
    });
    const response = await supertest(app)
      .put(`/movements/${movement.body.id}`)
      .send({
        description: "Entrada de uniformes",
        quantity: 1,
        type_movement_id: "1",
        item_id: "2",
      });
    const item = await supertest(app).get(`/items/2`);

    expect200(response);
    expect200(item);
    expectEstoque(response, item);
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
