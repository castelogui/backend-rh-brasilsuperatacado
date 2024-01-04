import supertest from "supertest";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";
import { app } from "../../../src/app";

const mockAppDataSource = new MockAppDataSource();

function expect200(response: any) {
  return Object.keys(response.body).forEach((key) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(key);
    expect(response.body[key]).not.toBeNull();
  });
}

beforeAll(async () => {
  await mockAppDataSource.connect();
});
describe("Type Movement => create", () => {
  it("should be create a new movement type", async () => {
    const response = await supertest(app).post("/typemovement").send({
      code: "1",
      type: "Entrada",
    });

    expect200(response);
  });
  it("a movement type with a repeated type should not be created", async () => {
    const response = await supertest(app).post("/typemovement").send({
      code: "2",
      type: "Entrada",
    });
    expect(response.status).toBe(400);
    expect(response.body).toBe("This type already exists");
  });
  it("a movement type with a repeated code should not be created", async () => {
    const response = await supertest(app).post("/typemovement").send({
      code: "1",
      type: "Saida",
    });
    expect(response.status).toBe(400);
    expect(response.body).toBe("This code already exists");
  });
  it("a new type should not be created without the type attribute", async () => {
    const response = await supertest(app).post("/typemovement").send({
      type: "Saida",
    });
    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: code");
  });
  it("a new type should not be created without the type attribute", async () => {
    const response = await supertest(app).post("/typemovement").send({
      code: "2",
    });
    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: type");
  });
});
describe("Type Movement => get", () => {
  it("should be get a movement type", async () => {
    const typeMovement = await supertest(app)
      .post("/typemovement")
      .send({ code: "2", type: "Saida" });

    const response = await supertest(app).get(
      `/typemovement/${typeMovement.body.id}`
    );

    console.log(response.body);
    expect200(response);
  });
  it("should be get a list of the movements types", async () => {
    const response = await supertest(app).get("/typemovement");
    expect(response.status).toBe(200);
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
