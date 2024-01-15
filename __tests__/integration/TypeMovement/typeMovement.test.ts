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
  it("should not return a movement type if id is incorrect", async () => {
    const response = await supertest(app).get("/typemovement/123");

    expect(response.status).toBe(400);
    expect(response.body).toBe("Type movement does not exists");
  });
});
describe("Type Movement => update", () => {
  it("should not update the movement type if id is incorrect", async () => {
    const response = await supertest(app)
      .put("/typemovement/123")
      .send({ code: "3", type: "teste", description: "teste" });

    expect(response.status).toBe(400);
    expect(response.text).toBe('"Type Movement does not exists"');
  });
  it("should not update the movement type with an already existing code", async () => {
    const typeMovement = await supertest(app)
      .post("/typemovement")
      .send({ code: "3", type: "teste", description: "teste" });

    const response = await supertest(app)
      .put(`/typemovement/${typeMovement.body.id}`)
      .send({ code: "1" });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Already exists type movement with code");
  });
  it("should not update the movement type with an already existing type", async () => {
    const typeMovement = await supertest(app)
      .post("/typemovement")
      .send({ code: "4", type: "teste2", description: "teste" });

    const response = await supertest(app)
      .put(`/typemovement/${typeMovement.body.id}`)
      .send({ type: "Saida" });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Already exists type movement with name");
  });
  it("should update the movement type", async () => {
    const typeMovement = await supertest(app)
      .post("/typemovement")
      .send({ code: "5", type: "teste3", description: "teste" });
    const response = await supertest(app)
      .put(`/typemovement/${typeMovement.body.id}`)
      .send({ type: "devolução" });

    expect200(response);
  });
});
describe("Type Movement => delete", () => {
  it("shouldn't delete a type movement with the incorrect id", async () => {
    const response = await supertest(app).delete("/typemovement/123");

    expect(response.status).toBe(400);
    expect(response.body).toBe("Movement Type does not exists");
  });
  it("should delete a movement type", async () => {
    const typeMovement = await supertest(app)
      .post("/typemovement")
      .send({ code: "6", type: "Type delete" });

    const response = await supertest(app).delete(
      `/typemovement/${typeMovement.body.id}`
    );

    expect(response.status).toBe(204);
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
